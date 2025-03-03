import { Routes, Route } from "react-router-dom";
import SignupTemple from "../pages/temple/SignupTemple";
import AddPictureTemple from "../pages/temple/AddPictureTemple";

const TempleRoutes = () => {
  return (
    <Routes>
      <Route path="signup" element={<SignupTemple />} />
      <Route path="AddPicture" element={<AddPictureTemple />} />
    </Routes>
  );
};

export default TempleRoutes;

