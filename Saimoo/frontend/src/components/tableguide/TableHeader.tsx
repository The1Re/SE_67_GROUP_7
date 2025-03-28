import React from 'react';

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr className="bg-gray-50">
        {columns.map((column, index) => (
          <th 
            key={index} 
            className="py-3 px-4 border border-gray-200 font-semibold text-left"
            style={{ textAlign: column.align || 'left' }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;