import { Route, Navigate, Routes } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import GuestLayout from '@/layouts/GuestLayout';

function GuestRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />} />
          <Route path='/trips' element={<Trips />}></Route>
      </Route>
    </Routes>
  );
};

export default GuestRoutes