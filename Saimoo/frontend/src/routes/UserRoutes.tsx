import { Navigate, Route, RouteProps, Routes } from 'react-router-dom'
import Profile from '../pages/user/Profile'
import { Trips } from '@/pages/Trips'
import UserLayout from '@/layouts/UserLayout'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function UserRoutes(_: RouteProps): React.ReactElement | null {
  return (
    <Routes>
      <Route element={<UserLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/trips' element={<Trips />}></Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes