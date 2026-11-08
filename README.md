# NIRA Residence — เว็บไซต์คอนโดมิเนียม (ดีไซน์ตาม Fincash)

เว็บไซต์ขายคอนโดมิเนียมครบวงจร ประกอบด้วย **ฝั่งลูกค้า** (เว็บการตลาด + ค้นหาห้อง + จองออนไลน์ + พอร์ทัลติดตามสถานะ)
และ **ฝั่งแอดมิน** (แดชบอร์ด, CRM, จัดการยูนิต, การเงิน, รายงาน)

---

## 1. ที่มาของดีไซน์ — ถอดแบบจาก Fincash

ข้อมูลด้านล่างดึงจาก demo จริงของเทมเพลต (`fincash.demos.tailgrids.com` — ตัวที่ 21st.dev ใช้เป็น preview)
โดยอ่านค่า computed style จากหน้าเว็บโดยตรง ไม่ได้เดา

| องค์ประกอบ | ค่าจริงจาก Fincash | ใช้ในโปรเจกต์นี้ |
|---|---|---|
| พื้นหลังหลัก | `oklab(0.145 0 0)` ≈ `#0A0A0A` | `--bg: #0A0A0A` |
| สี Accent | `rgb(214, 255, 102)` = `#D6FF66` (เขียวมะนาว) | `--accent: #D6FF66` |
| Accent โปร่ง | `rgba(210,251,100,.05)` | `--accent-ghost` |
| ตัวอักษร | Inter (400–800) | Inter + IBM Plex Sans Thai |
| ขนาด H1 | 60px, letter-spacing ติดลบ | `clamp(38px,5.2vw,64px)`, `-.035em` |
| การ์ด | มุมมน + เส้นขอบ `rgba(255,255,255,.08)` | `--line`, `--r-lg: 24px` |
| ปุ่ม | ทรงแคปซูล พื้น accent ตัวอักษรดำ | `.btn-primary` |
| Navbar | fixed + `backdrop-filter: blur` + โปร่ง 80% | `.nav` |
| Footer | มี wordmark ยักษ์จาง ๆ ด้านล่าง | `.wordmark` |
| เอฟเฟกต์ | glow เรืองแสง, scroll-reveal, ตัวเลขวิ่ง | `.glow`, `.reveal`, `data-count` |

**ลำดับ section ของ Fincash** (Hero → Stats → Bento features → 4× highlight → Feature split → Testimonials → Pricing → CTA → Footer)
ถูกนำมาใช้ทั้งหมด เพียงเปลี่ยนเนื้อหาจาก fintech เป็นคอนโด และแทรก "ขั้นตอนการซื้อ 7 ขั้น" กับ "เครื่องคำนวณสินเชื่อ" เพิ่ม

---

## 2. Attribute ทั้งหมดในระบบ (ผลการหาข้อมูล)

### 2.1 PROJECT — โครงการ (30 fields)

| กลุ่ม | Attribute |
|---|---|
| ระบุตัวตน | `id`, `code`, `nameTh`, `nameEn`, `developer`, `tagline` |
| ประเภท/สถานะ | `type` (High-rise / Low-rise / Mixed-use), `status` (Pre-sale / Under construction / Ready to move / Resale), `progressPct` |
| ทำเล | `address`, `district`, `province`, `postcode`, `lat`, `lng` |
| การเดินทาง | `transit[]` = { line (BTS/MRT/ARL), station, distanceM, walkMin } |
| ตัวอาคาร | `landAreaRai`, `buildings`, `floors`, `totalUnits`, `unitsPerFloor`, `elevators`, `ceilingHeight`, `parkingRatioPct`, `evCharger` |
| กำหนดเวลา | `yearCompleted`, `quarterCompleted` |
| กรรมสิทธิ์ | `ownership` (Freehold / Leasehold), `foreignQuotaPct` (กม.กำหนด 49%), `foreignQuotaSoldPct` |
| ค่าใช้จ่ายส่วนกลาง | `commonFeePerSqm` (บ./ตร.ม./เดือน), `sinkingFundPerSqm` (บ./ตร.ม. ครั้งเดียว), `commonFeeAdvanceMonths`, `juristic` |
| ราคา | `priceFrom`, `priceTo`, `pricePerSqmAvg`, `rentalYieldEst` |
| ขายและการตลาด | `facilities[]`, `nearby[]`, `promotions[]`, `banks[]`, `paymentTerm{}` |

### 2.2 UNIT — ยูนิต/ห้อง (25 fields) ← ตัวที่ลูกค้าเลือกซื้อจริง

| กลุ่ม | Attribute | ทำไมลูกค้าต้องเห็น |
|---|---|---|
| ตำแหน่ง | `unitNo`, `building`, `floor` | ระบุห้องในสัญญา; ชั้นมีผลต่อราคา |
| ผัง | `roomType`, `layoutCode`, `bedrooms`, `bathrooms` | เทียบแบบห้องข้ามยูนิตได้ |
| พื้นที่ | `usableAreaSqm`, `balconyAreaSqm`, `totalAreaSqm` | **ต้องแยกระเบียง** เพื่อเทียบราคา/ตร.ม. อย่างเป็นธรรม |
| ทิศทาง | `direction` (8 ทิศ), `view` | ทิศตะวันตก = ร้อนบ่าย; วิวมีผลต่อราคาขายต่อ |
| สภาพห้อง | `furnishing` (Bare / Partly / Fully), `features[]` | รู้ว่าต้องเตรียมงบตกแต่งเพิ่มไหม |
| ราคา | `priceList`, `discount`, `priceNet`, `pricePerSqm` | เห็นราคาป้าย → ส่วนลด → สุทธิ อย่างโปร่งใส |
| ค่าใช้จ่ายผูกกับห้อง | `commonFeeMonthly`, `sinkingFund` | ภาระหลังโอน คำนวณจากพื้นที่ห้องนี้ |
| สิทธิ์ประกอบ | `parkingSlots` | ที่จอดกี่คัน ฟรีหรือซื้อเพิ่ม |
| สถานะ | `status` (Available / On hold / Reserved / Contracted / Sold / Blocked), `holdUntil` | ป้องกันขายซ้ำ |
| ขาย | `salesOwner`, `tags[]` (ห้องมุม / ชั้นสูง / Hot Deal / Limited) | |

### 2.3 CUSTOMER — ลูกค้า
`prefix`, `firstName`, `lastName`, `idCard` (บัตร ปชช. หรือ Passport), `nationality`, `dob`,
`phone`, `email`, `lineId`, `address`, `occupation`, `monthlyIncome`, `purpose` (อยู่เอง/ลงทุน/ซื้อให้ลูก),
`source` (Google/Facebook/Agent/Walk-in), **`pdpaConsent`**, `createdAt`

### 2.4 LEAD — ผู้สนใจ (CRM)
`customerId`, `projectId`, `interestTypes[]`, `budgetMin/Max`, `status`
(New → Contacted → Appointment → Negotiating → Booked / Lost), `score`, `owner`, `nextFollowUp`, `note`

### 2.5 BOOKING — ใบจอง
`bookingNo`, `customerId`, `unitId`, `planKey`, `priceNet`,
`bookingFee` + `bookingDate` + `expireDate`, `contractFee` + `contractDate`,
`downTotal` + `installments[]` { no, dueDate, amount, status, paidAt },
`transferAmount`, `transferCosts`, `promotions[]`, `loan{bank, amount, years, rate, status}`,
`status` (Reserved → Contract signed → Down paying → Loan approval → Ready to transfer → Transferred / Cancelled),
`documents[]`, `salesOwner`

### 2.6 PAYMENT — การชำระเงิน
`bookingId`, `type` (เงินจอง / เงินทำสัญญา / ผ่อนดาวน์งวดที่ N / ยอดโอน),
`amount`, `method` (QR PromptPay / บัตรเครดิต / โอนธนาคาร), `paidAt`,
`status` (Waiting verify → Verified / Rejected), `receiptNo`

### 2.7 APPOINTMENT — นัดชมห้อง
`leadId`, `projectId`, `unitId`, `date`, `slot`, `channel` (Onsite / Video call), `status`, `owner`, `note`

---

## 3. "ใน 1 การซื้อ ลูกค้าต้องเห็นอะไร"

นี่คือหัวใจของหน้า `unit.html` (แท็บ *ราคา & ค่าใช้จ่าย*) และ `booking.html` (ขั้นที่ 3 *ตรวจสอบยอดรวม*)
แบ่งเป็น 5 บล็อกที่ต้องแสดงครบทุกครั้ง:

### บล็อก A — ราคาห้อง
```
ราคาป้าย            ฿13,013,000
− ส่วนลดโครงการ        ฿797,000
──────────────────────────────
ราคาสุทธิ           ฿12,216,000   (฿197,032 / ตร.ม.)
```

### บล็อก B — แผนการชำระเงิน (แบ่งเป็น 4 จังหวะ)
| # | รายการ | เมื่อไหร่ |
|---|---|---|
| 1 | **เงินจอง** | วันนี้ — ล็อกห้อง 7 วัน, ไม่คืนถ้ายกเลิกเอง |
| 2 | **เงินทำสัญญา** (5% ของราคา) | ภายใน 7 วัน พร้อมเซ็นสัญญาจะซื้อจะขาย |
| 3 | **เงินดาวน์** (10–15%) | ผ่อน 6–12 งวด — แสดง**ตารางวันครบกำหนดรายงวด** |
| 4 | **ยอดคงเหลือวันโอน** (~80–85%) | ยื่นสินเชื่อธนาคาร |

### บล็อก C — ค่าใช้จ่าย ณ วันโอน (ไม่รวมในราคาห้อง!)
เป็นจุดที่ลูกค้าคอนโดพลาดบ่อยที่สุด ระบบคำนวณอัตโนมัติจากราคาห้อง + วงเงินกู้:

| รายการ | อัตรา |
|---|---|
| ค่าธรรมเนียมการโอน | 2% ของราคาประเมิน (โดยทั่วไปแบ่งครึ่ง ผู้ซื้อออก 1%) |
| ↳ **มาตรการรัฐ** | ที่อยู่อาศัย **ราคาไม่เกิน 7 ล้านบาท** ลดค่าโอน+จดจำนองเหลือ **0.01%** (มีผล 22 เม.ย. 2568 – 30 มิ.ย. 2569) |
| ค่าจดจำนอง | 1% ของวงเงินกู้ (ผู้ซื้อออก) |
| ค่าส่วนกลางล่วงหน้า | 12 เดือน × (บ./ตร.ม. × พื้นที่ห้อง) |
| เงินกองทุนส่วนกลาง (Sinking Fund) | จ่ายครั้งเดียว, บ./ตร.ม. |
| ค่ามิเตอร์ไฟฟ้า + เงินประกัน | ~฿8,500 |
| ค่ามิเตอร์น้ำ + เงินประกัน | ~฿3,500 |
| ค่าประกันภัยส่วนกลางปีแรก | ~฿2,000 |
| ค่าจัดทำเอกสาร/นิติบุคคล | ~฿3,000 |

> *(ฝั่งผู้ขายรับผิดชอบ: อากรแสตมป์ 0.5% หรือภาษีธุรกิจเฉพาะ 3.3% + ภาษีเงินได้)*

### บล็อก D — ภาระรายเดือนหลังเข้าอยู่
ผ่อนธนาคาร + ค่าส่วนกลาง + ภาษีที่ดินและสิ่งปลูกสร้าง (เฉลี่ย/เดือน) + ค่าน้ำ-ไฟประมาณการ
พร้อมเทียบกับ **รายได้ขั้นต่ำที่ธนาคารกำหนด** (ภาระผ่อนไม่เกิน 40% ของรายได้)

### บล็อก E — เงื่อนไข ของแถม และสิ่งที่จะได้รับ
- โปรโมชั่น/ของแถมที่ได้ (ฟรีค่าส่วนกลาง, เฟอร์นิเจอร์, ฟรีค่าโอน)
- คำเตือน: เงินจองไม่คืน, กำหนดทำสัญญา 7 วัน, พื้นที่คลาดเคลื่อนได้ ±5% ตามสัญญามาตรฐาน สคบ.
- สิ่งที่ได้ตอนโอน: โฉนดห้องชุด (อ.ช.2), กุญแจ+คีย์การ์ด, คู่มือลูกบ้าน, รับประกันโครงสร้าง 5 ปี / งานระบบ 2 ปี
- ถ้าเป็นชาวต่างชาติ: แสดง **โควตาต่างชาติคงเหลือ** + ต้องมี FET/Credit Advice

---

## 4. โครงสร้างไฟล์

```
condo-web/
├── index.html      หน้าแรก (Hero, สถิติ, Bento features, โครงการ, 7 ขั้นตอนซื้อ,
│                   เครื่องคำนวณสินเชื่อแบบ interactive, รีวิว, แผนผ่อน, FAQ, CTA)
├── units.html      ค้นหาห้อง — 10 ตัวกรอง + 3 มุมมอง (การ์ด / ตาราง / ผังตึก stacking plan)
├── unit.html       รายละเอียดห้อง — 5 แท็บ (ข้อมูลห้อง / ราคา&ค่าใช้จ่าย / ผังห้อง / โครงการ / ทำเล)
│                   + sidebar สรุปราคา + ฟอร์มนัดชมห้อง
├── booking.html    จองออนไลน์ 5 ขั้น (เลือกแผน → ข้อมูลผู้ซื้อ+PDPA → ตรวจยอดรวม →
│                   ชำระเงินจอง (QR/บัตร/โอน) → ใบจองอิเล็กทรอนิกส์ พิมพ์ได้)
├── account.html    พอร์ทัลลูกค้า — ภาพรวม+ไทม์ไลน์ 6 ขั้น, ใบจอง, ตารางผ่อน+ชำระงวด,
│                   เอกสาร, ห้องที่บันทึก, นัดหมาย, โปรไฟล์+สิทธิ PDPA
├── admin.html      ระบบแอดมิน 11 โมดูล (ดูข้อ 5)
├── assets/
│   ├── theme.css   design system ทั้งหมด
│   ├── data.js     โมเดลข้อมูล + seed 150 ยูนิต + สูตรคำนวณ + Store (localStorage)
│   ├── ui.js       nav/footer/badge/format/modal/reveal/unitCard + ตัวโหลดรูป
│   └── img/        ← วางไฟล์รูปตรงนี้ (ดู assets/img/README.md)
├── GEMINI-PROMPTS.md   พรอมป์สั่ง Gemini สร้างรูปครบทั้ง 50 รูป
└── tools/
    └── prepare_images.py   ย่อ/บีบอัดรูป + เช็กว่ายังขาดรูปไหน
```

## 4.1 ระบบรูปภาพ

เว็บออกแบบให้ **ใส่รูปทีละไฟล์ได้** — ทุกจุดที่เคยเป็น placeholder CSS (`.ph`)
ตอนนี้มี `<img class="ph-img">` ซ้อนอยู่ ทำงานแบบนี้:

1. โหลดจาก `assets/img/<ชื่อ>.jpg` → ถ้าไม่เจอลอง `.png` → `.webp` → `.jpeg`
2. โหลดได้ → ใส่คลาส `has-img` ที่ตัวแม่ → รูปเฟดขึ้น, ซ่อนกริดกับป้าย placeholder,
   เพิ่มไล่เฉดมืดหัว-ท้ายให้ badge ยังอ่านออก
3. หาไม่เจอเลย → ลบ `<img>` ทิ้ง กลับไปแสดง placeholder เดิม **เว็บไม่พัง ไม่มีรูปแตก**

ชื่อไฟล์บางส่วนผูกกับข้อมูลจริงในฐานข้อมูลอัตโนมัติ:

| สิ่งที่แสดง | ชื่อไฟล์ที่มองหา |
|---|---|
| รูปห้องในการ์ด/แกลเลอรี | `unit-<layoutCode>` เช่น `unit-B2` |
| ผังห้อง | `floorplan-<layoutCode>` |
| ช่องวิว | ตามค่า `view` → `view-city` / `view-river` / `view-park` / `view-pool` / `view-garden` |
| ช่องห้องนั่งเล่น | ตามค่า `furnishing` → `living-bare` / `living-partly` / `living-fully` |
| การ์ดโครงการ & แผนที่ | `project-<code ตัวเล็ก>` / `map-<code ตัวเล็ก>` เช่น `project-nira-suk` |

**วิธีสร้างรูป:** เปิด [`GEMINI-PROMPTS.md`](GEMINI-PROMPTS.md) — มีพรอมป์ภาษาอังกฤษพร้อมใช้ครบทุกรูป
พร้อมสัดส่วนและชื่อไฟล์ที่ต้องตั้ง เสร็จแล้วสั่ง `python tools/prepare_images.py` เพื่อย่อขนาดและเช็กว่าขาดอะไร

## 5. โมดูลฝั่งแอดมิน

| โมดูล | ทำอะไรได้ |
|---|---|
| แดชบอร์ด | KPI 4 ตัว, กราฟยอดจองรายเดือน, โดนัทสถานะยูนิต, Sales Funnel, รายการรอตรวจสอบ, สรุปรายโครงการ |
| รายงานการขาย | ยอดขายแยกตามแบบห้อง / ช่วงชั้น / ช่วงราคา, Lead source, ผลงานทีมขาย |
| ลูกค้าผู้สนใจ | ตาราง Lead + drawer แก้สถานะ/นัดติดตาม/บันทึก |
| นัดชมห้อง | ยืนยัน/มอบหมายเจ้าหน้าที่ (รับคำขอจากหน้าลูกค้าอัตโนมัติ) |
| ใบจอง | ดูรายละเอียดครบ + เปลี่ยนสถานะ (สถานะยูนิตเปลี่ยนตามอัตโนมัติ) |
| การชำระเงิน | อนุมัติ/ปฏิเสธสลิป + ออกเลขใบเสร็จ |
| โครงการ | แก้ชื่อ/สถานะ/ความคืบหน้า/ค่าส่วนกลาง/กองทุน/เงินจอง/โควตาต่างชาติ (คำนวณยูนิตใหม่ทั้งโครงการ) |
| ยูนิต | ตาราง 150 ยูนิต + ค้นหา/กรอง/แบ่งหน้า + แก้ราคา ส่วนลด สถานะ เฟอร์ ผู้ดูแล แท็ก |
| โปรโมชั่น | แคมเปญรายโครงการ + เงื่อนไขการชำระ |
| ลูกค้า | ฐานข้อมูลลูกค้า + สถานะ PDPA |
| ตั้งค่า & สิทธิ์ | อัตราค่าธรรมเนียม (ใช้คำนวณค่าโอน), ผู้ใช้ 5 บทบาท, นโยบาย PDPA, export JSON |

## 6. วิธีเปิดใช้งาน

เปิด `index.html` ตรง ๆ ได้เลย หรือถ้าอยากให้เหมือนของจริง:

```powershell
cd "$env:USERPROFILE\Desktop\condo-web"
python -m http.server 8777
# เปิด http://localhost:8777
```

- ข้อมูลเก็บใน **localStorage** ของเบราว์เซอร์ — ฝั่งลูกค้าและแอดมินใช้ฐานเดียวกัน
  จองจากหน้าลูกค้าแล้วใบจองจะโผล่ในแอดมินทันที
- ล้างข้อมูลกลับค่าเริ่มต้น: แอดมิน → ปุ่ม *รีเซ็ตข้อมูลสาธิต*
- เข้าพอร์ทัลลูกค้า: `account.html` → เลือกบัญชีสาธิต (ธนกฤต วงศ์สุวรรณ มีใบจองตัวอย่างพร้อมตารางผ่อน)

## 7. หมายเหตุ

- ตัวเลขและอัตราค่าธรรมเนียมอ้างอิงเกณฑ์ปี 2569 ปรับได้ที่ `FEE_RULES` ใน `assets/data.js`
  หรือผ่านหน้า *ตั้งค่า & สิทธิ์* ในแอดมิน
- รูปภาพ: ยังไม่มีไฟล์จริงในรีโป ทุกจุดจึงแสดง placeholder CSS อยู่ — ใส่รูปได้ตามข้อ 4.1
- QR PromptPay ในหน้าชำระเงินเป็นภาพจำลอง ของจริงต้องต่อ payment gateway (2C2P / Omise / GB Prime Pay)
- ยังไม่มี backend — ถ้าจะใช้งานจริงต้องต่อ API + ฐานข้อมูล และย้าย logic การคำนวณราคาไปฝั่ง server
