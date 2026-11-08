/* ============================================================
   NIRA RESIDENCE — Data layer
   โมเดลข้อมูล + seed + store (localStorage) ใช้ร่วมกันทั้งฝั่งลูกค้าและแอดมิน
   ============================================================ */

const DB_KEY = 'nira_db_v1';

/* ------------------------------------------------------------
   PROJECT — attribute ของ "โครงการ"
------------------------------------------------------------ */
const SEED_PROJECTS = [
  {
    id: 'PRJ-001',
    code: 'NIRA-SUK',
    nameTh: 'นิรา เรสซิเดนซ์ สุขุมวิท 39',
    nameEn: 'NIRA Residence Sukhumvit 39',
    developer: 'บริษัท นิรา ดีเวลลอปเมนท์ จำกัด (มหาชน)',
    tagline: 'Low-density luxury ใจกลางพร้อมพงษ์',
    type: 'High-rise',                 // High-rise / Low-rise / Mixed-use
    status: 'Pre-sale',                // Pre-sale / Under construction / Ready to move / Resale
    progressPct: 62,                   // % งานก่อสร้าง
    address: '199 ซอยสุขุมวิท 39 แขวงคลองตันเหนือ เขตวัฒนา',
    district: 'วัฒนา', province: 'กรุงเทพมหานคร', postcode: '10110',
    lat: 13.7325, lng: 100.5698,
    transit: [
      { line: 'BTS', station: 'พร้อมพงษ์', distanceM: 450, walkMin: 6 },
      { line: 'MRT', station: 'สุขุมวิท', distanceM: 1300, walkMin: 16 }
    ],
    landAreaRai: 2.8, buildings: 1, floors: 34, totalUnits: 268,
    unitsPerFloor: 8, elevators: 4, ceilingHeight: 2.8,
    parkingRatioPct: 110, evCharger: true,
    yearCompleted: 2027, quarterCompleted: 'Q4 2027',
    ownership: 'Freehold',
    foreignQuotaPct: 49, foreignQuotaSoldPct: 21,
    commonFeePerSqm: 65,               // บาท/ตร.ม./เดือน
    sinkingFundPerSqm: 700,            // บาท/ตร.ม. จ่ายครั้งเดียววันโอน
    commonFeeAdvanceMonths: 12,        // เก็บล่วงหน้าวันโอน
    juristic: 'นิติบุคคลอาคารชุด นิรา เรสซิเดนซ์',
    priceFrom: 5290000, priceTo: 24500000,
    pricePerSqmAvg: 189000,
    rentalYieldEst: 4.6,
    facilities: [
      'สระว่ายน้ำระบบเกลือ 30 ม.', 'Sky Fitness ชั้น 33', 'Co-working & Meeting Room',
      'Sky Lounge & Rooftop Garden', 'Private Theater', 'Kids Club',
      'Onsen & Sauna', 'Pet Zone', 'EV Charger 8 ช่อง', 'Smart Parcel Locker',
      'รปภ. 24 ชม. + CCTV 120 ตัว', 'Access Control 3 ชั้น'
    ],
    nearby: [
      { type: 'ห้างสรรพสินค้า', name: 'The EmQuartier', distanceKm: 0.6 },
      { type: 'ห้างสรรพสินค้า', name: 'Emsphere', distanceKm: 0.9 },
      { type: 'โรงพยาบาล', name: 'รพ. สมิติเวช สุขุมวิท', distanceKm: 1.1 },
      { type: 'โรงเรียนนานาชาติ', name: 'NIST International School', distanceKm: 2.4 },
      { type: 'สวนสาธารณะ', name: 'สวนเบญจสิริ', distanceKm: 1.3 }
    ],
    promotions: [
      { id: 'PM-01', name: 'จองวันนี้ ฟรีค่าส่วนกลาง 2 ปี', value: 0, type: 'freebie' },
      { id: 'PM-02', name: 'ส่วนลดพิเศษ Pre-sale 3%', value: 0.03, type: 'discount_pct' },
      { id: 'PM-03', name: 'แถมเฟอร์นิเจอร์ Fully-furnished', value: 0, type: 'freebie' }
    ],
    banks: [
      { name: 'ธนาคารกสิกรไทย', rate: 3.15, maxLtvPct: 100, maxYears: 40 },
      { name: 'ธนาคารไทยพาณิชย์', rate: 3.25, maxLtvPct: 100, maxYears: 40 },
      { name: 'ธนาคารกรุงเทพ', rate: 3.10, maxLtvPct: 95, maxYears: 35 },
      { name: 'ธนาคารกรุงศรีอยุธยา', rate: 3.30, maxLtvPct: 100, maxYears: 35 }
    ],
    paymentTerm: { bookingFee: 50000, contractFeePct: 0.05, downPct: 0.15, downInstallments: 12 },
    heroLabel: 'NIRA SUKHUMVIT 39'
  },
  {
    id: 'PRJ-002',
    code: 'NIRA-RIV',
    nameTh: 'นิรา เดอะ ริเวอร์ เจริญนคร',
    nameEn: 'NIRA The River Charoennakhon',
    developer: 'บริษัท นิรา ดีเวลลอปเมนท์ จำกัด (มหาชน)',
    tagline: 'ริมเจ้าพระยา วิวพาโนรามา 270°',
    type: 'High-rise', status: 'Under construction', progressPct: 88,
    address: '88 ถนนเจริญนคร แขวงคลองต้นไทร เขตคลองสาน',
    district: 'คลองสาน', province: 'กรุงเทพมหานคร', postcode: '10600',
    lat: 13.7268, lng: 100.5104,
    transit: [{ line: 'BTS', station: 'เจริญนคร (สายสีทอง)', distanceM: 300, walkMin: 4 }],
    landAreaRai: 4.2, buildings: 2, floors: 42, totalUnits: 486,
    unitsPerFloor: 12, elevators: 6, ceilingHeight: 2.9,
    parkingRatioPct: 100, evCharger: true,
    yearCompleted: 2026, quarterCompleted: 'Q2 2026',
    ownership: 'Freehold',
    foreignQuotaPct: 49, foreignQuotaSoldPct: 38,
    commonFeePerSqm: 72, sinkingFundPerSqm: 800, commonFeeAdvanceMonths: 12,
    juristic: 'นิติบุคคลอาคารชุด นิรา เดอะ ริเวอร์',
    priceFrom: 4150000, priceTo: 38000000, pricePerSqmAvg: 165000, rentalYieldEst: 5.1,
    facilities: [
      'Infinity Pool ริมแม่น้ำ 50 ม.', 'River Sky Lounge ชั้น 41', 'Fitness & Yoga Studio',
      'Private Pier ท่าเรือส่วนตัว', 'Co-working Space 24 ชม.', 'Sauna & Steam',
      'Sky Dining', 'Golf Simulator', 'EV Charger 12 ช่อง', 'รปภ. 24 ชม.'
    ],
    nearby: [
      { type: 'ห้างสรรพสินค้า', name: 'ICONSIAM', distanceKm: 0.8 },
      { type: 'โรงพยาบาล', name: 'รพ. ตากสิน', distanceKm: 1.6 },
      { type: 'สถานศึกษา', name: 'ม.ธนบุรี', distanceKm: 3.0 }
    ],
    promotions: [
      { id: 'PM-11', name: 'พร้อมอยู่ ฟรีค่าโอน', value: 0, type: 'freebie' },
      { id: 'PM-12', name: 'ส่วนลดเงินสด 5%', value: 0.05, type: 'discount_pct' }
    ],
    banks: [
      { name: 'ธนาคารกสิกรไทย', rate: 3.15, maxLtvPct: 100, maxYears: 40 },
      { name: 'ธนาคารอาคารสงเคราะห์', rate: 2.95, maxLtvPct: 100, maxYears: 40 }
    ],
    paymentTerm: { bookingFee: 30000, contractFeePct: 0.05, downPct: 0.10, downInstallments: 6 },
    heroLabel: 'NIRA THE RIVER'
  },
  {
    id: 'PRJ-003',
    code: 'NIRA-PHA',
    nameTh: 'นิรา พาร์ค พหลโยธิน 24',
    nameEn: 'NIRA Park Phahonyothin 24',
    developer: 'บริษัท นิรา ดีเวลลอปเมนท์ จำกัด (มหาชน)',
    tagline: 'Low-rise ติดสวน เงียบสงบ เดินถึง BTS',
    type: 'Low-rise', status: 'Ready to move', progressPct: 100,
    address: '24 ซอยพหลโยธิน 24 แขวงจอมพล เขตจตุจักร',
    district: 'จตุจักร', province: 'กรุงเทพมหานคร', postcode: '10900',
    lat: 13.8187, lng: 100.5623,
    transit: [
      { line: 'BTS', station: 'รัชโยธิน', distanceM: 550, walkMin: 7 },
      { line: 'MRT', station: 'พหลโยธิน', distanceM: 1500, walkMin: 18 }
    ],
    landAreaRai: 3.1, buildings: 4, floors: 8, totalUnits: 312,
    unitsPerFloor: 10, elevators: 8, ceilingHeight: 2.6,
    parkingRatioPct: 65, evCharger: false,
    yearCompleted: 2025, quarterCompleted: 'Q1 2025',
    ownership: 'Freehold',
    foreignQuotaPct: 49, foreignQuotaSoldPct: 8,
    commonFeePerSqm: 48, sinkingFundPerSqm: 550, commonFeeAdvanceMonths: 12,
    juristic: 'นิติบุคคลอาคารชุด นิรา พาร์ค',
    priceFrom: 2390000, priceTo: 7900000, pricePerSqmAvg: 98000, rentalYieldEst: 5.8,
    facilities: [
      'สระว่ายน้ำ 25 ม.', 'Fitness', 'Garden Courtyard', 'Co-working Corner',
      'Laundry Room', 'Pet Friendly', 'รปภ. 24 ชม.'
    ],
    nearby: [
      { type: 'ห้างสรรพสินค้า', name: 'Central Ladprao', distanceKm: 1.8 },
      { type: 'สวนสาธารณะ', name: 'สวนจตุจักร', distanceKm: 2.2 },
      { type: 'โรงพยาบาล', name: 'รพ. เปาโล เกษตร', distanceKm: 1.4 }
    ],
    promotions: [{ id: 'PM-21', name: 'อยู่ฟรี 1 ปี (ค่าส่วนกลาง)', value: 0, type: 'freebie' }],
    banks: [{ name: 'ธนาคารออมสิน', rate: 2.90, maxLtvPct: 100, maxYears: 40 }],
    paymentTerm: { bookingFee: 10000, contractFeePct: 0.03, downPct: 0.05, downInstallments: 3 },
    heroLabel: 'NIRA PARK'
  }
];

/* ------------------------------------------------------------
   UNIT — attribute ของ "ห้อง/ยูนิต"  (ตัวหลักที่ลูกค้าเลือกซื้อ)
------------------------------------------------------------ */
const ROOM_TYPES = ['Studio', '1 Bedroom', '1 Bedroom Plus', '2 Bedroom', '2 Bedroom Duplex', '3 Bedroom', 'Penthouse'];
const VIEWS = ['City View', 'River View', 'Park View', 'Pool View', 'Garden View'];
const DIRECTIONS = ['เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก', 'ตะวันออกเฉียงเหนือ', 'ตะวันตกเฉียงใต้'];
const FURNISH = ['Bare shell', 'Partly furnished', 'Fully furnished'];
const UNIT_STATUS = ['Available', 'On hold', 'Reserved', 'Contracted', 'Sold', 'Blocked'];

function buildUnits() {
  const units = [];
  const rnd = mulberry32(20260812);
  const pick = a => a[Math.floor(rnd() * a.length)];

  const plans = {
    'PRJ-001': [
      { t: 'Studio',            b: 1, ba: 1, a: 28,  bal: 4,  code: 'A1', psm: 178000 },
      { t: '1 Bedroom',         b: 1, ba: 1, a: 35,  bal: 5,  code: 'B1', psm: 186000 },
      { t: '1 Bedroom Plus',    b: 1, ba: 1, a: 45,  bal: 6,  code: 'B2', psm: 192000 },
      { t: '2 Bedroom',         b: 2, ba: 2, a: 62,  bal: 8,  code: 'C1', psm: 198000 },
      { t: '2 Bedroom Duplex',  b: 2, ba: 2, a: 88,  bal: 12, code: 'D1', psm: 214000 },
      { t: 'Penthouse',         b: 3, ba: 3, a: 145, bal: 22, code: 'P1', psm: 245000 }
    ],
    'PRJ-002': [
      { t: 'Studio',      b: 1, ba: 1, a: 26,  bal: 4,  code: 'RA', psm: 152000 },
      { t: '1 Bedroom',   b: 1, ba: 1, a: 34,  bal: 6,  code: 'RB', psm: 162000 },
      { t: '2 Bedroom',   b: 2, ba: 2, a: 58,  bal: 9,  code: 'RC', psm: 172000 },
      { t: '3 Bedroom',   b: 3, ba: 2, a: 96,  bal: 14, code: 'RD', psm: 188000 },
      { t: 'Penthouse',   b: 4, ba: 4, a: 190, bal: 35, code: 'RP', psm: 205000 }
    ],
    'PRJ-003': [
      { t: 'Studio',    b: 1, ba: 1, a: 24, bal: 3, code: 'PA', psm: 92000 },
      { t: '1 Bedroom', b: 1, ba: 1, a: 30, bal: 4, code: 'PB', psm: 98000 },
      { t: '2 Bedroom', b: 2, ba: 1, a: 48, bal: 6, code: 'PC', psm: 104000 }
    ]
  };

  const counts = { 'PRJ-001': 54, 'PRJ-002': 60, 'PRJ-003': 36 };
  const featurePool = ['Built-in ครบทั้งห้อง', 'Digital Door Lock', 'Smart Home System', 'เพดานสูง 2.8 ม.',
    'หน้าต่างกระจก Full Height', 'ห้องครัวปิด', 'Walk-in Closet', 'อ่างอาบน้ำ', 'ระบบกรองน้ำ', 'เครื่องปรับอากาศ Inverter'];

  SEED_PROJECTS.forEach(p => {
    const list = plans[p.id];
    const n = counts[p.id];
    for (let i = 0; i < n; i++) {
      const plan = list[Math.floor(rnd() * list.length)];
      const floor = 3 + Math.floor(rnd() * (p.floors - 4));
      const unitNo = `${String(floor).padStart(2, '0')}${String(1 + Math.floor(rnd() * p.unitsPerFloor)).padStart(2, '0')}`;
      const bld = p.buildings > 1 ? String.fromCharCode(65 + Math.floor(rnd() * p.buildings)) : 'A';
      const id = `${p.code}-${bld}${unitNo}-${i}`;
      // ราคาแปรตามชั้น: ยิ่งสูงยิ่งแพง (floor premium ~0.5%/ชั้น)
      const floorPremium = 1 + (floor - 3) * 0.005;
      const areaTotal = plan.a + plan.bal * 0.5;
      const list_ = Math.round(plan.psm * plan.a * floorPremium / 1000) * 1000;
      const disc = rnd() < 0.35 ? Math.round(list_ * (0.02 + rnd() * 0.06) / 1000) * 1000 : 0;
      const st = weighted(rnd(), [['Available', .58], ['Reserved', .12], ['Contracted', .1], ['Sold', .16], ['Blocked', .04]]);
      const feats = shuffle(featurePool.slice(), rnd).slice(0, 3 + Math.floor(rnd() * 3));
      const tags = [];
      if (floor >= p.floors - 5) tags.push('ชั้นสูง');
      if (unitNo.endsWith('01') || unitNo.endsWith('08')) tags.push('ห้องมุม');
      if (disc > 0) tags.push('Hot Deal');
      if (plan.t === 'Penthouse') tags.push('Limited');

      units.push({
        id, projectId: p.id, unitNo: `${bld}-${unitNo}`, building: bld, floor,
        roomType: plan.t, layoutCode: plan.code,
        bedrooms: plan.b, bathrooms: plan.ba,
        usableAreaSqm: plan.a, balconyAreaSqm: plan.bal, totalAreaSqm: areaTotal,
        direction: pick(DIRECTIONS),
        view: p.id === 'PRJ-002' ? (rnd() < .6 ? 'River View' : 'City View')
             : p.id === 'PRJ-003' ? (rnd() < .5 ? 'Garden View' : 'Pool View')
             : pick(['City View', 'Pool View', 'Park View']),
        furnishing: pick(FURNISH),
        priceList: list_,
        discount: disc,
        priceNet: list_ - disc,
        pricePerSqm: Math.round((list_ - disc) / plan.a),
        status: st,
        parkingSlots: plan.b >= 2 ? 2 : 1,
        features: feats,
        tags,
        commonFeeMonthly: Math.round(p.commonFeePerSqm * plan.a),
        sinkingFund: Math.round(p.sinkingFundPerSqm * plan.a),
        salesOwner: pick(['คุณพลอย', 'คุณเจมส์', 'คุณนัท', 'คุณฟ้า']),
        holdUntil: null,
        createdAt: '2026-01-15'
      });
    }
  });
  return units;
}

/* ------------------------------------------------------------
   CUSTOMERS / LEADS / BOOKINGS / PAYMENTS / APPOINTMENTS
------------------------------------------------------------ */
const SEED_CUSTOMERS = [
  { id:'CUS-1001', prefix:'นาย', firstName:'ธนกฤต', lastName:'วงศ์สุวรรณ', idCard:'1-1012-34567-89-0', nationality:'ไทย',
    phone:'081-234-5678', email:'thanakrit.w@example.com', lineId:'@thanakrit', dob:'1990-04-12',
    address:'88/12 ถ.รัชดาภิเษก เขตห้วยขวาง กรุงเทพฯ 10310', occupation:'วิศวกรซอฟต์แวร์', monthlyIncome:120000,
    purpose:'อยู่เอง', source:'Google Ads', pdpaConsent:true, createdAt:'2026-06-02' },
  { id:'CUS-1002', prefix:'นางสาว', firstName:'ปาริชาต', lastName:'อินทรกุล', idCard:'3-1005-98765-43-2', nationality:'ไทย',
    phone:'089-777-1122', email:'parichat.i@example.com', lineId:'parii', dob:'1994-11-03',
    address:'19 ซ.ลาดพร้าว 71 เขตลาดพร้าว กรุงเทพฯ 10230', occupation:'เจ้าของกิจการ', monthlyIncome:250000,
    purpose:'ลงทุนปล่อยเช่า', source:'Facebook', pdpaConsent:true, createdAt:'2026-06-18' },
  { id:'CUS-1003', prefix:'Mr.', firstName:'Kenji', lastName:'Watanabe', idCard:'TK-8829134 (Passport)', nationality:'ญี่ปุ่น',
    phone:'092-004-8899', email:'k.watanabe@example.jp', lineId:'kenji_w', dob:'1985-02-20',
    address:'Sukhumvit 33, Bangkok', occupation:'Expat Manager', monthlyIncome:320000,
    purpose:'อยู่เอง', source:'Agent', pdpaConsent:true, createdAt:'2026-07-04' },
  { id:'CUS-1004', prefix:'นาง', firstName:'สุดารัตน์', lastName:'พงษ์เจริญ', idCard:'1-2003-45612-33-1', nationality:'ไทย',
    phone:'086-543-2100', email:'sudarat.p@example.com', lineId:'sudaratp', dob:'1979-08-30',
    address:'45 ถ.เจริญนคร เขตคลองสาน กรุงเทพฯ 10600', occupation:'แพทย์', monthlyIncome:400000,
    purpose:'ซื้อให้ลูก', source:'Walk-in', pdpaConsent:true, createdAt:'2026-07-21' }
];

const SEED_LEADS = [
  { id:'LD-2001', customerId:'CUS-1001', projectId:'PRJ-001', budgetMin:5000000, budgetMax:8000000,
    interestTypes:['1 Bedroom','1 Bedroom Plus'], status:'Booked', score:92, owner:'คุณพลอย',
    nextFollowUp:'2026-08-20', note:'สนใจชั้นสูง วิวสระ ต้องการโอนภายในปี 2027', createdAt:'2026-06-02' },
  { id:'LD-2002', customerId:'CUS-1002', projectId:'PRJ-002', budgetMin:4000000, budgetMax:6000000,
    interestTypes:['Studio','1 Bedroom'], status:'Negotiating', score:78, owner:'คุณเจมส์',
    nextFollowUp:'2026-08-14', note:'ขอส่วนลดเพิ่ม 2% ถ้าซื้อ 2 ห้อง', createdAt:'2026-06-18' },
  { id:'LD-2003', customerId:'CUS-1003', projectId:'PRJ-001', budgetMin:10000000, budgetMax:16000000,
    interestTypes:['2 Bedroom','2 Bedroom Duplex'], status:'Appointment', score:65, owner:'คุณนัท',
    nextFollowUp:'2026-08-13', note:'ต้องเช็ค foreign quota ก่อน', createdAt:'2026-07-04' },
  { id:'LD-2004', customerId:'CUS-1004', projectId:'PRJ-003', budgetMin:2000000, budgetMax:3500000,
    interestTypes:['1 Bedroom'], status:'Contacted', score:41, owner:'คุณฟ้า',
    nextFollowUp:'2026-08-16', note:'พร้อมอยู่ ขอดูห้องจริงเสาร์นี้', createdAt:'2026-07-21' }
];

const SEED_APPOINTMENTS = [
  { id:'AP-3001', leadId:'LD-2003', customerId:'CUS-1003', projectId:'PRJ-001', date:'2026-08-13', slot:'14:00-15:00', channel:'Onsite', status:'Confirmed', owner:'คุณนัท' },
  { id:'AP-3002', leadId:'LD-2004', customerId:'CUS-1004', projectId:'PRJ-003', date:'2026-08-16', slot:'10:00-11:00', channel:'Onsite', status:'Pending', owner:'คุณฟ้า' },
  { id:'AP-3003', leadId:'LD-2002', customerId:'CUS-1002', projectId:'PRJ-002', date:'2026-08-14', slot:'16:00-17:00', channel:'Video call', status:'Confirmed', owner:'คุณเจมส์' }
];

/* ------------------------------------------------------------
   Utils
------------------------------------------------------------ */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr, rnd){for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function weighted(r, pairs){let acc=0;for(const [v,w] of pairs){acc+=w;if(r<=acc)return v;}return pairs[pairs.length-1][0];}
function uid(prefix){return prefix+'-'+Date.now().toString(36).toUpperCase()+Math.floor(Math.random()*900+100);}

/* ------------------------------------------------------------
   ค่าใช้จ่าย & การคำนวณ  — หัวใจของ "1 การซื้อ ลูกค้าต้องเห็นอะไร"
------------------------------------------------------------ */
const FEE_RULES = {
  transferFeePct: 0.02,          // ค่าธรรมเนียมโอน 2% ของราคาประเมิน/ซื้อขาย
  transferFeeSplit: 0.5,         // ผู้ซื้อออกครึ่ง (โดยทั่วไป 50/50)
  measureCapPrice: 7000000,      // มาตรการรัฐ: ราคาไม่เกิน 7 ล้าน
  measureRatePct: 0.0001,        // ลดเหลือ 0.01%
  measureUntil: '2026-06-30',
  mortgageFeePct: 0.01,          // ค่าจดจำนอง 1% ของวงเงินกู้
  stampDutyPct: 0.005,           // อากรแสตมป์ 0.5% (ผู้ขายออก)
  meterElectric: 8500,           // ค่ามิเตอร์ไฟฟ้า + ประกัน
  meterWater: 3500,              // ค่ามิเตอร์น้ำ + ประกัน
  commonAreaInsurance: 2000,     // ค่าประกันภัยส่วนกลางปีแรก
  juristicSetup: 3000            // ค่าจัดทำเอกสารนิติบุคคล / มิเตอร์ / ค่าธรรมเนียมอื่น
};

/** แผนการชำระเงินของ 1 ยูนิต */
function buildPaymentPlan(unit, project, opts = {}) {
  const t = project.paymentTerm;
  const net = opts.priceNet ?? unit.priceNet;
  const booking = t.bookingFee;
  const contract = Math.round(net * t.contractFeePct);
  const downTotal = Math.round(net * t.downPct);
  const perInstall = Math.round(downTotal / t.downInstallments / 100) * 100;
  const installments = [];
  const start = new Date(opts.startDate || '2026-09-05');
  for (let i = 1; i <= t.downInstallments; i++) {
    const d = new Date(start); d.setMonth(d.getMonth() + i - 1);
    installments.push({
      no: i,
      dueDate: d.toISOString().slice(0, 10),
      amount: i === t.downInstallments ? downTotal - perInstall * (t.downInstallments - 1) : perInstall,
      status: 'Pending', paidAt: null
    });
  }
  const transferAmount = net - booking - contract - downTotal;
  return { priceNet: net, booking, contract, downTotal, installments, transferAmount, downPct: t.downPct };
}

/** ค่าใช้จ่าย ณ วันโอน (ประมาณการ) */
function buildTransferCosts(unit, project, loanAmount) {
  const price = unit.priceNet;
  const useMeasure = price <= FEE_RULES.measureCapPrice;
  const transferFeeFull = useMeasure ? price * FEE_RULES.measureRatePct : price * FEE_RULES.transferFeePct;
  const transferFeeBuyer = useMeasure ? transferFeeFull : transferFeeFull * FEE_RULES.transferFeeSplit;
  const mortgageFee = loanAmount > 0
    ? (useMeasure ? loanAmount * FEE_RULES.measureRatePct : loanAmount * FEE_RULES.mortgageFeePct) : 0;
  const commonAdvance = unit.commonFeeMonthly * project.commonFeeAdvanceMonths;
  const items = [
    { k: `ค่าธรรมเนียมการโอน (${useMeasure ? '0.01% ตามมาตรการรัฐ' : '2% แบ่งครึ่งผู้ซื้อ 1%'})`, v: Math.round(transferFeeBuyer) },
    { k: `ค่าจดจำนอง (${useMeasure ? '0.01%' : '1% ของวงเงินกู้'})`, v: Math.round(mortgageFee) },
    { k: `ค่าส่วนกลางล่วงหน้า ${project.commonFeeAdvanceMonths} เดือน`, v: commonAdvance },
    { k: 'เงินกองทุนส่วนกลาง (จ่ายครั้งเดียว)', v: unit.sinkingFund },
    { k: 'ค่ามิเตอร์ไฟฟ้า + เงินประกัน', v: FEE_RULES.meterElectric },
    { k: 'ค่ามิเตอร์น้ำประปา + เงินประกัน', v: FEE_RULES.meterWater },
    { k: 'ค่าประกันภัยส่วนกลาง ปีแรก', v: FEE_RULES.commonAreaInsurance },
    { k: 'ค่าจัดทำเอกสาร/นิติบุคคล', v: FEE_RULES.juristicSetup }
  ];
  return { items, total: items.reduce((s, i) => s + i.v, 0), useMeasure };
}

/** ผ่อนต่อเดือนแบบลดต้นลดดอก */
function monthlyPayment(principal, annualRatePct, years) {
  const r = annualRatePct / 100 / 12, n = years * 12;
  if (r === 0) return principal / n;
  return principal * r / (1 - Math.pow(1 + r, -n));
}

/** รายได้ขั้นต่ำที่ควรมี (ภาระผ่อนไม่เกิน 40% ของรายได้) */
function requiredIncome(monthly) { return Math.ceil(monthly / 0.4 / 1000) * 1000; }

/* ------------------------------------------------------------
   STORE
------------------------------------------------------------ */
const Store = {
  _db: null,
  init() {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) { try { this._db = JSON.parse(raw); } catch (e) { this._db = null; } }
    if (!this._db || this._db.version !== 1) this.reset(true);
    return this._db;
  },
  reset(silent) {
    this._db = {
      version: 1,
      projects: JSON.parse(JSON.stringify(SEED_PROJECTS)),
      units: buildUnits(),
      customers: JSON.parse(JSON.stringify(SEED_CUSTOMERS)),
      leads: JSON.parse(JSON.stringify(SEED_LEADS)),
      appointments: JSON.parse(JSON.stringify(SEED_APPOINTMENTS)),
      bookings: [],
      payments: [],
      favorites: [],
      session: null
    };
    // สร้างใบจองตัวอย่าง 1 ใบ ผูกกับ CUS-1001
    const u = this._db.units.find(x => x.projectId === 'PRJ-001' && x.roomType === '1 Bedroom Plus');
    if (u) {
      u.status = 'Contracted';
      const p = this._db.projects.find(x => x.id === 'PRJ-001');
      const plan = buildPaymentPlan(u, p, { startDate: '2026-07-05' });
      plan.installments.forEach((it, i) => { if (i < 2) { it.status = 'Paid'; it.paidAt = it.dueDate; } });
      this._db.bookings.push({
        id: 'BK-000001', bookingNo: 'NIRA-260705-001',
        customerId: 'CUS-1001', unitId: u.id, projectId: 'PRJ-001',
        bookingFee: plan.booking, bookingDate: '2026-07-05', expireDate: '2026-07-12',
        contractFee: plan.contract, contractDate: '2026-07-12',
        downTotal: plan.downTotal, installments: plan.installments,
        transferAmount: plan.transferAmount,
        promotions: ['จองวันนี้ ฟรีค่าส่วนกลาง 2 ปี', 'ส่วนลดพิเศษ Pre-sale 3%'],
        loan: { bank: 'ธนาคารกสิกรไทย', amount: Math.round(u.priceNet * 0.85), years: 30, rate: 3.15, status: 'Pre-approved' },
        status: 'Down paying', salesOwner: 'คุณพลอย',
        documents: [
          { name: 'สำเนาบัตรประชาชน', status: 'Received' },
          { name: 'สำเนาทะเบียนบ้าน', status: 'Received' },
          { name: 'สลิปเงินเดือน 3 เดือน', status: 'Received' },
          { name: 'Statement 6 เดือน', status: 'Waiting' }
        ],
        createdAt: '2026-07-05'
      });
      this._db.payments.push(
        { id:'PY-0001', bookingId:'BK-000001', type:'เงินจอง', amount:plan.booking, method:'QR PromptPay', paidAt:'2026-07-05', status:'Verified', receiptNo:'RC-26070501' },
        { id:'PY-0002', bookingId:'BK-000001', type:'เงินทำสัญญา', amount:plan.contract, method:'โอนผ่านธนาคาร', paidAt:'2026-07-12', status:'Verified', receiptNo:'RC-26071201' },
        { id:'PY-0003', bookingId:'BK-000001', type:'ผ่อนดาวน์ งวดที่ 1', amount:plan.installments[0].amount, method:'โอนผ่านธนาคาร', paidAt:'2026-07-05', status:'Verified', receiptNo:'RC-26070502' },
        { id:'PY-0004', bookingId:'BK-000001', type:'ผ่อนดาวน์ งวดที่ 2', amount:plan.installments[1].amount, method:'บัตรเครดิต', paidAt:'2026-08-05', status:'Waiting verify', receiptNo:'-' }
      );
    }
    this.save();
    if (!silent) location.reload();
  },
  save() { localStorage.setItem(DB_KEY, JSON.stringify(this._db)); },
  get db() { return this._db || this.init(); },

  projects() { return this.db.projects; },
  project(id) { return this.db.projects.find(p => p.id === id); },
  units(filter = {}) {
    let list = this.db.units.slice();
    if (filter.projectId) list = list.filter(u => u.projectId === filter.projectId);
    if (filter.status) list = list.filter(u => u.status === filter.status);
    return list;
  },
  unit(id) { return this.db.units.find(u => u.id === id); },
  customer(id) { return this.db.customers.find(c => c.id === id); },
  bookings() { return this.db.bookings; },
  booking(id) { return this.db.bookings.find(b => b.id === id); },
  bookingsOf(customerId) { return this.db.bookings.filter(b => b.customerId === customerId); },
  payments(bookingId) { return this.db.payments.filter(p => !bookingId || p.bookingId === bookingId); },
  leads() { return this.db.leads; },
  appointments() { return this.db.appointments; },

  toggleFav(unitId) {
    const f = this.db.favorites, i = f.indexOf(unitId);
    if (i >= 0) f.splice(i, 1); else f.push(unitId);
    this.save(); return i < 0;
  },
  isFav(unitId) { return this.db.favorites.includes(unitId); },

  addCustomer(c) {
    const id = uid('CUS'); this.db.customers.push({ ...c, id, createdAt: new Date().toISOString().slice(0, 10) });
    this.save(); return id;
  },
  addBooking(b) {
    const n = this.db.bookings.length + 1;
    const rec = { ...b, id: 'BK-' + String(n).padStart(6, '0'),
      bookingNo: 'NIRA-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + String(n).padStart(3, '0'),
      createdAt: new Date().toISOString().slice(0, 10) };
    this.db.bookings.push(rec);
    const u = this.unit(b.unitId); if (u) u.status = 'Reserved';
    this.save(); return rec;
  },
  addPayment(p) {
    const rec = { ...p, id: uid('PY') };
    this.db.payments.push(rec); this.save(); return rec;
  },
  setSession(s) { this.db.session = s; this.save(); },
  session() { return this.db.session; }
};

Store.init();
