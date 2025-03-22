import { env } from "@/config";
import { Request } from "@/models/Request";
import { useLocation, useNavigate } from "react-router-dom";

export default function TemplePetitionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const representative: Request = location.state?.representative;

  if (!representative) {
    return <p className="text-center text-red-500 text-lg">ไม่พบข้อมูลตัวแทนวัด</p>;
  }

  const handleApprove = () => {
    console.log(`อนุมัติตัวแทนวัด ID: ${representative.id}`);
    navigate(-1); // ✅ กลับไปหน้าก่อนหน้า
  };

  const handleReject = () => {
    console.log(`ไม่อนุมัติตัวแทนวัด ID: ${representative.id}`);
    navigate(-1); // ✅ กลับไปหน้าก่อนหน้า
  };

  return (
    <div className="p-6 border rounded shadow bg-gray-100 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">รายละเอียดตัวแทนวัด</h2>
      <div className="mb-4">
        <p className="text-lg"><strong>ชื่อคนขอ:</strong> {representative.fullName}</p>
        <p className="text-lg"><strong>ชื่อวัด:</strong> {representative.templeName}</p>
      </div>
      {
        representative.IdentityDocument.map((doc) => (
          <div key={doc.id} className="mb-4">
            <p className="text-lg font-semibold">{doc.type == 'Id_verification' ? 'บัตรประชาชน:' : 'หนังสือรับรอง:' } </p>
            <img src={env.API_URL + "/" + doc.filePath} alt={doc.type} className="w-1/2 border rounded shadow" />
          </div>
        ))
      }
      <div className="mt-4 flex gap-4">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={handleApprove}
        >
          อนุมัติ
        </button>
        <button
          className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-100"
          onClick={handleReject}
        >
          ไม่อนุมัติ
        </button>
      </div>
    </div>
  );
}
