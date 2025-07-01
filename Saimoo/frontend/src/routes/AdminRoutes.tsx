import { Route, Navigate, Routes } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Profile from "@/pages/user/Profile"; 
import UserTable from "@/components/table/UserTable";
import TempleTable from "@/components/table/templeTable";
import TemplePetitionTable from "@/components/table/templePetition";
import GuidePetitionTable from "@/components/table/guidePetition";
import ClaimTable from "@/components/table/ClaimTable";
import TemplePetitionDetail from "@/components/petitions/temple";
import GuidePetitionDetail from "@/components/petitions/guide";
import ClaimDetail from "@/components/petitions/claim";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/admin/manage-users" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<h1 className="text-2xl font-bold">Admin Dashboard</h1>} />

        <Route path="/admin/manage-users" element={<UserTable />} />
        <Route path="/admin/manage-temples" element={<TempleTable />} />

        <Route path="/admin/registrations/temple" element={<TemplePetitionTable />} />
        <Route path="/admin/registrations/guide" element={<GuidePetitionTable />} />

        <Route path="/admin/transactions" element={<ClaimTable />} />

        <Route path="/admin/petitions/temple/:id" element={<TemplePetitionDetail />} />
        <Route path="/admin/petitions/guide/:id" element={<GuidePetitionDetail />} />
        <Route path="/admin/petitions/claim/:id" element={<ClaimDetail />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
