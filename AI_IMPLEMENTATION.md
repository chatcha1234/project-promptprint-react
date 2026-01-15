# 📘 Detailed AI Implementation Guide (PromptPrint)

เอกสารฉบับนี้อธิบายรายละเอียดเชิงลึก (Technical Deep Dive) ของระบบ AI ในโปรเจกต์ PromptPrint สำหรับนักพัฒนาเพื่อเข้าใจ Flow การทำงาน, API Specification, และ Logic ภายในทั้งหมด

---

## 🏗️ System Architecture (สถาปัตยกรรมระบบ)

```mermaid
graph TD
    User[User / Client] -->|1. Generate Request| Frontend[React Client]
    Frontend -->|2. POST /api/generate-design| Backend[Express Server]
    Backend -->|3. Construct URL| Pollinations[Pollinations.ai API]
    Backend -->|4. Upload URL| Cloudinary[Cloudinary Storage]
    Cloudinary -->|5. Return Secure URL (WebP)| Backend
    Backend -->|6. Save Metadata| MongoDB[(MongoDB)]
    Backend -->|7. Return Image Data| Frontend

    User -->|8. Remove BG Request| Frontend
    Frontend -->|9. POST /api/remove-background| Backend
    Backend -->|10. POST Image URL| RemoveBG[Remove.bg API]
    RemoveBG -->|11. Return Binary Image| Backend
    Backend -->|12. Upload Base64| Cloudinary
    Cloudinary -->|13. Return Secure URL (Transparent)| Backend
    Backend -->|14. Return Transparent URL| Frontend
```

---

## 🔌 API Specifications

### 1. Generate Design (สร้างรูปภาพ)

**Endpoint**: `POST /api/generate-design`
**Description**: สร้างรูปภาพจาก Prompt โดยใช้โมเดล Flux (ผ่าน Pollinations.ai) และบันทึกลง Cloudinary

#### Request Body

```json
{
  "prompt": "A cyberpunk cat wearing sunglasses",
  "style": "Realistic",
  "userId": "65a123..."
}
```

#### Process Logic (Backend)

1.  **Validations**: ตรวจสอบว่าส่ง `prompt` มาหรือไม่
2.  **Prompt Enhancement (Optional)**: (ส่วนนี้ถูกปิดไว้ แต่เตรียมไว้สำหรับ Gemini)
3.  **Pollinations Generation**:
    - สร้าง URL: `https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&model=flux`
4.  **Cloudinary Upload**:
    - ดึงรูปจาก URL ของ Pollinations ไปเก็บที่ Cloudinary ทันที
    - **Optimization**: บังคับ Format เป็น `webp` เพื่อลดขนาดไฟล์
5.  **Database Recording**: บันทึก `Design` Document ใหม่ลง MongoDB โดยระบุ User Owner

#### Response Success (200 OK)

```json
{
  "imageUrl": "https://res.cloudinary.com/.../image/upload/.../promptprint-design.webp",
  "enhancedPrompt": "A cyberpunk cat...",
  "designId": "65b..."
}
```

---

### 2. Remove Background (ลบพื้นหลัง)

**Endpoint**: `POST /api/remove-background`
**Description**: รับ URL ของรูปภาพ ส่งไปลบพื้นหลังที่ Remove.bg และเก็บผลลัพธ์ใหม่ลง Cloudinary

#### Request Body

```json
{
  "imageUrl": "https://res.cloudinary.com/.../image/upload/.../promptprint-design.webp"
}
```

#### Process Logic (Backend)

1.  **Validation**:
    - ตรวจสอบ `imageUrl`
    - ตรวจสอบ `REMOVE_BG_API_KEY` (ใน `.env`) ถ้าไม่มีจะ Return Error 500
2.  **Remove.bg API Call**:
    - ส่ง Request ไปที่ `https://api.remove.bg/v1.0/removebg`
    - Headers: `X-Api-Key: {REMOVE_BG_API_KEY}`
    - Response Type: `arraybuffer` (รับค่ากลับเป็น Binary จำเป็นมาก!)
3.  **Data Conversion**:
    - แปลง Binary Buffer -> Base64 String
    - สร้าง Data URI: `data:image/png;base64,...`
4.  **Cloudinary Upload**:
    - Upload Data URI ขึ้น Cloudinary
    - **Optimization**: บังคับ Format เป็น `webp` (Cloudinary จัดการ Transparency ให้ใน WebP ได้)

#### Response Success (200 OK)

```json
{
  "transparentImageUrl": "https://res.cloudinary.com/.../image/upload/.../promptprint-design-transparent.webp"
}
```

---

## 💻 Frontend Implementation (`AiDesign.jsx`)

### State Management

- `generatedImage` (String): URL ของรูปที่กำลังแสดงผลอยู่ (เปลี่ยนไปมาระหว่าง Original/Transparent)
- `originalImage` (String): เก็บ URL รูปต้นฉบับที่ Gen มาครั้งแรก (ไม่เปลี่ยน)
- `transparentImage` (String): เก็บ URL รูปที่ลบพื้นหลังแล้ว (ค่าเริ่มต้นเป็น null)
- `isGenerating` (Boolean): สถานะโหลดตอน Gen รูป
- `isRemovingBg` (Boolean): สถานะโหลดตอนลบพื้นหลัง

### Key Components Logic

#### 1. Image View (Tabs)

ใช้ Logic ในการเลือกแสดงผล:

- ถ้ามี `generatedImage` จะแสดงรูป
- มี **Tabs Button** ด้านบนรูป:
  - **Original**: กดแล้ว `setGeneratedImage(originalImage)`
  - **Transparent**: (แสดงเฉพาะตอนมี `transparentImage`) กดแล้ว `setGeneratedImage(transparentImage)`

#### 2. Generator Logic (`handleGenerate`)

- ส่ง Prompt ไป Backend
- เมื่อได้รูปกลับมา:
  - `setGeneratedImage(data.imageUrl)`
  - `setOriginalImage(data.imageUrl)`
  - `setTransparentImage(null)` (รีเซ็ตค่าเก่า)

#### 3. Background Removal Logic (`handleRemoveBackground`)

- เรียกตอน user กดปุ่ม "Remove Background"
- ส่ง `generatedImage` ปัจจุบันไป Backend
- เมื่อได้รูปใสกลับมา:
  - `setTransparentImage(data.transparentImageUrl)`
  - `setGeneratedImage(data.transparentImageUrl)` (Auto switch ให้ user เห็นทันที)

#### 4. Action Buttons

- **Remove Background**: ปุ่มนี้จะซ่อนตัวเอง (`!transparentImage`) เมือลบพื้นหลังเสร็จแล้ว
- **Use This Design**: ปุ่มยืนยันการใช้รูป สำหรับ Flow ถัดไป (เช่น Add to Cart)

---

## ⚠️ Limitations & Considerations

1.  **Remove.bg Credits**:
    - API Key ฟรีมีจำกัด (50 previews/เดือน หรือ Credits น้อย)
    - ถ้า Key หมด Backend จะ throw error 500 -> Frontend จะ Alert แจ้งเตือน
2.  **Image Quality**:
    - Pollinations ให้รูปสวยแต่ความละเอียดอาจไม่สูงมาก (1024x1024)
    - การแปลงเป็น WebP ช่วยเรื่องเว็บโหลดเร็ว แต่อาจมีผลเล็กน้อยต่อคุณภาพงานพิมพ์จริง (แต่ WebP สมัยใหม่คุณภาพสูงมาก)
3.  **Data Persistence**:
    - Flow ปัจจุบันบันทึกเฉพาะการ Gen ครั้งแรก (`Design` schema)
    - ถ้า User ลบพื้นหลัง รูปใสจะอยู่แค่ใน Cloudinary แต่ยังไม่ได้ Update กลับไปที่ MongoDB document ของ Design นั้นๆ (ต้องเพิ่ม Logic `Design.findByIdAndUpdate` ถ้าต้องการเก็บ URL รูปใสถาวร)

---

## 🛠️ Configuration Checklist

ไฟล์ `.env` ที่ Server ต้องมีให้ครบ:

```env
PORT=5000
MONGODB_URI=...
JWT_SECRET=...

# Cloudinary (ฝากรูป)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# AI Services
REMOVE_BG_API_KEY=... (รับจาก remove.bg)
GEMINI_API_KEY=... (ถ้าจะเปิดใช้ Prompt Enhance)
```
