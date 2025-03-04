import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";

function AdminLayout() {

  return (
    <div className="flex flex-row">
        <AdminSidebar />
        <main className="p-6"> {/* ✅ เลื่อนลงมาไม่ให้โดนทับ */}
          <Outlet />
        </main>
    </div>
  );
}

export default AdminLayout;
