import { Navigate, Route, Routes } from 'react-router-dom'
import TempleLayout from '@/layouts/TempleLayout';
import TempleDetailPage from '@/pages/temple/TempleDetailPage';

function TempleRoutes() {
  return (
    <Routes>
      <Route element={<TempleLayout />} >
          <Route path='/' element={<Navigate to="/temple" replace />}></Route>
          <Route path='/temple' element={<TempleDetailPage />}></Route>
      </Route>
    </Routes>
  );
};

export default TempleRoutes;
