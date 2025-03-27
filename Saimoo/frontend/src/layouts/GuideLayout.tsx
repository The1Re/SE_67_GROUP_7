import { Outlet } from "react-router-dom";
import GuideTopbar from "@/components/topbar/GuideTopbar";
function GuideLayout() {
    return (
        <>
            <GuideTopbar />
            <main className="h-dvh pt-[75px] overflow-auto">
            <Outlet />
            </main>
        </>
    )
}
  export default GuideLayout;
