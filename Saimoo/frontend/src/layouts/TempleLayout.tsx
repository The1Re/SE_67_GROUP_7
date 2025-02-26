import TempleTopbar from "@/components/topbar/TempleTopbar";
import { Outlet } from "react-router-dom";

function TempleLayout() {
    return (
        <>
         <TempleTopbar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </>
    )
}
  export default TempleLayout;
