import api from "@/api";
import { env } from "@/config";
import { Request } from "@/models/Request";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ImageNotFound from '@/assets/imagenotfound.png';

export default function GuidePetitionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const guide: Request = location.state?.guide;

  if (!guide) {
    return <p className="text-center text-red-500 text-lg">ไม่พบข้อมูลไกด์</p>;
  }

  const handleApprove = () => {
    api.patch('/requests/approve/guide', { requestId: guide.id}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
    .then(() => {
      toast.success(`อนุมัติเป็นไกด์ ID: ${guide.id}`);
      navigate(-1);
    })
    .catch((err) => {
      toast.error(`เกิดข้อผิดพลาด: ${err.response.data.message}`);
    })
  };

  const handleReject = () => {
    api.patch('/requests/reject', { requestId: guide.id}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
    .then(() => {
      toast.success(`ไม่อนุมัติเป็นไกด์ ID: ${guide.id}`);
      navigate(-1);
    })
    .catch((err) => {
      toast.error(`เกิดข้อผิดพลาด: ${err.response.data.message}`);
    })
  };

  return (
    <div className="p-6 border rounded shadow bg-gray-100 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">รายละเอียดการขออนุมัติเป็นไกด์</h2>
      <div className="mb-4">
        <p className="text-lg"><strong>ชื่อ:</strong> {guide.User.username}</p>
        <p className="text-lg"><strong>เบอร์โทรศัพท์:</strong> {guide.phone}</p>
      </div>
      {
        guide.IdentityDocument.map((doc) => (
          <div key={doc.id} className="mb-4">
            <p className="text-lg font-semibold">{doc.type == 'Id_verification' ? 'บัตรประชาชน:' : 'หนังสือรับรอง:' } </p>
            <img 
              src={env.API_URL + "/" + doc.filePath} 
              alt={doc.type} 
              className="w-1/2 border rounded shadow" 
              onError={(e) => {
                e.currentTarget.src = ImageNotFound;
                e.currentTarget.classList.remove("w-1/2");
                e.currentTarget.classList.add("w-1/4");
              }}
            />
          </div>
        ))
      }
      <div className="mt-4 flex gap-4">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer"
          onClick={handleApprove}
        >
          อนุมัติ
        </button>
        <button
          className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-100 cursor-pointer"
          onClick={handleReject}
        >
          ไม่อนุมัติ
        </button>
      </div>
    </div>
  );
}
