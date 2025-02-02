import { Outlet } from 'react-router-dom';
import UserTopbar from '../components/topbar/UserTopbar';
import UserSidebar from '../components/sidebar/UserSidebar'; // Ensure the file exists at this path or update the path accordingly

function UserLayout() {
    return (
        <div className="flex">
            <UserTopbar />
            <UserSidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout