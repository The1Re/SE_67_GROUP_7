import { Routes, Route } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/Trips'
import UserLayout from '@/layouts/UserLayout'

function UserRoutes() {
  return (
    <Routes>
        <Route element={<UserLayout />} >
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/trips' element={<Trips />}></Route>
        </Route>
    </Routes>
  );
};

export default UserRoutes