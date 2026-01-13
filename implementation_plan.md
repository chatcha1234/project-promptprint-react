# Implementation Plan - PromptPrint (Print-on-Demand)

This document outlines the development roadmap for **PromptPrint**, a Print-on-Demand (POD) ecommerce platform. Users can select base products, upload designs (or generate them), and order custom printed items.

## 1. Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, React Router, **Fabric.js / Konva** (for Canvas/Preview)
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Storage**: Cloudinary / Firebase Storage (for User Uploads & Designs)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (Frontend) & Render (Backend)

## 2. Phase 1: Project Initialization & Setup

- [x] **Frontend Setup**

  - Initialize Vite project
  - Install Tailwind CSS & Router
  - _New_: Install `fabric` or `react-konva` for product preview tool

- [ ] **Backend Setup**
  - Initialize Node.js/Express
  - Install `mongoose`, `dotenv`, `cors`, `cloudinary` (SDK)
  - Setup Database Connection (MongoDB)

## 3. Phase 2: Database Design (POD Specific)

- [ ] **User Model**

  - Standard Auth fields (`username`, `email`, `role`, `address`)

- [ ] **BaseProduct Model** (The blank canvas)

  - `name` (e.g., "Classic T-Shirt"), `category`, `basePrice`
  - `variants` (Sizes: S, M, L / Colors: White, Black)
  - `mockupImage` (Transparent PNG for overlaying designs)
  - `printArea` (Coordinates/Dimensions for printable zone)

- [ ] **Design/Asset Model**

  - `user` (Owner)
  - `imageUrl` (Cloudinary URL of the uploaded/generated art)
  - `prompt` (If AI generated - optional)

- [ ] **Order Model**
  - `user`, `totalAmount`, `shippingAddress`, `status` (Pending, Printing, Shipped)
  - `items`: Array of objects:
    - `baseProduct`: Ref
    - `selectedVariant`: { size: "M", color: "Black" }
    - `finalDesignUrl`: URL of the composited image for printing
    - `quantity`, `price`

## 4. Phase 3: Core POD Features (Backend)

- [ ] **Asset Management API**

  - `POST /api/upload`: Handle image uploads to Cloudinary
  - `POST /api/generate`: (Optional) Integration with OpenAI/StableDiffusion for AI designs

- [ ] **Product & Customization API**

  - `GET /api/base-products`: List available blanks
  - `POST /api/orders`: Receive order with robust customization details

- [ ] **Admin Fulfillment API**
  - `GET /api/admin/orders`: List orders needing printing
  - `PATCH /api/admin/orders/:id/status`: Update status (Pending -> Printing -> Shipped)

## 5. Phase 4: Frontend Implementation

- [ ] **Product Customizer (The Core Feature)**

  - Canvas area to overlay uploaded image onto `BaseProduct` mockup
  - Tools: Resize, Rotate, Position Design
  - "Preview" Mode: detailed look at final product

- [ ] **Catalog**

  - Browse Base Products (T-Shirts, Hoodies, Mugs, Posters)

- [ ] **Checkout Logic**
  - Cart stores the _custom configuration_, not just a product ID
  - Validation of print resolution (optional)

## 6. Phase 5: Polish & Deployment

- [ ] **Image Optimization**: Ensure high-res uploads for printing but optimized loading for web
- [ ] **Payment Gateway**: Integration with Stripe (Mock or Live)
- [ ] **Deployment**: Vercel & Render
