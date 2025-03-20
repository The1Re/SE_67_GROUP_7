import { Navigate, Route, Routes } from 'react-router-dom'
import TempleLayout from '@/layouts/TempleLayout';
import TempleDetailPage from '@/pages/temple/TempleDetailPage';
import ProfileTemple from '@/pages/temple/ProfileTemple';
function TempleRoutes() {
  return (
    <Routes>
      <Route element={<TempleLayout />} >
          <Route path='/' element={<Navigate to="/temple" replace />}></Route>
          <Route path='/temple/detail' element={<TempleDetailPage />}></Route>
          <Route path='/temple/profile' element={<ProfileTemple />}></Route>
      </Route>
    </Routes>
  );
};

export default TempleRoutes;
