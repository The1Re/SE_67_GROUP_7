import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/user/Trips'
import UserLayout from '@/layouts/UserLayout'
import BrowseTempleWithGuest from '@/pages/temple/BrowseTempleWithGuest';
import TempleDetail from "@/components/ฺbrowsetemple/TempleDetail";
import SignupTemple from '@/pages/temple/SignupTemple';
import PurchaseDetails from '@/pages/user/PurchaseDetails';
import TripDetail from '@/pages/user/TripDetail';
import PaymentDetails from '@/pages/user/PaymentDetails';
import ConfirmPayment from '@/pages/user/ConfirmPayment';
import SignupGuide from '@/pages/Guide/SignupGuide';
import ProfileTemple from '@/pages/temple/ProfileTemple';
import HistoryTrip from '@/pages/user/HistoryTrip';
import Wallet from '@/pages/user/Wallet';
import CreateTrip from '@/pages/CreateTrip';


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
        <Route path='/temples/signup' element={<SignupTemple />} />
        <Route path='/trip-detail/:id' element={<TripDetail />} />
        <Route path='/trips/purchase' element={<PurchaseDetails />} />
        <Route path='/trip-detail' element={<TripDetail />} />
        <Route path='/trips/purchase' element={<PurchaseDetails />} />
        <Route path='/trips/payment' element={<PaymentDetails />} />
        <Route path='/trips/confirm' element={<ConfirmPayment />} />
        <Route path='/Guides/signup' element={<SignupGuide />} />
        <Route path='/temple/profiletemple' element={<ProfileTemple />} />
        <Route path='/create-trip' element={<CreateTrip />} />
        <Route path='/history' element={<HistoryTrip />}></Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;