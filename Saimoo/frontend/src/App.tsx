import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getUserRole, UserRole } from "./utils/auth"
import UserRoutes from "./routes/UserRoutes";
import TempleRoutes from "./routes/TempleRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import AdminRoutes from "./routes/AdminRoutes"

function App() {
  const [role, setRole] = useState<UserRole>("guest");

  useEffect(() => {
    setRole(getUserRole())
  }, [])

  console.log(role);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {role === "user" && <Route path="/*" element={<UserRoutes />} />}
          {role === "temple" && <Route path="/*" element={<TempleRoutes />} />}
          {role === "guest" && <Route path="/*" element={<GuestRoutes />} />}
          {role === "admin" && <Route path="/*" element={<AdminRoutes />} />}
          {role === "guide" && <Route path="/*" element={<div>not implement</div>} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
