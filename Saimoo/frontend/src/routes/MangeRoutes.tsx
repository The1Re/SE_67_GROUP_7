import { useAuth } from "@/context/AuthContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import TempleRoutes from "./TempleRoutes";
import { useEffect } from "react";

function ManageRoutes() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      console.log("fetching user data");
    }
    navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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