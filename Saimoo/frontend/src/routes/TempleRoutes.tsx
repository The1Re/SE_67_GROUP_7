import { Routes, Route } from "react-router-dom";
import SignupTemple from "../pages/temple/SignupTemple";
import AddPictureTemple from "../pages/temple/TempleDateilPage";
import BrowseTempleWithGuest from "../pages/temple/BrowseTempleWithGuest";
const TempleRoutes = () => {
  return (
    <Routes>
      <Route path="signup" element={<SignupTemple />} />
      <Route path="AddPicture" element={<AddPictureTemple />} />
      <Route path="browse" element={<BrowseTempleWithGuest/>} />
    </Routes>
  );
};

export default TempleRoutes;

