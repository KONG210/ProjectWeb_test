# assets/img — วางไฟล์รูปตรงนี้

ตั้งชื่อไฟล์ให้ตรงตามรายการข้างล่าง แล้ววางในโฟลเดอร์นี้ — เว็บจะดึงขึ้นเองทันที
ไฟล์ไหนยังไม่มี ตำแหน่งนั้นจะกลับไปใช้ placeholder เดิม (เว็บไม่พัง ทำทีละรูปได้)

นามสกุลใช้ได้ทั้ง `.jpg` `.png` `.webp` `.jpeg` — โค้ดลองไล่ให้เอง
**พรอมป์สำหรับสั่ง Gemini ทั้งหมดอยู่ที่ [`../../GEMINI-PROMPTS.md`](../../GEMINI-PROMPTS.md)**

| ไฟล์ | ใช้ที่ไหน | สัดส่วน |
|---|---|---|
| `hero-tower` | index.html — ภาพใหญ่ใต้หัวข้อหน้าแรก | 21:9 |
| `project-nira-suk` / `-riv` / `-pha` | index.html — การ์ด 3 โครงการ | 16:10 |
| `feature-availability` | index.html — Bento "ผังห้องว่างเรียลไทม์" | 16:10 |
| `feature-cost` | index.html — Bento "ค่าใช้จ่ายวันโอน" | 16:10 |
| `feature-funnel` | index.html — บล็อก 4× | 4:5 |
| `avatar-1` / `-2` / `-3` | index.html — รูปลูกบ้านในรีวิว | 1:1 |
| `og-cover` | รูปพรีวิวตอนแชร์ลิงก์ | 1.91:1 |
| `unit-<CODE>` × 14 | การ์ดห้อง (units, account), แกลเลอรีหน้าห้อง, thumb หน้าจอง | 4:3 |
| `floorplan-<CODE>` × 14 | unit.html — แท็บ "ผังห้อง" | 1:1 |
| `view-city` / `-river` / `-park` / `-pool` / `-garden` | unit.html — ช่องวิวในแกลเลอรี (เลือกตามค่า `view` ของห้อง) | 4:3 |
| `living-bare` / `-partly` / `-fully` | unit.html — ช่องกลางแกลเลอรี (เลือกตาม `furnishing`) | 4:3 |
| `map-nira-suk` / `-riv` / `-pha` | unit.html — แท็บ "ทำเล" | 16:9 |
| `favicon.png` · `apple-touch-icon.png` | ไอคอนแท็บเบราว์เซอร์ | ✅ มีแล้ว |

`<CODE>` คือรหัสแบบห้อง 14 แบบ:
`A1 B1 B2 C1 D1 P1` (สุขุมวิท 39) · `RA RB RC RD RP` (เดอะ ริเวอร์) · `PA PB PC` (พาร์ค พหลฯ)

## หลังวางไฟล์เสร็จ

```bash
python tools/prepare_images.py     # ย่อขนาด บีบอัด และบอกว่าขาดรูปไหน
```
