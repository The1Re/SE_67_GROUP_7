import { Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

import SignupGuide from "@/pages/Guide/SignupGuide";
import { Trips } from '@/pages/user/Trips'
import GuideLayout from "@/layouts/GuideLayout";
import BrowseTempleWithGuest from "@/pages/temple/BrowseTempleWithGuest";

import Profile from "@/pages/user/Profile";
import CreateTrip from "@/pages/CreateTrip";
import History from "@/pages/Guide/History";
import ProfileTemple from "@/pages/temple/ProfileTemple";
import Document from "@/pages/Guide/Document";
import TripDetail from "@/pages/user/TripDetail";
import TripCancel from "@/pages/Guide/TripCancel";
import Wallet from "@/pages/user/Wallet";
import PurchaserDetails from "@/pages/user/PurchaseDetails";
const GuideRoutes = () => {
  return (
    <Routes>
      <Route element={<GuideLayout />} >
      <Route path='/' element={<Navigate to="/trips" replace />}></Route>
      <Route path="/Guides/signup" element={<SignupGuide/>} />
      <Route path="/trips" element={<Trips/>} />
      <Route path='/temples' element={<BrowseTempleWithGuest />} />
      <Route path='/create-trip' element={<CreateTrip />} />
      <Route path='/purchaser-details' element={<PurchaserDetails />}></Route>
    
      <Route path='/history' element={<History />}/>
      <Route path='/temples/profiletemple' element={<ProfileTemple />}></Route>
      <Route path='/Document' element={<Document/>}></Route>
      <Route path='/trip-detail' element={<TripDetail />} />
      <Route path='/TripCancel' element={<TripCancel/>} />
      <Route path='/wallet' element={<Wallet />} />
      <Route path='/profile' element={<Profile />}></Route>
      </Route>
    </Routes>
  );
};

export default GuideRoutes;