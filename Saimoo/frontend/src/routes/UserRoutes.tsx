import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/Trips'
import UserLayout from '@/layouts/UserLayout'
import PlanTrip from '@/pages/PlanTrip';
import BrowseTempleWithGuest from '@/pages/temple/BrowseTempleWithGuest';
import SignupTemple from '@/pages/temple/SignupTemple';
import TripDetail from '@/pages/TripDetail';


const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/trips' element={<Trips />}></Route>
          <Route path='/temples' element={<BrowseTempleWithGuest />} />
          <Route path='/plan-trip' element={<PlanTrip />}></Route>
          <Route path='/temples/signup' element={<SignupTemple />} />
          <Route path='/trip-detail' element={<TripDetail />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
