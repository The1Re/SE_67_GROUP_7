import React from 'react';

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  );
};

export default Table;