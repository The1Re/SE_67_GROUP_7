import React from "react";

const TempleTabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["Activity", "Charm", "Picture"];

  return (
    <div className="mt-6 border-b">
      <div className="flex justify-center space-x-12 text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${selectedTab === tab ? "border-b-2 border-black font-bold text-black" : ""}`}
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
