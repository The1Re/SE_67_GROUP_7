import api from "@/api";
import { useEffect, useState } from "react";
import DataLoading from "../DataLoading";

export type Temple = {
  id?: number;
  name: string;
  latitude?: number;
  longtitude?: number;
  province: string;
  description?: string;
  like: number;
}

const TempleTable = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTemple, setNewTemple] = useState<Temple>({ name: "", province: "", description: "", like: 0 });
  const [editTemple, setEditTemple] = useState<Temple>(null); // ✅ เก็บข้อมูลวัดที่กำลังแก้ไข

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get("/temples?sortOrder=asc");
    const data = res.data.data;
    setTemples(data.map((v) => {
      return {
        id: v.id,
        name: v.name,
        latitude: v.latitude,
        longtitude: v.longitude,
        province: v.Province.name,
        description: v.Temple.description,
        like: v.Temple.likes
      }
    }));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ ลบวัด
  const handleDelete = (id: number) => {
    (async () => {
      await api
      .delete(`/temples/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    })();
    fetchData();
  };

  // ✅ เพิ่มวัดใหม่
  const handleAddTemple = () => {
    setTemples([...temples, { id: temples.length + 1, ...newTemple }]);
    setShowForm(false);
    setNewTemple({ name: "", location: "", phone: "", email: "" });
  };

  // ✅ เปิด Modal แก้ไข
  const handleEdit = (temple) => {
    setEditTemple({ ...temple });
    document.body.style.overflow = "hidden"; // ✅ ป้องกันการ Scroll ขณะ Popup เปิด
  };

  // ✅ ปิด Modal
  const handleClose = () => {
    setEditTemple(null);
    document.body.style.overflow = "auto"; // ✅ เปิด Scroll กลับมา
  };

  // ✅ บันทึกข้อมูลที่แก้ไข
  const handleSave = () => {
    setTemples(temples.map(t => t.id === editTemple.id ? editTemple : t));
    handleClose();
  };

  if (loading) {
    return <DataLoading />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">จัดการข้อมูลวัด</h2>
        <button onClick={() => setShowForm(true)} className="cursor-pointer bg-teal-500 text-white px-3 py-1 rounded">
          + เพิ่มวัด
        </button>
      </div>

      {/* ✅ ฟอร์มเพิ่มวัด */}
      {showForm ? (
        <div className="border p-4 bg-gray-200 rounded-md">
          <label>ชื่อวัด</label>
          <input type="text" value={newTemple.name} onChange={(e) => setNewTemple({ ...newTemple, name: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <label>พิกัด latitude</label>
          <input type="text" value={newTemple.latitude} onChange={(e) => setNewTemple({ ...newTemple, latitude: Number(e.target.value) })} className="w-full p-2 border rounded mb-2" />
          <label>พิกัด longtitude</label>
          <input type="text" value={newTemple.longtitude} onChange={(e) => setNewTemple({ ...newTemple, longtitude: Number(e.target.value) })} className="w-full p-2 border rounded mb-2" />
          <label>จังหวัด</label>
          <input type="text" value={newTemple.province} onChange={(e) => setNewTemple({ ...newTemple, province: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <label>คำอธิบาย</label>
          <input type="text" value={newTemple.description} onChange={(e) => setNewTemple({ ...newTemple, description: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <div className="flex justify-center mt-2">
            <button onClick={handleAddTemple} className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded mr-2">เพิ่มวัด</button>
            <button onClick={() => setShowForm(false)} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded">ยกเลิก</button>
          </div>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Latitude</th>
              <th className="border p-2">Longtitude</th>
              <th className="border p-2">Province</th>
              <th className="border p-2">Discription</th>
              <th className="border p-2">Like</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {temples.map((temple) => (
              <tr key={temple.id} className="text-center">
                <td className="border p-2">{temple.id}</td>
                <td className="border p-2">{temple.name}</td>
                <td className="border p-2">{temple.latitude}</td>
                <td className="border p-2">{temple.longtitude}</td>
                <td className="border p-2">{temple.province}</td>
                <td className="border p-2">{temple.description}</td>
                <td className="border p-2">{temple.like}</td>
                <td className="border p-2">
                  <button className="cursor-pointer bg-yellow-400 px-3 py-1 rounded mr-2" onClick={() => handleEdit(temple)}>Edit</button>
                  <button className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(temple.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Popup Modal สำหรับแก้ไขวัด */}
      {editTemple && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-lg transition-all duration-300"
          onClick={handleClose}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3 relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">แก้ไขข้อมูลวัด</h3>
            <label className="block mb-2">
              ชื่อวัด:
              <input type="text" className="w-full p-2 border rounded" value={editTemple.name} onChange={(e) => setEditTemple({ ...editTemple, name: e.target.value })} />
            </label>
            <label className="block mb-2">
              พิกัด latitude:
              <input type="number" className="w-full p-2 border rounded" value={editTemple.latitude} onChange={(e) => setEditTemple({ ...editTemple, latitude: Number(e.target.value) })} />
            </label>
            <label className="block mb-2">
              พิกัด longtitude:
              <input type="number" className="w-full p-2 border rounded" value={editTemple.longtitude} onChange={(e) => setEditTemple({ ...editTemple, longtitude: Number(e.target.value) })} />
            </label>
            <label className="block mb-2">
              จังหวัด:
              <input type="text" className="w-full p-2 border rounded" value={editTemple.province} onChange={(e) => setEditTemple({ ...editTemple, province: e.target.value })} />
            </label>
            <label className="block mb-2">
              คำอธิบาย:
              <input type="text" className="w-full p-2 border rounded" value={editTemple.description} onChange={(e) => setEditTemple({ ...editTemple, description: e.target.value })} />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
              <button className="cursor-pointer border border-red-500 text-red-500 px-4 py-2 rounded" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleTable;
