# ชุดคำสั่งสร้างรูปด้วย Gemini — NIRA Residence

เว็บถูกต่อระบบรูปไว้เรียบร้อยแล้ว **คุณแค่สร้างรูป → ตั้งชื่อไฟล์ → วางใน `assets/img/`** รูปจะขึ้นเองทันที
ไฟล์ไหนยังไม่มี เว็บจะถอยกลับไปใช้ placeholder เดิมอัตโนมัติ — ไม่พัง ไม่มีรูปแตก ทำทีละรูปได้

---

## วิธีใช้ (3 ขั้น)

**ขั้นที่ 1** เปิด [gemini.google.com](https://gemini.google.com) → วาง **STYLE BLOCK** ข้างล่างนี้เป็นข้อความแรกของแชต (ทำครั้งเดียวต่อ 1 แชต)

**ขั้นที่ 2** วางพรอมป์ทีละอัน → โหลดรูปที่ได้ → **เปลี่ยนชื่อไฟล์ให้ตรงกับหัวข้อ** (เช่น `hero-tower.jpg`)

**ขั้นที่ 3** วางไฟล์ทั้งหมดไว้ใน `condo-web/assets/img/` แล้วสั่ง:

```powershell
cd "$env:USERPROFILE\condo-web"
python tools/prepare_images.py      # ย่อขนาด บีบอัด และบอกว่ายังขาดรูปไหน
git add -A ; git commit -m "add images" ; git push
```

> **นามสกุลไฟล์ไม่ต้องซีเรียส** — เว็บลองให้เอง `.jpg → .png → .webp → .jpeg`
> Gemini ให้มาเป็น `.png` ก็วางได้เลย แค่ชื่อหน้าไฟล์ต้องตรง

---

## STYLE BLOCK — วางเป็นข้อความแรกของแชต

```
You are my image generator for a premium Bangkok condominium website called NIRA Residence.
The website uses a very dark UI: background #0A0A0A, cards #141414, hairline borders white 8%,
and ONE accent colour: lime green #D6FF66.

Every image you generate for me must follow this house style unless I say otherwise:
- Photorealistic, shot on a 35mm full-frame camera, shallow natural depth of field.
- Cinematic dark grading. Deep near-black shadows. Rich but restrained contrast.
- Warm 3000K practical lighting inside, cool blue-hour light outside.
- Exactly one small lime-green (#D6FF66) accent somewhere in frame — an LED strip,
  a glowing sign, a cushion — never more than about 5% of the frame.
- Minimal, uncluttered, editorial real-estate composition. Nothing kitsch.
- NO text, NO watermark, NO logo, NO brand names, NO recognisable human faces.
- 4K, ultra detailed, clean edges.

Reply "ready" and wait for my first image prompt. Generate exactly ONE image per prompt,
at the aspect ratio I specify.
```

หลังจาก Gemini ตอบ `ready` แล้วค่อยวางพรอมป์ทีละอัน

---

# ชุดที่ 1 — 11 รูป (ทำก่อน หน้าแรกเปลี่ยนทั้งหน้า)

## `hero-tower.jpg` — ภาพใหญ่หน้าแรก · **21:9**

```
Aspect ratio 21:9. A cluster of three modern residential towers in central Bangkok at blue hour,
photographed from street level looking up at a slight angle. The tallest tower is in the middle.
Glass and dark anodised aluminium facades, vertical fins, warm lit windows scattered irregularly
across the floors, a lime-green (#D6FF66) LED line running up one edge of the middle tower.
Wet asphalt foreground reflecting the lights. Deep navy-black sky, no stars, thin low clouds.
Cinematic, calm, expensive. No text, no signage, no people.
```

## `project-nira-suk.jpg` — การ์ดโครงการ 1 · **16:10**

```
Aspect ratio 16:10. Exterior of a 34-storey luxury low-density condominium on Sukhumvit 39,
Bangkok, at dusk. Warm limestone and dark bronze facade, deep balconies with planting,
a landscaped drop-off lobby lit warmly at ground level, mature rain trees framing the left edge.
Shot from across a quiet residential soi. Sophisticated, understated, Japanese-influenced luxury.
No text, no people.
```

## `project-nira-riv.jpg` — การ์ดโครงการ 2 · **16:10**

```
Aspect ratio 16:10. Two slender 42-storey glass residential towers standing directly on the
Chao Phraya riverfront in Bangkok, photographed from a boat on the river at blue hour.
Full-height glass, cool silver mullions, an infinity pool deck glowing on a podium level,
warm lights reflecting in long streaks on the dark water. A private pier in the foreground.
Cool cinematic palette. No text, no people.
```

## `project-nira-pha.jpg` — การ์ดโครงการ 3 · **16:10**

```
Aspect ratio 16:10. A low-rise 8-storey condominium complex in a leafy Bangkok neighbourhood,
late afternoon golden light. Four connected buildings of warm off-white render and dark timber
screens, arranged around a green courtyard garden with a 25m swimming pool and tall palms.
Friendly and calm rather than luxurious. Shot from the courtyard. No text, no people.
```

## `feature-availability.jpg` — Bento 1 · **16:10**

```
Aspect ratio 16:10. A dark-mode software UI mockup of a condominium "stacking plan": a tall grid
of small rounded rectangles arranged in rows and columns representing floors and units of a tower.
Background #0A0A0A, cards #141414, 1px borders in white 8%. Units are colour-coded:
most in lime green #D6FF66, some in amber, some in muted grey. A thin left column shows floor
numbers. A small floating tooltip card hovers over one unit. Inter typeface, tiny English labels
only, all text short and legible. Rendered as a clean product screenshot floating slightly in
3D perspective. No logos.
```

## `feature-cost.jpg` — Bento 2 · **16:10**

```
Aspect ratio 16:10. A dark-mode software UI mockup of a cost breakdown panel for a property
purchase. Background #0A0A0A, one large rounded card #141414 with 1px white 8% border.
Inside: a vertical list of about eight rows, each with a short English label on the left and a
right-aligned number, separated by hairline dividers, then a bold total row highlighted with a
lime green #D6FF66 underline. A small donut chart in the top-right corner in lime green and grey.
Inter typeface, short English labels only. Clean product screenshot, slight 3D perspective.
No logos.
```

## `feature-funnel.jpg` — บล็อก 4× · **4:5**

```
Aspect ratio 4:5. A dark-mode analytics dashboard mockup shown on a tall vertical panel.
Background #0A0A0A. Top: a row of four small KPI tiles with big numbers. Middle: a sales funnel
chart with five descending horizontal bars in gradient lime green #D6FF66 to dark olive.
Bottom: a simple line chart with a glowing lime green line and soft gradient fill under it.
All cards #141414 with 1px white 8% borders and 20px rounded corners. Inter typeface,
short English labels only. Clean product screenshot, slight 3D perspective. No logos.
```

## `avatar-1.jpg` · `avatar-2.jpg` · `avatar-3.jpg` — รูปลูกบ้าน · **1:1**

รูปเล็ก 42px กลม ใช้ครึ่งตัวก็พอ — ข้อนี้ **อนุญาตให้มีใบหน้าได้** (ต้องบอก Gemini ทับ STYLE BLOCK)

```
Aspect ratio 1:1. Override the "no faces" rule for this one image only.
Editorial portrait headshot of a Thai man in his early 30s, software engineer, short neat hair,
plain dark grey knit shirt, relaxed genuine half-smile, looking slightly off camera.
Studio lighting on a dark charcoal #141414 seamless background, soft key light from the left,
faint lime-green rim light on the right shoulder. Shallow depth of field. Natural skin texture,
not retouched, not AI-glossy. Square crop, head and shoulders centred. → avatar-1.jpg
```

```
Aspect ratio 1:1. Override the "no faces" rule for this one image only.
Editorial portrait headshot of a Thai woman in her early 40s, confident business owner,
shoulder-length hair, simple dark blazer, warm composed expression looking at camera.
Studio lighting on a dark charcoal #141414 seamless background, soft key light from the right,
faint lime-green rim light on the left shoulder. Shallow depth of field. Natural skin texture,
not retouched. Square crop, head and shoulders centred. → avatar-2.jpg
```

```
Aspect ratio 1:1. Override the "no faces" rule for this one image only.
Editorial portrait headshot of a Japanese man in his late 30s, expatriate manager in Bangkok,
neat side-parted hair, thin metal-frame glasses, charcoal shirt with no tie, calm friendly
expression. Studio lighting on a dark charcoal #141414 seamless background, soft key light
from the left, faint lime-green rim light. Shallow depth of field. Natural skin texture.
Square crop, head and shoulders centred. → avatar-3.jpg
```

## `og-cover.jpg` — รูปตอนแชร์ลิงก์ลง LINE / Facebook · **1.91:1**

```
Aspect ratio 1.91:1 (1200x630). Wide cinematic hero image for a luxury Bangkok condominium
brand. Left two-thirds: a modern condominium tower at blue hour seen from a low angle, warm lit
windows, lime-green #D6FF66 LED line up one edge. Right third: clean negative space of deep
near-black sky where a logo will be placed later — keep it empty and uncluttered.
Do not add any text or logo yourself. Cinematic, premium, calm.
```

> `favicon.png` **สร้างให้แล้ว** (ตัว N บนพื้นเขียวมะนาว) ไม่ต้องทำ

---

# ชุดที่ 2 — 14 รูปห้อง (ใช้ในการ์ดค้นหาห้อง + แกลเลอรีหน้ารายละเอียด + หน้าจอง)

ทุกรูป **4:3** · ชื่อไฟล์ = `unit-<รหัสแบบห้อง>.jpg`

### กลุ่ม A — NIRA สุขุมวิท 39 (โทนอุ่น หรูแบบญี่ปุ่น ไม้โอ๊ค ทองเหลือง วิวเมือง)

| ไฟล์ | แบบห้อง | พื้นที่ |
|---|---|---|
| `unit-A1.jpg` | Studio | 28 ตร.ม. |
| `unit-B1.jpg` | 1 Bedroom | 35 ตร.ม. |
| `unit-B2.jpg` | 1 Bedroom Plus | 45 ตร.ม. |
| `unit-C1.jpg` | 2 Bedroom | 62 ตร.ม. |
| `unit-D1.jpg` | 2 Bedroom Duplex | 88 ตร.ม. |
| `unit-P1.jpg` | Penthouse | 145 ตร.ม. |

```
Aspect ratio 4:3. Interior of a 28 sqm studio apartment in a luxury Bangkok condominium,
evening. One open space: a low platform bed against a warm oak veneer feature wall, a compact
matte charcoal kitchenette with brushed brass handles on the left, floor-to-ceiling window on
the right showing soft bokeh city lights. Warm 3000K lighting, a thin lime-green #D6FF66 LED
strip under the kitchen counter. Shot from the entry corner with a wide lens. Impeccably tidy.
→ unit-A1.jpg
```

```
Aspect ratio 4:3. Interior of a 35 sqm one-bedroom apartment in a luxury Bangkok condominium,
evening. Foreground: a compact living area with a two-seat charcoal fabric sofa and a small
round marble side table. Background through an open doorway: the bedroom with a linen-dressed
bed. Warm oak flooring, matte charcoal joinery, brushed brass details, floor-to-ceiling window
with city bokeh. One lime-green #D6FF66 cushion. Wide lens, shot from the entry.
→ unit-B1.jpg
```

```
Aspect ratio 4:3. Interior of a 45 sqm one-bedroom-plus apartment in a luxury Bangkok
condominium, evening. A living area with a three-seat charcoal sofa, and to the side a small
glass-partitioned multi-purpose room used as a home office with a slim oak desk.
Warm oak floor, matte charcoal cabinetry, brushed brass, floor-to-ceiling glass with city
bokeh and a sliver of balcony. Thin lime-green #D6FF66 LED cove in the ceiling recess.
Wide lens. → unit-B2.jpg
```

```
Aspect ratio 4:3. Interior of a 62 sqm two-bedroom apartment in a luxury Bangkok condominium,
evening. Open-plan living and dining: a long charcoal sofa facing a wall-mounted TV on stone
cladding, a four-seat oak dining table with brass pendant lights above, closed kitchen behind
a glass door on the left, two bedroom doors on the right. Floor-to-ceiling windows across the
back with city bokeh. One lime-green #D6FF66 accent object. Wide lens. → unit-C1.jpg
```

```
Aspect ratio 4:3. Interior of an 88 sqm two-bedroom duplex apartment in a luxury Bangkok
condominium, evening. Double-height living room with a full two-storey glass wall showing city
lights, a floating oak-and-blackened-steel staircase on the right leading to a mezzanine with a
glass balustrade. Large charcoal sectional sofa, tall slim floor lamp, stone coffee table.
Dramatic warm lighting, one lime-green #D6FF66 LED line tracing the stair underside.
Wide lens from the lower floor. → unit-D1.jpg
```

```
Aspect ratio 4:3. Interior of a 145 sqm penthouse in a luxury Bangkok condominium at blue hour.
Expansive open living space with a panoramic wraparound window showing the Bangkok skyline from
high above. Deep charcoal sectional, book-matched marble feature wall, oak ceiling battens,
a grand piano silhouette in the far corner, brushed brass floor lamp. Very high ceiling.
One lime-green #D6FF66 accent light in the ceiling cove. Wide lens, symmetrical composition.
→ unit-P1.jpg
```

### กลุ่ม R — NIRA เดอะ ริเวอร์ (โทนเย็น ไม้แอชอ่อน หินอ่อนขาว วิวแม่น้ำ)

| ไฟล์ | แบบห้อง | พื้นที่ |
|---|---|---|
| `unit-RA.jpg` | Studio | 26 ตร.ม. |
| `unit-RB.jpg` | 1 Bedroom | 34 ตร.ม. |
| `unit-RC.jpg` | 2 Bedroom | 58 ตร.ม. |
| `unit-RD.jpg` | 3 Bedroom | 96 ตร.ม. |
| `unit-RP.jpg` | Penthouse | 190 ตร.ม. |

```
Aspect ratio 4:3. Interior of a 26 sqm studio apartment in a riverside Bangkok condominium at
blue hour. Cool restrained palette: pale ash wood floor, white marble counter, off-white walls.
A low bed, a slim work ledge along the window, and a full-height glass wall showing the Chao
Phraya river with boat lights streaking on dark water. Soft cool light, one small lime-green
#D6FF66 accent lamp. Wide lens. → unit-RA.jpg
```

```
Aspect ratio 4:3. Interior of a 34 sqm one-bedroom apartment in a riverside Bangkok
condominium at blue hour. Living area with a light grey two-seat sofa, pale ash flooring,
white marble kitchen counter, and a full-height glass wall opening to a narrow balcony
overlooking the Chao Phraya river. Bedroom glimpsed through an open door. Cool calm palette,
one lime-green #D6FF66 throw. Wide lens. → unit-RB.jpg
```

```
Aspect ratio 4:3. Interior of a 58 sqm two-bedroom apartment in a riverside Bangkok
condominium at blue hour. Open-plan living and dining in a cool palette: pale ash floor,
white marble island, light grey sectional sofa, round dining table for four, slim black-framed
glazing. Panoramic river view across the whole back wall with distant city lights.
One lime-green #D6FF66 accent object. Wide lens. → unit-RC.jpg
```

```
Aspect ratio 4:3. Interior of a 96 sqm three-bedroom family apartment in a riverside Bangkok
condominium, early evening. Large open living and dining area, pale ash floor, white marble
and light oak joinery, a six-seat dining table, a generous light grey sofa, and a corner
glass wall with a wide 270-degree river panorama. Warm lamps balancing the cool exterior light.
One lime-green #D6FF66 accent cushion. Wide lens. → unit-RD.jpg
```

```
Aspect ratio 4:3. Interior of a 190 sqm penthouse in a riverside Bangkok condominium at blue
hour. Vast open living space with a fully glazed curved corner giving an unbroken panorama of
the Chao Phraya river bend and the city skyline beyond. White marble floor with warm ash inlays,
a long low sectional, a sculptural pendant light, a dining table for ten. Very high ceiling,
minimal furnishing, immense sense of space. One lime-green #D6FF66 cove light.
Wide lens, symmetrical. → unit-RP.jpg
```

### กลุ่ม P — NIRA พาร์ค พหลโยธิน 24 (โทนสว่าง เรียบ ไม้เบิร์ช วิวสวน แสงกลางวัน)

| ไฟล์ | แบบห้อง | พื้นที่ |
|---|---|---|
| `unit-PA.jpg` | Studio | 24 ตร.ม. |
| `unit-PB.jpg` | 1 Bedroom | 30 ตร.ม. |
| `unit-PC.jpg` | 2 Bedroom | 48 ตร.ม. |

```
Aspect ratio 4:3. Interior of a 24 sqm studio apartment in a friendly low-rise Bangkok
condominium, bright late-afternoon daylight. Simple and honest: light birch flooring, white
walls, a compact white kitchenette, a single bed with grey linen, a small round table with two
chairs by a large window overlooking a green garden courtyard with palms. Airy and cheerful,
not luxurious. One lime-green #D6FF66 accent chair. Wide lens. → unit-PA.jpg
```

```
Aspect ratio 4:3. Interior of a 30 sqm one-bedroom apartment in a friendly low-rise Bangkok
condominium, bright daylight. A small living area with a grey two-seat sofa and a low birch
coffee table, a separate bedroom door on the right, and a sliding glass door to a small balcony
with green garden foliage and dappled sunlight beyond. Light birch floor, white walls,
simple and clean. One lime-green #D6FF66 cushion. Wide lens. → unit-PB.jpg
```

```
Aspect ratio 4:3. Interior of a 48 sqm two-bedroom apartment in a friendly low-rise Bangkok
condominium, bright daylight. Open living and dining area with a grey three-seat sofa, a birch
dining table for four, an open white kitchen along the left wall, and two bedroom doors on the
right. A wide sliding door leads to a balcony with tropical garden greenery and the corner of a
swimming pool below. Practical, warm, family-friendly. One lime-green #D6FF66 accent.
Wide lens. → unit-PC.jpg
```

---

# ชุดที่ 3 — 11 รูปประกอบ (วิว / สภาพห้อง / แผนที่)

## วิวจากห้อง — ใช้ในแกลเลอรีช่องขวาล่าง · **4:3**

```
Aspect ratio 4:3. The view looking out through a floor-to-ceiling window of a high-floor
Bangkok condominium at night. Dense city skyline, expressway light trails, scattered tower
lights, a hazy orange-black sky. Shot from inside so the window frame edges are just visible.
Cinematic, moody. → view-city.jpg
```

```
Aspect ratio 4:3. The view looking out through a floor-to-ceiling window of a Bangkok riverside
condominium at blue hour. The wide Chao Phraya river curving away, long reflections of city
lights on dark water, a lit passenger boat leaving a wake, distant towers on the far bank.
Shot from inside, window frame just visible at the edges. Cinematic, calm. → view-river.jpg
```

```
Aspect ratio 4:3. The view looking out through a window of a Bangkok condominium in the late
afternoon, overlooking a large public park: mature green trees, a lake reflecting the sky,
walking paths, and city towers in the hazy background. Warm golden light. Shot from inside.
→ view-park.jpg
```

```
Aspect ratio 4:3. The view looking down from a condominium unit onto a 30-metre rooftop
swimming pool at dusk. Turquoise-lit water, timber deck, sun loungers in neat rows, tall palms
in planters, warm deck lighting, a glass balustrade at the pool edge with the city beyond.
Cinematic dark grading. → view-pool.jpg
```

```
Aspect ratio 4:3. The view looking out from a low-floor condominium unit onto a landscaped
tropical garden courtyard in the late afternoon. Frangipani and palm trees, clipped hedges,
a stone path, dappled golden sunlight, a low-rise white building wing on the far side.
Fresh and green. → view-garden.jpg
```

## สภาพเฟอร์นิเจอร์ — ช่องกลางของแกลเลอรี · **4:3**

```
Aspect ratio 4:3. A completely empty bare-shell condominium living room ready for handover.
Smooth bare concrete floor, plain white plastered walls, exposed ceiling with capped electrical
outlets, an unfurnished floor-to-ceiling window letting in flat daylight, protective film still
on the window frame. Clean and swept, nothing in the room. Honest documentary look, not moody.
→ living-bare.jpg
```

```
Aspect ratio 4:3. A partly furnished condominium living room: built-in joinery is installed —
a matte charcoal TV wall unit, kitchen cabinetry and a wardrobe — but there is no loose
furniture at all, no sofa, no table, no rug. Warm oak flooring, white walls,
floor-to-ceiling window with soft daylight. Clean, spacious, slightly empty feeling.
→ living-partly.jpg
```

```
Aspect ratio 4:3. A fully furnished condominium living room in the evening, styled like a
magazine shoot. Charcoal three-seat sofa with linen cushions, a stone coffee table with a
ceramic vase and stacked books, a textured rug, a slim arc floor lamp, framed abstract art,
warm oak floor, floor-to-ceiling window with city bokeh behind sheer curtains.
One lime-green #D6FF66 cushion. Inviting and warm. → living-fully.jpg
```

## แผนที่ทำเล — แท็บ "ทำเล" · **16:9**

```
Aspect ratio 16:9. A stylised dark-mode city map graphic, viewed straight from above.
Background #0A0A0A, roads as thin #2A2A2A lines, blocks as very dark grey shapes, water as
#101820. A single glowing lime-green #D6FF66 map pin sits at the centre with a soft radial glow,
and a lime-green dashed walking route runs from the pin to a small transit station icon nearby.
Three or four tiny neutral grey icons mark a mall, a hospital and a park. Extremely minimal,
no country names, no readable text labels, no legend. Looks like a premium app map screenshot.
→ map-nira-suk.jpg
```

> `map-nira-riv.jpg` และ `map-nira-pha.jpg` ใช้พรอมป์เดียวกัน แค่ขอให้เปลี่ยนผัง:
> — **riv**: `...but the map shows a wide dark river curving through the right half of the frame, with the pin on the west bank.`
> — **pha**: `...but the map shows one wide main road running vertically with a large dark-green park block in the upper left, and the pin on a small side soi.`

---

# ชุดที่ 4 — 14 ผังห้อง (ทำทีหลังได้ ไม่ทำก็ไม่พัง)

แท็บ "ผังห้อง" ในหน้ารายละเอียด · ทุกรูป **1:1** · ชื่อ = `floorplan-<รหัส>.jpg`

**พรอมป์ตั้งต้น** (เปลี่ยนแค่บรรทัดสุดท้าย):

```
Aspect ratio 1:1. A clean 2D architectural floor plan drawing of a condominium unit, viewed
straight from directly above, orthographic — not a 3D render, not a perspective view.
Dark presentation style: background #0D0F0C, walls drawn as solid lime-green #D6FF66 lines
about 3px thick, furniture and fixtures drawn as thin white 40% opacity outlines,
room areas filled with very subtle dark grey tone. Thin dimension lines with small arrowheads
along the top and left edges. Short English room labels only, in a small clean sans-serif
(LIVING, BEDROOM, BATH, KITCHEN, BALCONY) — keep every label under 10 characters and legible.
A small north arrow in the bottom-right corner. No title block, no logo, no signature,
no long text. Precise, minimal, editorial.

The unit to draw: <ใส่บรรทัดจากตารางข้างล่าง>
```

| ไฟล์ | บรรทัดที่ใส่ตรง `<...>` |
|---|---|
| `floorplan-A1.jpg` | `a 28 sqm studio — one open living/sleeping space, a kitchenette along one wall, one bathroom, one 4 sqm balcony.` |
| `floorplan-B1.jpg` | `a 35 sqm one-bedroom — entry hall, living/dining, open kitchen, one bedroom, one bathroom, one 5 sqm balcony.` |
| `floorplan-B2.jpg` | `a 45 sqm one-bedroom-plus — living/dining, open kitchen, one bedroom, one small glass-partitioned study room, one bathroom, one 6 sqm balcony.` |
| `floorplan-C1.jpg` | `a 62 sqm two-bedroom — living/dining, closed kitchen, master bedroom with ensuite bathroom, second bedroom, second bathroom, one 8 sqm balcony.` |
| `floorplan-D1.jpg` | `an 88 sqm two-bedroom duplex — show BOTH levels side by side in one frame, labelled LOWER and UPPER. Lower: double-height living/dining, kitchen, guest bathroom, 12 sqm balcony, staircase. Upper: two bedrooms, two bathrooms, mezzanine void over the living room.` |
| `floorplan-P1.jpg` | `a 145 sqm penthouse — large open living/dining, island kitchen, three bedrooms, three bathrooms, walk-in closet off the master, maid room, and a 22 sqm wraparound terrace.` |
| `floorplan-RA.jpg` | `a 26 sqm studio — one open living/sleeping space, a linear kitchenette, one bathroom, one 4 sqm balcony facing the long side.` |
| `floorplan-RB.jpg` | `a 34 sqm one-bedroom — entry, living/dining, open kitchen, one bedroom, one bathroom, one 6 sqm balcony running the full width.` |
| `floorplan-RC.jpg` | `a 58 sqm two-bedroom — living/dining, open island kitchen, two bedrooms, two bathrooms, one 9 sqm balcony along the whole river-facing side.` |
| `floorplan-RD.jpg` | `a 96 sqm three-bedroom — large living/dining, island kitchen, master bedroom with ensuite and walk-in closet, two further bedrooms, two more bathrooms, a 14 sqm corner balcony.` |
| `floorplan-RP.jpg` | `a 190 sqm penthouse — a curved fully glazed corner, huge open living/dining, island kitchen, four bedrooms, four bathrooms, walk-in closet, maid room and store, and a 35 sqm wraparound terrace.` |
| `floorplan-PA.jpg` | `a 24 sqm studio — one compact open living/sleeping space, a small kitchenette, one bathroom, one 3 sqm balcony.` |
| `floorplan-PB.jpg` | `a 30 sqm one-bedroom — small entry, living area, kitchenette, one bedroom, one bathroom, one 4 sqm balcony.` |
| `floorplan-PC.jpg` | `a 48 sqm two-bedroom — living/dining, open kitchen along one wall, two bedrooms, one shared bathroom, one 6 sqm balcony.` |

---

## เช็กลิสต์ครบ 50 ไฟล์

```
ชุด 1 (11)  hero-tower · project-nira-suk · project-nira-riv · project-nira-pha
            feature-availability · feature-cost · feature-funnel
            avatar-1 · avatar-2 · avatar-3 · og-cover
ชุด 2 (14)  unit-A1 unit-B1 unit-B2 unit-C1 unit-D1 unit-P1
            unit-RA unit-RB unit-RC unit-RD unit-RP
            unit-PA unit-PB unit-PC
ชุด 3 (11)  view-city view-river view-park view-pool view-garden
            living-bare living-partly living-fully
            map-nira-suk map-nira-riv map-nira-pha
ชุด 4 (14)  floorplan-A1 B1 B2 C1 D1 P1 · RA RB RC RD RP · PA PB PC
✅ ทำให้แล้ว  favicon.png · apple-touch-icon.png
```

สั่ง `python tools/prepare_images.py` เมื่อไหร่ก็ได้ เพื่อดูว่าเหลือรูปไหนยังไม่ได้ทำ

---

## เคล็ดลับให้รูปออกมาเป็นชุดเดียวกัน

1. **ใช้แชตเดียวยาว ๆ** อย่าเปิดแชตใหม่กลางคัน Gemini จะจำสไตล์จาก STYLE BLOCK ต่อเนื่อง
2. ถ้ารูปเริ่มหลุดโทน พิมพ์สั้น ๆ ว่า `Same house style as before.` แล้ววางพรอมป์ถัดไป
3. อยากให้ห้องในโครงการเดียวกันดูเป็นตึกเดียวกัน — แนบรูปก่อนหน้าเข้าไปแล้วพิมพ์
   `Match the materials, colours and lighting of this reference exactly.`
4. รูป UI (ชุด 1) ถ้าตัวหนังสือเบี้ยว ให้พิมพ์ `Regenerate with fewer labels and larger text.`
5. **อย่าขอภาษาไทยในรูป** — โมเดลเขียนไทยเพี้ยนเกือบทุกครั้ง ให้ใช้ป้ายอังกฤษสั้น ๆ อย่างเดียว
