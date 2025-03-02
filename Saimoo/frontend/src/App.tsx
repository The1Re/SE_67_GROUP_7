import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { getUserRole } from "./utils/auth"
import UserRoutes from "./routes/UserRoutes";
import TempleRoutes from "./routes/TempleRoutes";
import GuestRoutes from "./routes/GuestRoutes";

type Role = "user" | "guest" | "temple"

function App() {
//   const role = getUserRole();
const role : Role = "user" as Role;
  return (
    <>
    <BrowserRouter>
      <Routes>
        {role === "user" && <Route path="/*" element={<UserRoutes />} />}
        {role === "temple" && <Route path="/*" element={<TempleRoutes />} />}
        {role === "guest" && <Route path="/*" element={<GuestRoutes />} />} 
      </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
