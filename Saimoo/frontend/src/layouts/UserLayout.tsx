import { Outlet } from 'react-router-dom';
import UserTopbar from '@/components/topbar/UserTopbar';

function UserLayout() {
    return (
        <>
         <UserTopbar />
            <main className="h-dvh overflow-auto hidescrollbar">
                <Outlet />
            </main>
        </>
    )
}

export default UserLayout