import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

const TableCell: React.FC<TableCellProps> = ({ children, align = 'left' }) => {
  return (
    <td
      className="py-3 px-4 border border-gray-200"
      style={{ textAlign: align }}
    >
      {children}
    </td>
  );
};

export default TableCell;
