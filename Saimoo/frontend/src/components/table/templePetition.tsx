import { useState } from "react";

const representatives = [
  { id: 1, username: "john_doe", phone: "0812345678", email: "john@example.com", status: "รออนุมัติ" },
  { id: 2, username: "jane_smith", phone: "0898765432", email: "jane@example.com", status: "รออนุมัติ" },
];

export default function TemplePetitionTable({ onSelectRepresentative }) {
  const [search, setSearch] = useState("");

  const filteredRepresentatives = representatives.filter(rep =>
    rep.username.includes(search) || rep.email.includes(search)
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
          {filteredRepresentatives.map((rep) => (
            <tr key={rep.id} className="text-center">
              <td className="border p-2">{rep.id}</td>
              <td className="border p-2">{rep.username}</td>
              <td className="border p-2">{rep.phone}</td>
              <td className="border p-2">{rep.email}</td>
              <td className="border p-2">{rep.status}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => onSelectRepresentative(rep)}
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
