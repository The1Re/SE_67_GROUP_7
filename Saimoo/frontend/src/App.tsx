import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { getUserRole } from "./utils/auth"
import UserRoutes from "./routes/UserRoutes";

function App() {
  // const role = getUserRole();
  const role = "user";
  const x = 1;

  return (
    <BrowserRouter>
      <Routes>
        {role === "user" && <Route path="/*" element={<UserRoutes />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App
