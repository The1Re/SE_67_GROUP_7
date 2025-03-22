import { Route, Navigate, Routes } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import GuestLayout from '@/layouts/GuestLayout';
import BrowseTempleWithGuest from '@/pages/temple/BrowseTempleWithGuest';
import SignupTemple from '@/pages/temple/SignupTemple';
import SignupGuide from '@/pages/Guide/SignupGuide';
import ProfileTemple from '@/pages/temple/ProfileTemple';
function GuestRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />} />
          <Route path='/trips' element={<Trips />}></Route>
          <Route path='/temples' element={<BrowseTempleWithGuest />} />
          <Route path='/temples/signup' element={<SignupTemple />} />
          <Route path='/guides/signup' element={<SignupGuide />} />
          <Route path='/temple/profiletemple' element={<ProfileTemple />} />
         
      </Route>
    </Routes>
  );
};

export default GuestRoutes