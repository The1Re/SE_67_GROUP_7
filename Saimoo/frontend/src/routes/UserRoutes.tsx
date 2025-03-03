import { Routes, Route } from "react-router-dom";
import BrowseTempleWithGuest from "../pages/user/BrowseTempleWithGuest";
import Profile from "../pages/user/Profile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user/browse" element={<BrowseTempleWithGuest/>} />
      <Route path="/user/profile" element={<Profile />} />
    </Routes>
  );
};

export default UserRoutes;
