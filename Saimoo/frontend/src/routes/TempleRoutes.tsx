import { Navigate, Route, Routes } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import TempleLayout from '@/layouts/TempleLayout';
import TempleDetailPage from '@/pages/temple/TempleDetailPage';
import BrowseTempleWithGuest from '@/pages/Temple';

function TempleRoutes() {
  return (
    <Routes>
      <Route element={<TempleLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />}></Route>
          <Route path='/trips' element={<Trips />}></Route>
          <Route path='/temples' element={<BrowseTempleWithGuest />} />
          <Route path='/temple/:id' element={<TempleDetailPage />}></Route>
      </Route>
    </Routes>
  );
};

export default TempleRoutes;
