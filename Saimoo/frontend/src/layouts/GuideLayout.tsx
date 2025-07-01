import { Outlet } from "react-router-dom";
import GuideTopbar from "@/components/topbar/GuideTopbar";
function GuideLayout() {
    return (
        <>
            <GuideTopbar />
            <main className="h-dvh overflow-auto hidescrollbar">
            <Outlet />
            </main>
        </>
    )
}
  export default GuideLayout;
