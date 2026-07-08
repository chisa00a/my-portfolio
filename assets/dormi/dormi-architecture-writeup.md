# Dormi Apartment Management — System Architecture & Data Flow

## ภาพรวมระบบ

Dormi เป็นระบบจัดการหอพัก/อพาร์ตเมนต์แบบ Full Stack ที่ให้เจ้าของหอบริหารห้องพัก ผู้เช่า
และตั๋วแจ้งซ่อม (ticket) ได้ในที่เดียว โครงสร้างฝั่ง backend เป็น **modular monolith** บน
NestJS แบ่งเป็น 5 โมดูลตามขอบเขตธุรกิจ (auth, user, apartment, ticket, payment) ที่แชร์
ฐานข้อมูล PostgreSQL เดียวกันผ่าน TypeORM ส่วน frontend เป็น Next.js (App Router) ที่คุยกับ
backend ผ่าน REST API และยืนยันตัวตนด้วย session cookie

## System Architecture

```
Next.js Frontend (Owner / Tenant UI)
        │  REST + session cookie
        ▼
┌─────────────────────────────────────────────┐
│  NestJS Backend — Modular Monolith           │
│  SessionAuthGuard คุมสิทธิ์ทุก endpoint       │
│                                               │
│  [Auth]  [User]  [Apartment]  [Ticket]  [Payment]
│                                               │
│  DTO validation (class-validator)            │
│  TypeORM repositories · Swagger docs         │
└─────────────────────────────────────────────┘
        │  TypeORM
        ▼
   PostgreSQL (tickets, apartments, users, payments)
```

**จุดออกแบบสำคัญ**
- **Modular monolith ไม่ใช่ microservices จริง** — แยกโค้ดเป็นโมดูลตามโดเมนเพื่อความชัดเจนและ
  ทดสอบแยกส่วนได้ แต่ยังรันเป็น process เดียว ฐานข้อมูลเดียว เหมาะกับสเกลของโปรเจกต์นี้
  โดยไม่ต้องแบกความซับซ้อนของ distributed system
- **Ownership-based authorization** — ทุก endpoint ตรวจสอบว่า apartment ที่ถูกเรียกใช้เป็นของ
  ผู้ใช้ที่ล็อกอินอยู่จริง (`ensureApartmentOwnership`) ก่อนจะให้เข้าถึงข้อมูลใดๆ
- **Transaction สำหรับ multi-table write** — เช่นตอนสร้างตั๋ว ต้องเขียนทั้งตาราง `tickets`
  และ `ticketStatusHistories` (แถวแรก) พร้อมกัน ใช้ `dataSource.transaction()` ป้องกันข้อมูล
  ไม่ครบถ้วนหากขั้นใดขั้นหนึ่งล้มเหลว
- **State machine สำหรับสถานะตั๋ว** — ตั๋วเปลี่ยนสถานะได้เฉพาะ transition ที่กำหนดไว้ล่วงหน้า
  (เช่น OPEN → ACKNOWLEDGED → IN_PROGRESS → RESOLVED → CLOSED) กันไม่ให้ข้อมูลสถานะขัดแย้งกันเอง
  และบันทึกทุกการเปลี่ยนแปลงลง audit log (`TicketStatusHistory`)

## Data Flow: วงจรชีวิตของตั๋วแจ้งซ่อม (ตัวอย่างที่เป็นแกนหลักของระบบ)

```
ผู้เช่า/เจ้าของหอ กรอกฟอร์มแจ้งซ่อม
        │
        ▼
Next.js Frontend — POST /tickets (fetch + session cookie)
        │
        ▼
TicketController → TicketService
  - SessionAuthGuard ตรวจการล็อกอิน
  - Validate body ด้วย CreateTicketDto (class-validator)
  - ตรวจว่า apartment/category/room มีอยู่จริงและเป็นของผู้เรียก
  - Generate เลขที่ตั๋ว (TCK-{ปี}-{ลำดับ})
        │
        ▼
PostgreSQL — Transaction เดียว
  - INSERT ตาราง tickets (status = OPEN)
  - INSERT ตาราง ticketStatusHistories (แถวแรก)
        │
        ▼
Frontend แสดงตั๋วใหม่ + badge สถานะ
        │
        ▼
สตาฟกดเปลี่ยนสถานะภายหลัง (Acknowledged → In Progress → Resolved → Closed)
  - ทุกครั้งวนกลับไปที่ TicketStatusService ตรวจ state machine ก่อนเปลี่ยน
  - อัปเดต timestamp ที่เกี่ยวข้อง (acknowledgedAt/startedAt/resolvedAt/closedAt)
  - คำนวณ slaBreached อัตโนมัติเทียบกับ dueDate
  - บันทึกลง TicketStatusHistory ทุกครั้ง
```

หลังตั๋วถูก RESOLVED/CLOSED ผู้เช่าให้คะแนนความพึงพอใจ 1-5 ดาวได้ (`TicketFeedback`) — ปิด
ลูปข้อมูลตั้งแต่แจ้งปัญหาจนถึงวัดผลการแก้ไข

## Tech Stack

| ชั้น | เทคโนโลยี |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Node.js, NestJS, TypeORM |
| Database | PostgreSQL |
| Auth | Session-based (cookie) + Guard-level authorization |
| API Testing | Bruno |
| Project Management | GitHub, ClickUp |

## รูปประกอบ

แนบไฟล์ `dormi-system-architecture.svg` และ `dormi-ticket-data-flow.svg` มาด้วย — เป็น SVG
พื้นหลังขาว ใช้แปะในเว็บ portfolio ได้ตรง หรือแปลงเป็น PNG ก่อนถ้าเว็บต้องการไฟล์ภาพแบบ raster
