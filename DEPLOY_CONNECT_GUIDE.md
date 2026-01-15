# วิธีเชื่อมต่อ Vercel (Frontend) กับ Render (Backend)

โค้ดของคุณพร้อมแล้ว แต่ต้องไปตั้งค่า "ตัวแปร" ในเว็บไซต์ของ Vercel และ Render เพื่อให้มันรู้จักกันครับ

## 1. ฝั่ง Backend (Render)

1.  เข้าไปที่ Dashboard ของโปรเจกต์คุณใน [Render.com](https://render.com)
2.  ไปที่เมนู **Environment**
3.  กด **Add Environment Variable** และเพิ่ม 2 ค่านี้:
    - `MONGODB_URI`: (ก๊อปปี้จากไฟล์ `server/.env` ของคุณไปใส่)
    - `JWT_SECRET`: (ก๊อปปี้จากไฟล์ `server/.env` ไปใส่ หรือตั้งใหม่ก็ได้)
4.  รอให้ Render Deploy เสร็จ (จนขึ้นสีเขียวว่า **Live**)
5.  **สำคัญ!**: ก๊อปปี้ **URL** ของเว็บ Backend มา (ที่อยู่มุมบนซ้าย เช่น `https://project-promptprint-express.onrender.com`)

## 2. ฝั่ง Frontend (Vercel)

1.  เข้าไปที่ Dashboard ของโปรเจกต์คุณใน [Vercel.com](https://vercel.com)
2.  ไปที่แท็บ **Settings** -> **Environment Variables**
3.  เพิ่มตัวแปร (Variable) ดังนี้:
    - **Key**: `VITE_API_URL`
    - **Value**: (วาง URL ที่ก๊อปปี้มาจาก Render เมื่อกี้ **ห้ามมี / ต่อท้าย**)
      - ✅ `https://project-promptprint-express.onrender.com`
      - ❌ `https://project-promptprint-express.onrender.com/`
4.  กด **Save**
5.  ไปที่แท็บ **Deployments** แล้วกด **Redeploy** (เพื่อให้มันดึงค่าใหม่ไปใช้)

## สรุป

- **Render**: ต้องรู้รหัส DB (`MONGODB_URI`)
- **Vercel**: ต้องรู้ที่อยู่ Render (`VITE_API_URL`)

เมื่อตั้งค่าครบทั้ง 2 ฝั่งแล้ว เว็บของคุณก็จะทำงานเชื่อมต่อกันได้สมบูรณ์ครับ!
