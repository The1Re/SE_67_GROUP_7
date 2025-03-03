import { Routes, Route } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import TempleLayout from '@/layouts/TempleLayout';

function UserRoutes() {
  return (
    <Routes>
        <Route element={<TempleLayout />} >
            <Route path='/profile' element={<Profile />}></Route>
        </Route>
    </Routes>
  );
};

export default UserRoutes