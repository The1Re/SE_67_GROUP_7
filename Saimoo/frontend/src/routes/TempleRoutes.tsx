import { Navigate, Route, RouteProps, Routes } from 'react-router-dom'
import { Trips } from '@/pages/Trips'
import TempleLayout from '@/layouts/TempleLayout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TempleRoutes(_: RouteProps): React.ReactElement | null {
  return (
    <Routes>
      <Route element={<TempleLayout />} >
          <Route path='/' element={<Navigate to="/trips" replace />}></Route>
          <Route path='/trips' element={<Trips />}></Route>
      </Route>
    </Routes>
  );
};

export default TempleRoutes;