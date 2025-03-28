import React from 'react';

interface ReasonCardProps {
  id: string;
  title: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const ReasonCard: React.FC<ReasonCardProps> = ({
  title,
  description,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`
        border-2 p-4 rounded-lg cursor-pointer transition-all
        ${isSelected ? 'border-red-500 bg-red-50' : 'border-gray-300'}
      `}
    >
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};
