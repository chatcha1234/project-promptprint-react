import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
