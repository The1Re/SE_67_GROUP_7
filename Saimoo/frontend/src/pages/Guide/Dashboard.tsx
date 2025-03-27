import React, { useState } from 'react';
import MonthlyChart from '@/components/guidedashboard/MonthlyChart';
import EventSection from '@/components/guidedashboard/EventSection';
import SidebarFilter from '@/components/guidedashboard/SidebarFilter';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-sm p-6">
          <MonthlyChart />
        </div>
        
        <div className="w-full md:w-1/4">
          <SidebarFilter 
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>
      </div>
      
      <div className="p-4 mt-2">
        <EventSection />
      </div>
    </div>
  );
};

export default Dashboard;