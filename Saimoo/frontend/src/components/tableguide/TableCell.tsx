// TableCell.tsx
import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  colSpan?: number; // ✅ เพิ่มการรองรับ colSpan
  align?: "left" | "center" | "right"; // ✅ เพิ่ม align
}

const TableCell: React.FC<TableCellProps> = ({ children, colSpan, align = "left" }) => {
  return (
    <td
      className={`p-2 border text-${align}`}
      colSpan={colSpan} // ✅ ใช้ colSpan ตามเงื่อนไข
    >
      {children}
    </td>
  );
};

export default TableCell;
