import { GuestTopbar } from "@/components/topbar/GuestTopbar";
import { Outlet } from "react-router-dom";

function GuestLayout() {
    return (
        <>
         <GuestTopbar />
            <main className="h-dvh pt-[75px] overflow-atuo">
                <Outlet />
            </main>
        </>
    )
}
  export default GuestLayout;
