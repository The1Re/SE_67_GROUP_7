import { Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

import SignupGuide from "@/pages/Guide/SignupGuide";
import { Trips } from '@/pages/Trips'
import GuideLayout from "@/layouts/GuideLayout";
import BrowseTempleWithGuest from "@/pages/temple/BrowseTempleWithGuest";
import PlanTrip from "@/pages/PlanTrip";
import TripScreeningForm from "@/pages/Guide/TripScreeningFrom";
import Dashboard from "@/pages/Guide/Dashboard";
import HistoryTrip from "@/pages/Guide/HistoryTrip";
import ProfileTemple from "@/pages/temple/ProfileTemple";
import Document from "@/pages/Guide/Document";
import TripDetail from "@/pages/TripDetail";
import TripCancellationPage from "@/pages/Guide/TripCancellationPage";
const GuideRoutes = () => {
  return (
    <Routes>
      <Route element={<GuideLayout />} >
      <Route path='/' element={<Navigate to="/trips" replace />}></Route>
      <Route path="/Guides/signup" element={<SignupGuide/>} />
      <Route path="/trips" element={<Trips/>} />
      <Route path='/temples' element={<BrowseTempleWithGuest />} />
      <Route path='/plan-trip' element={<PlanTrip />}></Route>
      <Route path='/Guides/check' element={<TripScreeningForm />} />
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/historytrip' element={<HistoryTrip />}/>
      <Route path='/temples/profiletemple' element={<ProfileTemple />}></Route>
      <Route path='/Document' element={<Document/>}></Route>
      <Route path='/trip-detail' element={<TripDetail />} />
      <Route path='/TripCancellationPage' element={<TripCancellationPage />} />
      </Route>
    </Routes>
  );
};

export default GuideRoutes;

