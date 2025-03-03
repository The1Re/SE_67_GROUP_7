import { Routes, Route } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import GuestLayout from '@/layouts/GuestLayout';

function UserRoutes() {
  return (
    <Routes>
        <Route element={<GuestLayout />} >
            <Route path='/trips' element={<Trips />}></Route>
        </Route>
    </Routes>
  );
};

export default UserRoutes