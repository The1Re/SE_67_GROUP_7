import { useState } from "react";
import { useNavigate } from "react-router-dom";

const guides = [
  { id: 1, username: "guide_anna", phone: "0991122334", email: "anna@example.com", status: "รออนุมัติ", certificateImage: "/guide-cert.jpg", idCardImage: "/guide-id.jpg" },
  { id: 2, username: "guide_bob", phone: "0889988776", email: "bob@example.com", status: "รออนุมัติ", certificateImage: "/guide-cert.jpg", idCardImage: "/guide-id.jpg" },
];

export default function GuidePetitionTable() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredGuides = guides.filter(guide =>
    guide.username.includes(search) || guide.email.includes(search)
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
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">เบอร์โทร</th>
            <th className="border p-2">E-mail</th>
            <th className="border p-2">สถานะ</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => (
            <tr key={guide.id} className="text-center">
              <td className="border p-2">{guide.id}</td>
              <td className="border p-2">{guide.username}</td>
              <td className="border p-2">{guide.phone}</td>
              <td className="border p-2">{guide.email}</td>
              <td className="border p-2">{guide.status}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/admin/petitions/guide/${guide.id}`, { state: { guide } })}
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
