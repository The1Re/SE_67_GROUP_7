import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { getUserRole } from "./utils/auth"
import UserRoutes from "./routes/UserRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import TempleRoutes from "./routes/TempleRoutes"; 

function App() {
//   const role = getUserRole();
const role = "user"
  return (
    <>
    <BrowserRouter>
      <Routes>
        {role === "user" && <Route path="/*" element={<UserRoutes />} />}
        {/* {role === "guest" && <Route path="/*" element={<GuestRoutes />} />}
        {role === "temple" && <Route path="/*" element={<TempleRoutes />} />} */}
      </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
