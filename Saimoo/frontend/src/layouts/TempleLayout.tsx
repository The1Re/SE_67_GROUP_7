import TempleTopbar from "@/components/topbar/TempleTopbar";
import { Outlet } from "react-router-dom";

function TempleLayout() {
    return (
        <>
         <TempleTopbar />
            <main className="h-dvh pt-[75px] overflow-hidden">
                <Outlet />
            </main>
        </>
    )
}
  export default TempleLayout;
