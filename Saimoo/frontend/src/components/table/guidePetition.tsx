import api from "@/api";
import { Request } from "@/models/Request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataLoading from "../DataLoading";

export default function GuidePetitionTable() {
  const [data, setData] = useState<Request[]>([]);
  const [filterData, setFilterData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get<{ requests: Request[] }>("/requests", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        const request_data = res.data.requests.filter((v) => v.type === "Become_Guide");
        setData(request_data);
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    setFilterData(data.filter((v) => v.fullName?.includes(search) || v.phone?.includes(search) || v.email?.includes(search) || v.status?.includes(search)))
  }, [search, data])

  if (loading) {
    return (
      <DataLoading />
    );
  }

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
            <th className="border p-2">Fullname</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((guide) => (
            <tr key={guide.id} className="text-center">
              <td className="border p-2">{guide.id}</td>
              <td className="border p-2">{guide.User.username}</td>
              <td className="border p-2">{guide.fullName}</td>
              <td className="border p-2">{guide.User.email}</td>
              <td className="border p-2">{guide.phone}</td>
              <td className="border p-2">{guide.status}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
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
