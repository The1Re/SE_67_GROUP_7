import { useLocation, useNavigate } from "react-router-dom";

export default function GuidePetitionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const guide = location.state?.guide;

  if (!guide) {
    return <p className="text-center text-red-500 text-lg">ไม่พบข้อมูลไกด์</p>;
  }

  const handleApprove = () => {
    console.log(`อนุมัติไกด์ ID: ${guide.id}`);
    navigate(-1); // ✅ กลับไปหน้าก่อนหน้า
  };

  const handleReject = () => {
    console.log(`ไม่อนุมัติไกด์ ID: ${guide.id}`);
    navigate(-1); // ✅ กลับไปหน้าก่อนหน้า
  };

  return (
    <div className="p-6 border rounded shadow bg-gray-100 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">รายละเอียดการขออนุมัติเป็นไกด์</h2>
      <div className="mb-4">
        <p className="text-lg"><strong>ชื่อ:</strong> {guide.username}</p>
        <p className="text-lg"><strong>เบอร์โทรศัพท์:</strong> {guide.phone}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">หนังสือรับรอง:</p>
        <img src={guide.certificateImage} alt="หนังสือรับรอง" className="w-1/2 border rounded shadow" />
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">บัตรประชาชน:</p>
        <img src={guide.idCardImage} alt="บัตรประชาชน" className="w-1/2 border rounded shadow" />
      </div>
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
