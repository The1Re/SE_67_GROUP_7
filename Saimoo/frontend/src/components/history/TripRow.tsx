import { FaEye } from "react-icons/fa";

interface TripRowProps {
  id: number;
  name: string;
  date: string;
  status: string;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "สำเร็จ":
      return "bg-green-100 text-green-800";
    case "ยกเลิกแล้ว":
      return "bg-red-100 text-red-800";
    case "กำลังอยู่ในทริป":
      return "bg-blue-100 text-blue-800";
    case "จ่ายแล้ว":
      return "bg-yellow-100 text-yellow-800";
    case "เครมแล้ว":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TripRow = ({ name, date, status }: TripRowProps) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-150">
      <td className="p-4 font-medium text-gray-800">{name}</td>
      <td className="p-4 text-gray-600">{date}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 text-sm rounded-full font-semibold ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      </td>
      <td className="p-4 ">
        <div className="flex justify-center gap-2 ">
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded transition duration-200 cursor-pointer">
            <FaEye className="text-sm" />
            ดู
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TripRow;
