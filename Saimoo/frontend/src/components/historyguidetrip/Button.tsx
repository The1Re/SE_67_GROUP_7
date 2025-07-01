import React from 'react';

export type ButtonType = 'primary' | 'danger' | 'default';

interface ButtonProps {
  type: ButtonType;
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  const getButtonClass = () => {
    switch (type) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white ';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'default':
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getButtonClass()} px-4 py-2 rounded-md text-sm cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
