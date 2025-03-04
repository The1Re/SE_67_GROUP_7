import { useState } from "react";
import { useNavigate } from "react-router-dom";

const claims = [
  { id: 1, name: "นาย ก ไม่ได้", tripName: "ไหว้พระอยุธยา", price: 750, reason: "ไม่ได้ไปจริง", evidenceImages: ["/path-to-image.jpg"] },
  { id: 2, name: "นายชาสิน สุโพธิ์", tripName: "ธนยอพาทเที่ยววัดใจ", price: 9999, reason: "มีปัญหาทางสุขภาพ", evidenceImages: ["/path-to-image.jpg"] },
];

export default function ClaimTable() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredClaims = claims.filter(claim =>
    claim.name.includes(search) || claim.tripName.includes(search)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="ค้นหา..."
        className="mb-2 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ชื่อ-สกุล</th>
            <th className="border p-2">ชื่อทริป</th>
            <th className="border p-2">ราคา</th>
            <th className="border p-2">รายละเอียดการขอเคลม</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim) => (
            <tr key={claim.id} className="text-center">
              <td className="border p-2">{claim.name}</td>
              <td className="border p-2">{claim.tripName}</td>
              <td className="border p-2">{claim.price}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/admin/petitions/claim/${claim.id}`, { state: { claim } })}
                >
                  ดูรายละเอียด
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
