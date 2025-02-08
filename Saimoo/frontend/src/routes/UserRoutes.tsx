import { Routes, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Profile from '../pages/user/Profile'

function UserRoutes() {
  const x = 1;
  return (
    <Routes>
        <Route element={<UserLayout />} >
            <Route path='/profile' element={<Profile />}></Route>
        </Route>
    </Routes>
  )
}

export default UserRoutes