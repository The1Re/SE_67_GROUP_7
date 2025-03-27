// src/components/Table/TableCell.jsx
import React from 'react';

const TableCell = ({ children, align = 'left' }) => {
  return (
    <td className="py-3 px-4 border border-gray-200" style={{ textAlign: align }}>
      {children}
    </td>
  );
};

export default TableCell;