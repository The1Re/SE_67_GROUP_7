import React from 'react';

interface ButtonProps {
  type: 'refresh' | 'form-code'; // ✅ รองรับค่าที่คุณส่งมา
  children: React.ReactNode;
  onClick?: () => void; // ✅ เพิ่ม onClick แบบ optional
}

const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  const baseClass = 'px-3 py-1 text-white text-xs rounded cursor-pointer';
  const colorClass = type === 'refresh' ? 'bg-teal-500' : 'bg-blue-500';

  return <button className={`${baseClass} ${colorClass}`} onClick={onClick}>{children}</button>;
};

export default Button;