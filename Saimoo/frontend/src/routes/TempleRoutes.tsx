import { Routes, Route } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import TempleLayout from '@/layouts/TempleLayout';

function TempleRoutes() {
  return (
    <Routes>
        <Route element={<TempleLayout />} >
            <Route path='/trips' element={<Trips />}></Route>
        </Route>
    </Routes>
  );
};

export default TempleRoutes;