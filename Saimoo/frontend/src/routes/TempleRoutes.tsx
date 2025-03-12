import { Routes, Route } from "react-router-dom";

import AddPictureTemple from "../pages/temple/TempleDateilPage";

const TempleRoutes = () => {
  return (
    <Routes>
      
      <Route path="AddPicture" element={<AddPictureTemple />} />
      
    </Routes>
  );
};

export default TempleRoutes;

