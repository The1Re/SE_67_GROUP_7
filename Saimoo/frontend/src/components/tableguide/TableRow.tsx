import React from 'react';

const TableRow = ({ children }) => {
  return (
    <tr className="hover:bg-gray-50">
      {children}
    </tr>
  );
};

export default TableRow;