import { Outlet } from 'react-router-dom';
import UserTopbar from '@/components/topbar/UserTopbar';

function UserLayout() {
    return (
        <>
         <UserTopbar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </>
    )
}

export default UserLayout