import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { MdOutlineTempleBuddhist } from "react-icons/md";
import AuthModal from "@/components/auth/AuthModal";
import type { AuthType } from "@/components/auth/AuthModal";
import { useNavigate } from "react-router-dom";

export const GuestTopbar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"SaiTrip" | "SaiWat">(
    "SaiTrip"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState<AuthType | null>(null);

  const handleLoginClick = () => {
    setIsModalOpen("login");
  };

  return (
    <>
      <div className="sticky top-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200">
        {/* Sidebar Toggle Button */}
        <button className="cursor-pointer text-2xl" onClick={() => setIsSidebarOpen(true)}>
          <IoIosMenu />
        </button>

        {/* Logo */}
        <h2 className="text-sm md:text-lg font-semibold text-black ml-3">
          SAIM<span className="text-red-500">O</span>
          <span className="text-blue-500">O</span>
        </h2>

        {/* Tabs */}
        <div className="flex items-center space-x-8 mx-auto">
          <MenuItem
            title="SaiTrip"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onClick={() => navigate("/trips")}
          />
          <MenuItem
            title="SaiWat"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onClick={() => navigate("/temples")}
          />
        </div>

        <div className="border-l border-gray-300 h-8 mx-2"></div>

        {/* Login Button */}
        <button
          className="px-4 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all cursor-pointer"
          onClick={handleLoginClick}
        >
          เข้าสู่ระบบ
        </button>
      </div>

      {/* Sidebar (ใช้ Framer Motion + AnimatePresence) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="cursor-pointer text-2xl"
                >
                  <IoMdClose />
                </button>
                <h2 className="text-sm md:text-lg font-semibold text-black mr-20">
                  SAIM<span className="text-red-500">O</span>
                  <span className="text-blue-500">O</span>
                </h2>
              </div>
              <SidebarItem
                title="ลงทะเบียนเป็นตัวแทนวัด"
                icon={<MdOutlineTempleBuddhist />}
                onClick={() => { setIsSidebarOpen(false); navigate("/temples/signup"); }}
              />
            </motion.div>

            {/* Overlay Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/10 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      { isModalOpen && <AuthModal type={isModalOpen} setIsModalOpen={setIsModalOpen} /> }
    </>
  );
};

const MenuItem: React.FC<{
  title: "SaiTrip" | "SaiWat";
  selectedTab: string;
  setSelectedTab: (tab: "SaiTrip" | "SaiWat") => void;
  onClick?: () => void;
}> = ({ title, selectedTab, setSelectedTab, onClick }) => (
  <h1
    className={`text-sm md:text-lg font-semibold cursor-pointer transition-colors duration-300 ${
      selectedTab === title
        ? "text-teal-500 border-b-2 border-teal-500"
        : "text-black"
    } hover:text-teal-500`}
    onClick={() => {setSelectedTab(title); onClick()}}
  >
    {title}
  </h1>
);

const SidebarItem: React.FC<{ title: string; icon: JSX.Element, onClick?: () => void }> = ({
  title,
  icon,
  onClick
}) => (
  <div 
    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200"
    onClick={onClick}
  >
    <span className="mr-3 text-lg">{icon}</span>
    <span className="text-sm">{title}</span>
  </div>
);

export default GuestTopbar;
