import { useState } from "react";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import UserTable from "../../components/table/UserTable"; // ตารางข้อมูลผู้ใช้
import TempleTable from "../../components/table/templeTable"; // แก้ชื่อให้เป็น TempleTable

const AdminMain = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar onSelectMenu={setSelectedMenu} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {selectedMenu === "ผู้ใช้" ? (
          <UserTable />
        ) : selectedMenu === "วัด" ? (
          <TempleTable />
        ) : (
          <>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome to the admin panel!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminMain;
