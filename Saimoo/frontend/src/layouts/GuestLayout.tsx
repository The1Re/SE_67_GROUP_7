import { GuestTopbar } from "@/components/topbar/GuestTopbar";
import { Outlet } from "react-router-dom";

function GuestLayout() {
    return (
        <>
         <GuestTopbar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </>
    )
}
  export default GuestLayout;
