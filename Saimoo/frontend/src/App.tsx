import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { getUserRole } from "./utils/auth"
import UserRoutes from "./routes/UserRoutes";
import UserTopbar from "./components/topbar/UserTopbar";
function App() {
  // const role = getUserRole();
  const role = "user";

  return (
    <>
    <BrowserRouter>
      <Routes>
        {role === "user" && <Route path="/*" element={<UserRoutes />} />}
      </Routes>
    </BrowserRouter>
      <UserTopbar/>
      </>
  )
}

export default App
