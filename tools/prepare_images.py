#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
prepare_images.py — จัดรูปที่โหลดมาจาก Gemini ให้พร้อมขึ้นเว็บ

ทำ 3 อย่าง:
  1) ย่อรูปที่ใหญ่เกินให้พอดีกับที่เว็บใช้จริง แล้วบีบเป็น .jpg คุณภาพดี
  2) ลบไฟล์ซ้ำที่นามสกุลต่างกัน (เก็บ .jpg ไว้ตัวเดียว)
  3) รายงานว่ายังขาดรูปไหนบ้าง เทียบกับ GEMINI-PROMPTS.md

วิธีใช้:
    python tools/prepare_images.py            # จัดรูป + รายงาน
    python tools/prepare_images.py --check    # รายงานอย่างเดียว ไม่แตะไฟล์

ต้องมี Pillow:  pip install pillow
"""

import os
import sys
import argparse

# คอนโซล Windows ปกติเป็น cp874/cp1252 พิมพ์ไทยไม่ออก — บังคับเป็น UTF-8
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

try:
    from PIL import Image
except ImportError:
    sys.exit("ต้องติดตั้ง Pillow ก่อน:  pip install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "assets", "img")

EXTS = (".jpg", ".jpeg", ".png", ".webp")
BG = (13, 15, 12)          # พื้นหลังเวลาต้องแบนภาพโปร่งใสลงเป็น jpg
QUALITY = 84

# ชื่อไฟล์ที่เว็บมองหา -> ความกว้างสูงสุดที่ควรเก็บไว้ (px)
SPEC = {}


def _add(names, max_w, group):
    for n in names:
        SPEC[n] = (max_w, group)


_add(["hero-tower"], 2200, "1 · หน้าแรก")
_add(["project-nira-suk", "project-nira-riv", "project-nira-pha"], 1300, "1 · หน้าแรก")
_add(["feature-availability", "feature-cost", "feature-funnel"], 1500, "1 · หน้าแรก")
_add(["avatar-1", "avatar-2", "avatar-3"], 320, "1 · หน้าแรก")
_add(["og-cover"], 1200, "1 · หน้าแรก")

UNIT_CODES = ["A1", "B1", "B2", "C1", "D1", "P1",
              "RA", "RB", "RC", "RD", "RP",
              "PA", "PB", "PC"]
_add(["unit-" + c for c in UNIT_CODES], 1300, "2 · รูปห้อง")

_add(["view-city", "view-river", "view-park", "view-pool", "view-garden"], 1100, "3 · ประกอบ")
_add(["living-bare", "living-partly", "living-fully"], 1100, "3 · ประกอบ")
_add(["map-nira-suk", "map-nira-riv", "map-nira-pha"], 1300, "3 · ประกอบ")

_add(["floorplan-" + c for c in UNIT_CODES], 1300, "4 · ผังห้อง")

# ไฟล์ที่สร้างไว้ให้แล้ว — ห้ามแตะ ห้ามแปลงเป็น jpg
KEEP_AS_IS = {"favicon.png", "apple-touch-icon.png"}


def found_files():
    """คืน dict: ชื่อไฟล์ไม่รวมนามสกุล -> [path ที่เจอทั้งหมด]"""
    out = {}
    if not os.path.isdir(IMG_DIR):
        return out
    for fn in sorted(os.listdir(IMG_DIR)):
        if fn in KEEP_AS_IS:
            continue
        stem, ext = os.path.splitext(fn)
        if ext.lower() in EXTS:
            out.setdefault(stem, []).append(os.path.join(IMG_DIR, fn))
    return out


def optimise(paths, max_w):
    """ย่อ/แปลงเป็น .jpg ตัวเดียว คืน (ข้อความสรุป, ประหยัดไปกี่ไบต์)"""
    src = paths[0]
    target = os.path.join(IMG_DIR, os.path.splitext(os.path.basename(src))[0] + ".jpg")
    before = sum(os.path.getsize(p) for p in paths)

    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        flat = Image.new("RGB", im.size, BG)
        flat.paste(im, mask=im.split()[-1])
        im = flat
    else:
        im = im.convert("RGB")

    resized = False
    if im.width > max_w:
        h = round(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)
        resized = True

    im.save(target, "JPEG", quality=QUALITY, optimize=True, progressive=True)

    # ลบไฟล์นามสกุลอื่นของชื่อเดียวกันทิ้ง
    dropped = 0
    for p in paths:
        if os.path.abspath(p) != os.path.abspath(target):
            os.remove(p)
            dropped += 1

    after = os.path.getsize(target)
    bits = []
    if resized:
        bits.append("ย่อเหลือ %dpx" % max_w)
    if dropped:
        bits.append("ลบไฟล์ซ้ำ %d" % dropped)
    bits.append("%.0f KB" % (after / 1024))
    if before > after * 1.05:
        bits.append("(ลดจาก %.0f KB)" % (before / 1024))
    return " · ".join(bits), before - after


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="รายงานอย่างเดียว ไม่แก้ไฟล์")
    args = ap.parse_args()

    os.makedirs(IMG_DIR, exist_ok=True)
    have = found_files()

    print("โฟลเดอร์รูป: %s\n" % IMG_DIR)

    saved = 0
    processed = 0
    for name in SPEC:
        if name not in have:
            continue
        max_w = SPEC[name][0]
        if args.check:
            print("  [มี] %s" % name)
        else:
            try:
                msg, s = optimise(have[name], max_w)
                saved += s
                processed += 1
                print("  [ok] %-24s %s" % (name, msg))
            except Exception as e:
                print("  [!!] %-24s อ่านไฟล์ไม่ได้: %s" % (name, e))

    if processed:
        print("\nจัดรูปแล้ว %d ไฟล์ ประหยัดพื้นที่ %.1f MB" % (processed, saved / 1048576))

    # ไฟล์ที่ไม่อยู่ในรายการ = อาจตั้งชื่อผิด
    extra = [n for n in have if n not in SPEC]
    if extra:
        print("\n⚠  ชื่อไฟล์นี้เว็บไม่ได้ใช้ (สะกดผิดหรือเปล่า?)")
        for n in extra:
            print("     %s" % n)

    # สรุปว่ายังขาดอะไร
    groups = {}
    for name, (_, g) in SPEC.items():
        groups.setdefault(g, []).append(name)

    total = len(SPEC)
    done = sum(1 for n in SPEC if n in have)
    print("\n" + "=" * 52)
    print("ความคืบหน้า: %d / %d รูป" % (done, total))
    print("=" * 52)

    for g in sorted(groups):
        missing = [n for n in sorted(groups[g]) if n not in have]
        if not missing:
            print("\nชุด %s — ครบแล้ว ✅" % g)
        else:
            print("\nชุด %s — ยังขาด %d รูป:" % (g, len(missing)))
            for n in missing:
                print("     %s" % n)

    if done < total:
        print("\nพรอมป์ของแต่ละรูปอยู่ใน GEMINI-PROMPTS.md")
    else:
        print("\nครบทุกรูปแล้ว — git add -A && git commit && git push ได้เลย")


if __name__ == "__main__":
    main()
