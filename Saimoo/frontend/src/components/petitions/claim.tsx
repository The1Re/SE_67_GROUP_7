import { useLocation, useNavigate } from "react-router-dom";

export default function ClaimDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const claim = location.state?.claim;

  if (!claim) {
    return <p className="text-center text-red-500 text-lg">ไม่พบข้อมูลการขอเคลม</p>;
  }

  const handleApprove = () => {
    console.log(`อนุมัติคำขอเคลม ID: ${claim.id}`);
    navigate(-1); // ✅ กลับไปหน้าก่อนหน้า
  };

  const handleReject = () => {
    console.log(`ไม่อนุมัติคำขอเคลม ID: ${claim.id}`);
    navigate(-1); // ✅ กลับไปหน้าก่อนหน้า
  };

  return (
    <div className="p-6 border rounded shadow bg-gray-100 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">รายละเอียดผู้ขอเคลม</h2>
      <div className="mb-4">
        <p className="text-lg"><strong>ชื่อ-นามสกุล:</strong> {claim.name}</p>
        <p className="text-lg"><strong>ชื่อทริป:</strong> {claim.tripName}</p>
        <p className="text-lg"><strong>ราคา:</strong> {claim.price}</p>
        <p className="text-lg text-red-500 font-bold">สถานะ: ไม่ได้ไปจริง</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">เหตุผลที่ขอเคลม:</p>
        <p>{claim.reason}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">ภาพหลักฐาน:</p>
        <div className="flex gap-2">
          {claim.evidenceImages?.length > 0 ? (
            claim.evidenceImages.map((img, index) => (
              <img key={index} src={img} alt="หลักฐาน" className="w-1/4 border rounded shadow" />
            ))
          ) : (
            <p className="text-gray-500">ไม่มีภาพหลักฐาน</p>
          )}
        </div>
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
