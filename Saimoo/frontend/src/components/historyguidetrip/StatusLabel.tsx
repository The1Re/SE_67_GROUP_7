import React from 'react';

interface StatusLabelProps {
  status: string;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  // กำหนด class ตามประเภทของสถานะ
  const getStatusClass = (): string => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'bg-indigo-600';
      case 'เตรียม':
        return 'bg-purple-600';
      case 'เสร็จสิ้น':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusLabel;