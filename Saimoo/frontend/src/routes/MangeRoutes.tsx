import { useAuth } from "@/context/AuthContext";
import { Route, Routes } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import TempleRoutes from "./TempleRoutes";

function ManageRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      { !user?.role && <Route path="/*" element={<GuestRoutes />} /> }
      { user?.role === "admin" && <Route path="/*" element={<AdminRoutes />} /> }
      { user?.role === "user" && <Route path="/*" element={<UserRoutes />} /> }
      { user?.role === "temple" && <Route path="/*" element={<TempleRoutes />} /> }
      { user?.role === "guide" && <Route path="/*" element={<h1>not implement</h1>} /> }

      {/* 404 Page */}
      <Route path="*" element={<h1>Not Found</h1>} />
      
    </Routes>
  )
}

export default ManageRoutes