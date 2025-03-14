import { Route, Navigate, Routes } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import GuestLayout from '@/layouts/GuestLayout';
import BrowseTempleWithGuest from '@/pages/Temple';
import SignupTemple from '@/pages/temple/SignupTemple';
import TempleDetail from '@/components/ฺbrowsetemple/TempleDetail';

function GuestRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />} />
          <Route path='/trips' element={<Trips />}></Route>
          <Route path='/temples' element={<BrowseTempleWithGuest />} />
          <Route path='/temples/signup' element={<SignupTemple />} />
          <Route path='/temples/:id' element={<TempleDetail />} /> 
      </Route>
    </Routes>
  );
};

export default GuestRoutes