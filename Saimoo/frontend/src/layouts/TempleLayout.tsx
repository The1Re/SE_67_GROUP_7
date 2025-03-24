import TempleTopbar from "@/components/topbar/TempleTopbar";
import { Outlet } from "react-router-dom";

function TempleLayout() {
    return (
        <>
         <TempleTopbar />
            <main className="h-dvh overflow-auto">
                <Outlet />
            </main>
        </>
    )
}
  export default TempleLayout;
