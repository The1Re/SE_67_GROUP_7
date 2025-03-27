import { Route, Navigate, Routes } from 'react-router-dom'
import { Trips } from '@/pages/user/Trips'
import GuestLayout from '@/layouts/GuestLayout';
import BrowseTempleWithGuest from '@/pages/Temple';
import SignupTemple from '@/pages/temple/SignupTemple';
import TempleDetail from '@/components/ฺbrowsetemple/TempleDetail';

import SignupGuide from '@/pages/Guide/SignupGuide';
import ProfileTemple from '@/pages/temple/ProfileTemple';
import TripDetail from '@/pages/user/TripDetail';
function GuestRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />} />
          <Route path='/trips' element={<Trips />}></Route>
          <Route path='/trips/:tripId' element={<TripDetail />} />
          <Route path='/temples' element={<BrowseTempleWithGuest />} />
          <Route path='/temples/signup' element={<SignupTemple />} />
          <Route path='/temples/:id' element={<TempleDetail />} /> 
          <Route path='/guides/signup' element={<SignupGuide />} />
          <Route path='/temple/profiletemple' element={<ProfileTemple />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes