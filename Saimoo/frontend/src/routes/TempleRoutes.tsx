import TempleLayout from "@/layouts/TempleLayout";
import TempleProfile from "@/pages/temple/TempleProfile";
import React from "react";
import { Route, Routes } from "react-router-dom";

const TempleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<TempleLayout />}>
        <Route path="/templeprofile" element={<TempleProfile />}></Route>
      </Route>
    </Routes>
  );
};

export default TempleRoutes;
