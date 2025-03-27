import React from 'react';

const SidebarFilter = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => {
  // Sample data for years and months
  const years = [2023, 2024, 2025];
  const months = [
    { value: '01', label: 'มกราคม' },
    { value: '02', label: 'กุมภาพันธ์' },
    { value: '03', label: 'มีนาคม' },
    { value: '04', label: 'เมษายน' },
    { value: '05', label: 'พฤษภาคม' },
    { value: '06', label: 'มิถุนายน' },
    { value: '07', label: 'กรกฎาคม' },
    { value: '08', label: 'สิงหาคม' },
    { value: '09', label: 'กันยายน' },
    { value: '10', label: 'ตุลาคม' },
    { value: '11', label: 'พฤศจิกายน' },
    { value: '12', label: 'ธันวาคม' }
  ];

  // Handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>ปี</div>
          <select 
            className="bg-gray-100 px-2 py-1 rounded text-sm"
            value={selectedYear || ''}
            onChange={handleYearChange}
          >
            <option value="">choose year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <div>เดือน</div>
          <select 
            className="bg-gray-100 px-2 py-1 rounded text-sm"
            value={selectedMonth || ''}
            onChange={handleMonthChange}
            disabled={!selectedYear}
          >
            <option value="">choose month</option>
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="font-medium">ยอดรวม</div>
        
        <div className="mt-2">
          {/* Display selected month data or default list */}
          {selectedMonth === '01' ? (
            <div className="bg-gray-300 p-2 rounded mb-2">
              <div>มกราคม</div>
              <div className="text-sm text-gray-700">25,000 บาท</div>
            </div>
          ) : selectedMonth === '02' ? (
            <div className="bg-gray-300 p-2 rounded mb-2">
              <div>กุมภาพันธ์</div>
              <div className="text-sm text-gray-700">30,000 บาท</div>
            </div>
          ) : selectedMonth === '12' ? (
            <div className="bg-gray-300 p-2 rounded mb-2">
              <div>ธันวาคม</div>
              <div className="text-sm text-gray-700">15,000 บาท</div>
              <div className="text-sm text-gray-700">ยอดขายรวมทั้งสิ้นคือ</div>
              <div className="text-sm text-gray-700">95,000 บาท</div>
            </div>
          ) : (
            // Default display when no specific month is selected
            <>
              <div className="bg-gray-300 p-2 rounded mb-2">
                <div>มกราคม</div>
                <div className="text-sm text-gray-700">25,000 บาท</div>
              </div>
              
              <div className="bg-gray-300 p-2 rounded mb-2">
                <div>กุมภาพันธ์</div>
                <div className="text-sm text-gray-700">30,000 บาท</div>
              </div>
              
              <div className="bg-gray-300 p-2 rounded mb-2">
                <div>ธันวาคม</div>
                <div className="text-sm text-gray-700">15,000 บาท</div>
                <div className="text-sm text-gray-700">ยอดขายรวมทั้งสิ้นคือ</div>
                <div className="text-sm text-gray-700">95,000 บาท</div>
              </div>
            </>
          )}
          
          <div className="bg-gray-300 p-2 rounded">
            <div>ยอดรวม</div>
            <div className="text-sm text-gray-700">
              {selectedYear ? `${selectedYear === 2023 ? '70,000' : selectedYear === 2024 ? '95,000' : '0'} บาท` : 'xx,xxx บาท'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;