# Before Your Buy (วางแผนการเงินก่อนซื้อสินค้า)

เว็บแอปพลิเคชันช่วยวางแผนและประเมินงบประมาณทางการเงินก่อนตัดสินใจซื้อสินค้า ช่วยให้ผู้ใช้เปรียบเทียบราคาสินค้ากับงบประมาณ เงินที่มี และค่าใช้จ่ายจำเป็น พร้อมแสดงเงินคงเหลือสุทธิและคำแนะนำที่ชัดเจนว่า **"ซื้อได้เลย"**, **"รอไปก่อน"** หรือ **"เกินงบประมาณ"**

---

## 🌟 ฟีเจอร์หลัก (Features)

- **Landing Page (Think Before You Buy)**: หน้าแรกแนะนำระบบพร้อมปุ่ม **"Start Planning →"** และขั้นตอนการทำงาน 3 ขั้นตอน (How It Works):
  1. *Enter Your Finances*: ระบุเงินที่มีและค่าใช้จ่ายจำเป็น
  2. *Choose a Product*: ระบุชื่อสินค้าและราคา
  3. *Check Your Results*: ดูผลการวิเคราะห์ ซื้อได้เลย หรือ รอไปก่อน
- **Navigation Bar**: สลับหน้าระหว่าง Home, About และ Planner ได้อย่างสะดวก
- **Product Price & Available Budget Input**: กรอกชื่อสินค้า ราคาสินค้า งบประมาณ/เงินที่มี และค่าใช้จ่ายจำเป็น
- **Purchase Readiness Check**: คำนวณเงินคงเหลือหลังซื้อ เปอร์เซ็นต์สัดส่วนราคาสินค้าเทียบกับงบ
- **Clear Buy-or-Wait Recommendation**:
  - 🟢 **ซื้อได้เลย**: การเงินมั่นคง ปลอดภัย มีเงินสำรองเพียงพอ
  - 🟡 **รอไปก่อน**: ซื้อได้แต่งบตึงมือ เงินสำรองจะเหลือน้อย แนะนำให้คิดทบทวน
  - 🔴 **ไม่ควรซื้อ / เกินงบ**: เงินไม่พอ หรือค่าใช้จ่ายจำเป็นสูงกว่าเงินที่มี
- **Demo Presets**: ปุ่มทดลองกรอกข้อมูลตัวอย่าง 3 รูปแบบ (ปลอดภัย, ตึงมือ, เกินงบ)
- **Reset Button**: ปุ่มรีเซ็ตล้างข้อมูล
- **Validation**: ระบบตรวจสอบความถูกต้องของข้อมูลทั้ง Frontend และ Backend ป้องกันค่าว่างและตัวเลขติดลบ
- **Minimal Modern & Responsive Design**: ดีไซน์สะอาดตา ทันสมัย ใช้งานได้ดีทั้งบนมือถือและคอมพิวเตอร์

---

## 🛠️ สถาปัตยกรรม (Tech Stack)

- **Frontend**: React + Vite (Port `5173`)
- **Backend**: Node.js + Express (Port `3001`)
- **API Endpoint**: `POST /api/check-budget`
- **Monorepo**: จัดการด้วย `npm workspaces` และรันพร้อมกันด้วย `concurrently`

```
c:\Finly\
├── package.json              # Root package.json (จัดการ workspaces & scripts)
├── README.md                 # เอกสารแนะนำและคู่มือการรัน
├── SKILL.md                  # กฎการพัฒนาของ AI Agent
├── server/                   # Backend Express (Port 3001)
│   ├── package.json
│   ├── index.js              # Server routes & API
│   └── calculations.js       # ฟังก์ชันการคำนวณและประเมินงบ
└── client/                   # Frontend React + Vite (Port 5173)
    ├── package.json
    ├── vite.config.js        # Port 5173 & Proxy ไปยัง Backend
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── Header.jsx
            ├── BudgetForm.jsx
            ├── ResultCard.jsx
            └── Icons.jsx
```

---

## 🚀 ขั้นตอนการติดตั้งและรันโปรเจกต์

### 1. ติดตั้ง Dependencies
เปิด Terminal ที่ root โฟลเดอร์ (`c:\Finly`) แล้วรัน:
```bash
npm install
```

---

### 2. รันโปรเจกต์ (Development Mode)
รันทั้ง Frontend และ Backend พร้อมกันด้วยคำสั่ง:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

### 3. ทดสอบการ Build (Production Build)
```bash
npm run build
```
*(จะทำการ build ฝั่ง client ด้วย Vite ตรวจสอบความถูกต้องของโค้ดทั้งหมด)*

---

### 4. รันการทดสอบระบบ (End-to-End Integration Tests)
```bash
npm test
```
*(ทดสอบการทำงานของ Frontend, Express API, การคำนวณทั้ง 3 กรณี และระบบ Validation)*

