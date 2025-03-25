import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/user/Trips'
import UserLayout from '@/layouts/UserLayout'
import PlanTrip from '@/pages/user/PlanTrip';
import BrowseTempleWithGuest from '@/pages/temple/BrowseTempleWithGuest';
import SignupTemple from '@/pages/temple/SignupTemple';
import TripDetail from '@/pages/user/TripDetail';
import PurchaserDetails from '@/pages/user/PurchaserDetails';
import PaymentDetails from '@/pages/user/PaymentDetails';
import ConfirmPayment from '@/pages/user/ConfirmPayment';
import SignupGuide from '@/pages/Guide/SignupGuide';
import ProfileTemple from '@/pages/temple/ProfileTemple';
import HistoryTrip from '@/pages/user/HistoryTrip';
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
          <Route path='/plan-trip' element={<PlanTrip />}></Route>
          <Route path='/temples/signup' element={<SignupTemple />} />
          <Route path='/trip-detail' element={<TripDetail />} />
          <Route path='/trips/purchaser' element={<PurchaserDetails />} />
          <Route path='/trips/payment' element={<PaymentDetails/>} />
          <Route path='/trips/confirm' element={<ConfirmPayment/>} /> 
          <Route path='/Guides/signup' element={<SignupGuide />} />
          <Route path='/temples/profiletemple' element={<ProfileTemple />} />
          
          <Route path='/temple/profiletemple' element={<ProfileTemple />} />
          <Route path='history' element={<HistoryTrip/>}></Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
