import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/Trips'
import UserLayout from '@/layouts/UserLayout'
import PlanTrip from '@/pages/PlanTrip';
import BrowseTempleWithGuest from '@/pages/Temple';
import SignupTemple from '@/pages/temple/SignupTemple';
import TempleDetailForTrip from '@/components/ฺbrowsetemple/TempleDetailForTrip';


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
          <Route path='/temples/:id' element={<TempleDetailForTrip />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
