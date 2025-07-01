const DaySelector = ({ activeTab, setActiveTab, days }) => {
    return (
      <div className="flex space-x-2 mb-4">
        {days.map((day) => (
          <button
            key={day.day}
            className={`cursor-pointer px-4 py-2 rounded-lg ${
              activeTab === day.day ? "bg-teal-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(day.day)}
          >
            Day {day.day}
          </button>
        ))}
      </div>
    );
  };
  
  export default DaySelector;
  