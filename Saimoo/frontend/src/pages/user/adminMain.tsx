import { useState } from "react";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import UserTable from "../../components/table/UserTable";
import TempleTable from "../../components/table/templeTable";
import TemplePetitionTable from "../../components/table/templePetition";
import GuidePetitionTable from "../../components/table/guidePetition";
import ClaimTable from "../../components/table/ClaimTable";
import TemplePetitionDetail from "../../components/petitions/temple";
import GuidePetitionDetail from "../../components/petitions/guide";
import ClaimDetail from "../../components/petitions/claim"; // เปลี่ยนจาก "claim" เป็น "ClaimDetail"

const AdminMain = () => {
  const [selectedMenu, setSelectedMenu] = useState(""); 
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleApprove = (id) => {
    setSelectedRepresentative(null);
    setSelectedGuide(null);
    setSelectedClaim(null);
  };

  const handleReject = () => {
    setSelectedRepresentative(null);
    setSelectedGuide(null);
    setSelectedClaim(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar onSelectMenu={setSelectedMenu} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {selectedRepresentative ? (
          <TemplePetitionDetail
            representative={selectedRepresentative}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ) : selectedGuide ? (
          <GuidePetitionDetail
            guide={selectedGuide}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ) : selectedClaim ? (
          <ClaimDetail
            claim={selectedClaim}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ) : selectedMenu === "ผู้ใช้" ? (
          <UserTable />
        ) : selectedMenu === "วัด" ? (
          <TempleTable />
        ) : selectedMenu === "ตัวแทนวัด" ? (
          <TemplePetitionTable onSelectRepresentative={setSelectedRepresentative} />
        ) : selectedMenu === "ไกด์" ? (
          <GuidePetitionTable onSelectGuide={setSelectedGuide} />
        ) : selectedMenu === "การขอเคลม" ? (
          <ClaimTable onSelectClaim={setSelectedClaim} />
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
