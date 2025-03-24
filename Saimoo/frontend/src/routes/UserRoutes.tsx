import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/Trips'
import UserLayout from '@/layouts/UserLayout'
import PlanTrip from '@/pages/PlanTrip';
import BrowseTempleWithGuest from '@/pages/temple/BrowseTempleWithGuest';
import TempleDetail from "@/components/ฺbrowsetemple/TempleDetail";
import SignupTemple from '@/pages/temple/SignupTemple';
import TripDetail from '@/pages/TripDetail';
import PurchaseDetails from '@/pages/user/PurchaseDetails';
import PaymentDetails from '@/pages/user/PaymentDetails';
import ConfirmPayment from '@/pages/user/ConfirmPayment';
import SignupGuide from '@/pages/Guide/SignupGuide';
import ProfileTemple from '@/pages/temple/ProfileTemple';
import Wallet from '@/pages/user/Wallet';


const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/trips' element={<Trips />}></Route>
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/temples' element={<BrowseTempleWithGuest />} />
          <Route path='/temples/:id' element={<TempleDetail />} /> {/* ✅ เพิ่มตรงนี้ */}
          <Route path='/browse-temple' element={<BrowseTempleWithGuest />} /> 
          <Route path='/plan-trip' element={<PlanTrip />}></Route>
          <Route path='/temples/signup' element={<SignupTemple />} />
          <Route path='/trip-detail' element={<TripDetail />} />
          <Route path='/trips/purchase' element={<PurchaseDetails />} />
          <Route path='/trips/payment' element={<PaymentDetails/>} />
          <Route path='/trips/confirm' element={<ConfirmPayment/>} /> 
          <Route path='/Guides/signup' element={<SignupGuide />} />
          <Route path='/temple/profiletemple' element={<ProfileTemple />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
