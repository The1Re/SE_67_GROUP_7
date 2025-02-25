import UserTopbarGuest from "@/components/topbar/UserTopbarGuest";
import { Outlet } from "react-router-dom";

function GuestLayout() {
    return (
        <>
         <UserTopbarGuest />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </>
    )
}
  export default GuestLayout;
