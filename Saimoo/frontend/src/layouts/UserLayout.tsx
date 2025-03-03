import { Outlet } from 'react-router-dom';
import UserTopbar from '@/components/topbar/UserTopbar';

function UserLayout() {
    return (
        <>
         <UserTopbar />
            <main className="h-dvh pt-[75px] overflow-hidden">
                <Outlet />
            </main>
        </>
    )
}

export default UserLayout