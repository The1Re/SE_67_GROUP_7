import GuestLayout from "@/layouts/GuestLayout";
import GuestTrips from "@/pages/guest/GuestTrips";
import React from "react";
import { Route, Routes } from "react-router-dom";

const GuestRoute: React.FC = () => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/guesttrips" element={<GuestTrips />}></Route>
      </Route>
    </Routes>
  );
};

export default GuestRoute;
