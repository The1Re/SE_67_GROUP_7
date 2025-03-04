import React from "react";

const TempleTabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["Activity", "Charm", "Picture"];

  return (
    <div className="mt-6 border-b">
      <div className="flex justify-center space-x-16 text-gray-600 text-xl"> {/* ✅ เพิ่มขนาดตัวอักษรและระยะห่าง */}
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-3 pb-2 px-6 transition-all duration-300 ${
              selectedTab === tab
                ? "border-b-4 border-black font-bold text-black"
                : "hover:text-black"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TempleTabs;
