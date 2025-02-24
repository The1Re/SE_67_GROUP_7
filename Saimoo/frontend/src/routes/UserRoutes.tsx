import { Routes, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Profile from '../pages/user/Profile'
import { Trips } from '../pages/Trips'

function UserRoutes() {
  return (
    <Routes>
        <Route element={<UserLayout />} >
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/trips' element={<Trips />}></Route>
        </Route>
    </Routes>
  )
}

export default UserRoutes