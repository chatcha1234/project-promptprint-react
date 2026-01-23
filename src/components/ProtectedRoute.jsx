// ===== นำเข้า dependencies =====
import { Navigate, useLocation } from "react-router-dom";

// ===== Component: ProtectedRoute =====
// ใช้ป้องกันเส้นทางที่ต้องการ authentication หรือ authorization
// Props:
//   - children: Component ที่ต้องการป้องกัน
//   - requireAdmin: ถ้า true = ต้องเป็น Admin เท่านั้น
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const location = useLocation();

  // ดึงข้อมูลจาก localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ===== เช็ค 1: ยังไม่ได้ Login =====
  if (!token) {
    // Redirect ไปหน้า login พร้อมเก็บ URL ที่พยายามเข้า
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ===== เช็ค 2: ต้องเป็น Admin แต่ไม่ใช่ =====
  if (requireAdmin && role !== "admin") {
    // Redirect ไปหน้าแรก (ไม่มีสิทธิ์)
    return <Navigate to="/" replace />;
  }

  // ===== ผ่านการตรวจสอบ → แสดง Component =====
  return children;
};

export default ProtectedRoute;
