import { Routes, Route } from "react-router-dom";

import Profile from "../pages/user/Profile";

const UserRoutes = () => {
  return (
    <Routes>
  
      <Route path="/user/profile" element={<Profile />} />
    </Routes>
  );
};

export default UserRoutes;
