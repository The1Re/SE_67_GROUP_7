import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TempleRoutes from "./routes/TempleRoutes";
import UserRoutes from "./routes/UserRoutes";
import GuideRoutes from "./routes/GuideRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/guide/*" element={<GuideRoutes />} />
        <Route path="/temple/*" element={<TempleRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
