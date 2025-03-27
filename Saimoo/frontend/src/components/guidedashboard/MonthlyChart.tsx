import React from 'react';

const MonthlyChart = () => {
  // Sample data for the chart
  const monthlyData = [
    { month: 1, value: 0 },
    { month: 2, value: 0 },
    { month: 3, value: 25000 },
    { month: 4, value: 7000 },
    { month: 5, value: 7000 },
    { month: 6, value: 7000 },
    { month: 7, value: 7000 },
    { month: 8, value: 7000 },
    { month: 9, value: 7000 },
    { month: 10, value: 7000 },
    { month: 11, value: 95000 },
  ];

  // Finding max value for scaling the chart
  const maxValue = Math.max(...monthlyData.map(item => item.value));

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-medium text-gray-700 mb-4">
        ยอดขายต่อเดือน
      </h2>
      
      <div className="w-full h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-600">
          <div>120000</div>
          <div>100000</div>
          <div>80000</div>
          <div>60000</div>
          <div>40000</div>
          <div>20000</div>
          <div>0</div>
        </div>
        
        {/* Chart area */}
        <div className="ml-16 h-full border border-gray-300 bg-white relative">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-rows-6 w-full h-full">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="border-t border-gray-300 w-full"></div>
            ))}
          </div>
          
          {/* Grid columns */}
          <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="border-l border-gray-300 h-full"></div>
            ))}
          </div>
          
          {/* Line chart */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <polyline
              points={monthlyData.map((data, i) => {
                const x = (data.month / 12) * 100;
                const y = 100 - (data.value / maxValue) * 100;
                return `${x}% ${y}%`;
              }).join(' ')}
              fill="none"
              stroke="#1a73e8"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {monthlyData.map((data, i) => {
              const x = (data.month / 12) * 100;
              const y = 100 - (data.value / maxValue) * 100;
              return (
                <circle
                  key={i}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#1a73e8"
                />
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between transform translate-y-full">
            {[0, 2, 4, 6, 8, 10, 12].map(month => (
              <div key={month} className="text-sm text-gray-600">
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;