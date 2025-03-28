import { Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

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
import PurchaseDetails from "@/pages/user/PurchaseDetails";
import PaymentDetails from "@/pages/user/PaymentDetails";
import ConfirmPayment from "@/pages/user/ConfirmPayment";
import TempleDetail from "@/components/ฺbrowsetemple/TempleDetail";
const GuideRoutes = () => {
  return (
    <Routes>
      <Route element={<GuideLayout />} >
      <Route path='/' element={<Navigate to="/trips" replace />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/wallet' element={<Wallet />} />

      <Route path='/trips' element={<Trips />}></Route>
      <Route path='/trips/:tripId' element={<TripDetail />} />
      <Route path='/trips/:tripId/purchase' element={<PurchaseDetails />} />
      <Route path='/trips/:tripId/:orderId/payment' element={<PaymentDetails/>} />
      <Route path='/trips/:tripId/:orderId/confirm' element={<ConfirmPayment/>} /> 
      <Route path='/create-trip' element={<CreateTrip />} />

      <Route path='/temples' element={<BrowseTempleWithGuest />} />
      <Route path='/temple/profiletemple' element={<ProfileTemple />} />
      <Route path='/temples/:id' element={<TempleDetail />} /> {/* ✅ เพิ่มตรงนี้ */}
      <Route path='/browse-temple' element={<BrowseTempleWithGuest />} />
      
      {/* extend route for guide */}
      <Route path='/history' element={<History />}/>
      <Route path="/document/:tripId" element={<Document />} />
      <Route path='/trip-detail' element={<TripDetail />} />
      <Route path='/TripCancel' element={<TripCancel/>} />
      </Route>
    </Routes>
  );
};

export default GuideRoutes;
