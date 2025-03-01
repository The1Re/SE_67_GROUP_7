import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminTopbar from "../components/topbar/AdminTopbar";
import AdminSidebar from "../components/sidebar/AdminSidebar";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {isSidebarOpen && <AdminSidebar onSelectMenu={() => setIsSidebarOpen(false)} />}
      
      <div className="flex-1">
        <AdminTopbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-6 mt-16"> {/* ✅ เลื่อนลงมาไม่ให้โดนทับ */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
