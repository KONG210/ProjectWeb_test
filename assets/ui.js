/* ============================================================
   NIRA RESIDENCE — Shared UI helpers
   ============================================================ */

/* ---------- formatting ---------- */
const fmt = {
  baht(n, dec = 0) {
    if (n == null || isNaN(n)) return '-';
    return '฿' + Number(n).toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  },
  num(n, dec = 0) {
    if (n == null || isNaN(n)) return '-';
    return Number(n).toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  },
  short(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 2).replace(/\.00$/, '') + ' ล้าน';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return String(n);
  },
  date(d) {
    if (!d) return '-';
    const dt = new Date(d);
    return dt.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' });
  },
  pct(n, dec = 0) { return Number(n).toFixed(dec) + '%'; }
};

/* ---------- status → badge class ---------- */
const STATUS_STYLE = {
  'Available': ['badge-ok', 'ว่าง'],
  'On hold': ['badge-warn', 'ถือสิทธิ์ชั่วคราว'],
  'Reserved': ['badge-warn', 'จองแล้ว'],
  'Contracted': ['badge-info', 'ทำสัญญาแล้ว'],
  'Sold': ['badge-danger', 'ขายแล้ว'],
  'Blocked': ['badge-mute', 'ปิดการขาย'],
  'Pending': ['badge-warn', 'รอชำระ'],
  'Paid': ['badge-ok', 'ชำระแล้ว'],
  'Verified': ['badge-ok', 'ตรวจสอบแล้ว'],
  'Waiting verify': ['badge-warn', 'รอตรวจสอบ'],
  'Rejected': ['badge-danger', 'ไม่ผ่าน'],
  'Received': ['badge-ok', 'ได้รับแล้ว'],
  'Waiting': ['badge-warn', 'รอเอกสาร'],
  'Confirmed': ['badge-ok', 'ยืนยันแล้ว'],
  'Pre-approved': ['badge-ok', 'อนุมัติเบื้องต้น'],
  'New': ['badge-info', 'ลูกค้าใหม่'],
  'Contacted': ['badge-mute', 'ติดต่อแล้ว'],
  'Appointment': ['badge-info', 'นัดชมห้อง'],
  'Negotiating': ['badge-warn', 'กำลังเจรจา'],
  'Booked': ['badge-ok', 'จองแล้ว'],
  'Lost': ['badge-danger', 'ปิดการขายไม่สำเร็จ'],
  'Down paying': ['badge-info', 'กำลังผ่อนดาวน์'],
  'Contract signed': ['badge-info', 'เซ็นสัญญาแล้ว'],
  'Transferred': ['badge-ok', 'โอนกรรมสิทธิ์แล้ว'],
  'Cancelled': ['badge-danger', 'ยกเลิก'],
  'Pre-sale': ['badge-accent', 'พรีเซล'],
  'Under construction': ['badge-warn', 'กำลังก่อสร้าง'],
  'Ready to move': ['badge-ok', 'พร้อมอยู่']
};
function badge(status) {
  const [cls, label] = STATUS_STYLE[status] || ['badge-mute', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

/* ============================================================
   IMAGE SLOTS — ระบบเสียบรูปจริงลง placeholder
   ------------------------------------------------------------
   วิธีใช้: วางไฟล์รูปใน assets/img/ ตั้งชื่อตาม assets/img/README.md
   - ลองนามสกุลไล่จาก .jpg → .png → .webp → .jpeg (Gemini ให้มาแบบไหนก็ใช้ได้)
   - ถ้าไม่เจอไฟล์เลย จะลบ <img> ทิ้งแล้วโชว์ placeholder เดิม เว็บไม่พัง
   ============================================================ */
const IMG_DIR = 'assets/img/';
const IMG_EXT = ['jpg', 'png', 'webp', 'jpeg'];

function imgTag(name, alt = '', cls = '') {
  return `<img class="ph-img${cls ? ' ' + cls : ''}" src="${IMG_DIR}${name}.${IMG_EXT[0]}"` +
    ` alt="${String(alt).replace(/"/g, '&quot;')}" loading="lazy" decoding="async"` +
    ` data-img="${name}" data-ext="0" onload="phOn(this)" onerror="phFallback(this)">`;
}
function phOn(el) { el.parentElement.classList.add('has-img'); }
function phFallback(el) {
  const i = +el.dataset.ext + 1;
  if (i < IMG_EXT.length) {
    el.dataset.ext = i;
    el.src = IMG_DIR + el.dataset.img + '.' + IMG_EXT[i];
  } else {
    el.parentElement.classList.remove('has-img');
    el.remove();
  }
}

/* map ค่าจริงในฐานข้อมูล → ชื่อไฟล์รูป */
const IMG_VIEW = {
  'City View': 'view-city', 'River View': 'view-river', 'Park View': 'view-park',
  'Pool View': 'view-pool', 'Garden View': 'view-garden'
};
const IMG_FURNISH = {
  'Bare shell': 'living-bare', 'Partly furnished': 'living-partly', 'Fully furnished': 'living-fully'
};
const imgKey = {
  unit: u => 'unit-' + u.layoutCode,
  floorplan: u => 'floorplan-' + u.layoutCode,
  view: u => IMG_VIEW[u.view] || 'view-city',
  living: u => IMG_FURNISH[u.furnishing] || 'living-fully',
  project: p => 'project-' + p.code.toLowerCase(),
  map: p => 'map-' + p.code.toLowerCase()
};

/* ---------- toast ---------- */
let _toastEl;
function toast(msg, isErr) {
  if (!_toastEl) { _toastEl = document.createElement('div'); _toastEl.className = 'toast'; document.body.appendChild(_toastEl); }
  _toastEl.textContent = msg;
  _toastEl.className = 'toast show' + (isErr ? ' err' : '');
  clearTimeout(_toastEl._t);
  _toastEl._t = setTimeout(() => { _toastEl.className = 'toast' + (isErr ? ' err' : ''); }, 2600);
}

/* ---------- query string ---------- */
const qs = new URLSearchParams(location.search);

/* ---------- scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.delay || 0, 10);
        setTimeout(() => e.target.classList.add('in'), d);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
  els.forEach(e => io.observe(e));
}

/* ---------- animated counter ---------- */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  const run = el => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec || 0, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1500; const t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .4 });
  els.forEach(e => io.observe(e));
}

/* ---------- navbar ---------- */
const NAV_ITEMS = [
  { href: 'index.html', label: 'หน้าแรก' },
  { href: 'index.html#projects', label: 'โครงการ' },
  { href: 'units.html', label: 'ค้นหาห้อง' },
  { href: 'index.html#pricing', label: 'แผนผ่อนชำระ' },
  { href: 'index.html#faq', label: 'คำถามที่พบบ่อย' },
  { href: 'account.html', label: 'บัญชีของฉัน' }
];

function renderNav(active) {
  const links = NAV_ITEMS.map(i =>
    `<a href="${i.href}"${i.label === active ? ' class="active"' : ''}>${i.label}</a>`).join('');
  const html = `
  <nav class="nav" id="nav">
    <div class="wrap">
      <a class="brand" href="index.html">
        <span class="brand-mark">N</span><span>NIRA<span class="accent">.</span></span>
      </a>
      <div class="nav-links" id="navLinks">${links}
        <a href="admin.html" style="color:var(--muted-2)">ผู้ดูแลระบบ</a>
      </div>
      <a class="btn btn-primary btn-sm" href="units.html">จองห้องออนไลน์</a>
      <button class="nav-toggle" id="navToggle" aria-label="เมนู"><span></span><span></span><span></span></button>
    </div>
  </nav>`;
  document.body.insertAdjacentHTML('afterbegin', html);
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  document.getElementById('navToggle').onclick = () => document.getElementById('navLinks').classList.toggle('open');
}

/* ---------- footer ---------- */
function renderFooter() {
  const html = `
  <footer class="footer">
    <div class="glow glow-lime glow-lg" style="right:-200px;top:-260px;"></div>
    <div class="wrap footer-inner">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html"><span class="brand-mark">N</span><span>NIRA<span class="accent">.</span></span></a>
          <p style="margin-top:16px;max-width:330px;font-size:14.5px;">
            ผู้พัฒนาคอนโดมิเนียมคุณภาพใจกลางเมือง ออกแบบเพื่อการอยู่อาศัยจริง
            พร้อมระบบจองและติดตามสถานะออนไลน์ตลอด 24 ชั่วโมง
          </p>
          <div class="row" style="margin-top:22px;gap:22px;font-size:14px;color:var(--muted)">
            <a href="#">Facebook</a><a href="#">LINE OA</a><a href="#">Instagram</a><a href="#">YouTube</a>
          </div>
        </div>
        <div>
          <h5>โครงการ</h5>
          <ul>
            <li><a href="units.html?project=PRJ-001">NIRA สุขุมวิท 39</a></li>
            <li><a href="units.html?project=PRJ-002">NIRA เดอะ ริเวอร์</a></li>
            <li><a href="units.html?project=PRJ-003">NIRA พาร์ค พหลฯ 24</a></li>
            <li><a href="units.html">ห้องว่างทั้งหมด</a></li>
          </ul>
        </div>
        <div>
          <h5>บริการ</h5>
          <ul>
            <li><a href="index.html#pricing">แผนผ่อนชำระ</a></li>
            <li><a href="index.html#calc">คำนวณสินเชื่อ</a></li>
            <li><a href="account.html">ติดตามสถานะการจอง</a></li>
            <li><a href="index.html#faq">คำถามที่พบบ่อย</a></li>
            <li><a href="admin.html">สำหรับเจ้าหน้าที่</a></li>
          </ul>
        </div>
        <div>
          <h5>รับข่าวสารโครงการใหม่</h5>
          <p style="font-size:14px;margin-bottom:16px;">ส่วนลดพิเศษและรอบ Pre-sale ก่อนใคร</p>
          <form class="newsletter" onsubmit="event.preventDefault();toast('สมัครรับข่าวสารเรียบร้อย');this.reset();">
            <input type="email" placeholder="อีเมลของคุณ" required>
            <button type="submit" aria-label="สมัคร">→</button>
          </form>
          <p class="tiny" style="margin-top:14px;">โทร. 02-123-4567 · Line @niraresidence</p>
        </div>
      </div>
      <div class="wordmark">NIRA RESIDENCE</div>
    </div>
    <div class="footer-bottom">
      © 2026 NIRA Residence Co., Ltd. · นโยบายความเป็นส่วนตัว (PDPA) · ข้อกำหนดการใช้งาน
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

/* ---------- modal ---------- */
function openModal(html, large) {
  let back = document.getElementById('modalBack');
  if (!back) {
    back = document.createElement('div'); back.id = 'modalBack'; back.className = 'modal-back';
    back.innerHTML = '<div class="modal" id="modalBox"></div>';
    document.body.appendChild(back);
    back.addEventListener('click', e => { if (e.target === back) closeModal(); });
  }
  const box = document.getElementById('modalBox');
  box.className = 'modal' + (large ? ' modal-lg' : '');
  box.innerHTML = html;
  back.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const b = document.getElementById('modalBack');
  if (b) b.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- unit card (ใช้ร่วมหลายหน้า) ---------- */
function unitCard(u) {
  const p = Store.project(u.projectId);
  const sold = ['Sold', 'Blocked', 'Contracted'].includes(u.status);
  return `
  <a class="card card-hover card-pad-0 reveal" href="unit.html?id=${encodeURIComponent(u.id)}" style="display:block">
    <div class="ph" style="aspect-ratio:4/3">
      ${imgTag(imgKey.unit(u), `${p.nameTh} ห้อง ${u.unitNo} แบบ ${u.roomType}`)}
      <span class="ph-label">${u.layoutCode} · ${u.roomType}</span>
      <div style="position:absolute;top:12px;left:12px;z-index:2;display:flex;gap:6px;flex-wrap:wrap">
        ${badge(u.status)}
        ${u.tags.map(t => `<span class="badge">${t}</span>`).join('')}
      </div>
      ${u.discount ? `<div style="position:absolute;top:12px;right:12px;z-index:2"><span class="badge badge-accent">ลด ${fmt.short(u.discount)}</span></div>` : ''}
    </div>
    <div style="padding:20px">
      <div class="tiny muted">${p.nameTh}</div>
      <h3 style="margin:6px 0 10px;font-size:19px">ห้อง ${u.unitNo} · ชั้น ${u.floor}</h3>
      <div class="row wrapflex tiny muted" style="gap:14px;margin-bottom:14px">
        <span>🛏 ${u.bedrooms} ห้องนอน</span><span>🛁 ${u.bathrooms}</span>
        <span>📐 ${u.usableAreaSqm} ตร.ม.</span><span>🧭 ${u.direction}</span>
      </div>
      <div class="row-between" style="align-items:flex-end">
        <div>
          ${u.discount ? `<div class="tiny" style="text-decoration:line-through;color:var(--muted-2)">${fmt.baht(u.priceList)}</div>` : ''}
          <div style="font-size:21px;font-weight:700;letter-spacing:-.02em">${fmt.baht(u.priceNet)}</div>
          <div class="tiny muted">${fmt.baht(u.pricePerSqm)}/ตร.ม.</div>
        </div>
        <span class="badge ${sold ? 'badge-mute' : 'badge-accent'}">${sold ? 'ดูรายละเอียด' : 'จองห้องนี้'}</span>
      </div>
    </div>
  </a>`;
}

/* ---------- boot ---------- */
function boot(activeNav) {
  renderNav(activeNav);
  document.addEventListener('DOMContentLoaded', () => { initReveal(); initCounters(); });
  if (document.readyState !== 'loading') { initReveal(); initCounters(); }
}
