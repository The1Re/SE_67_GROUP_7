import { useState } from "react";

const initialTemples = [
  { id: 1, username: "monk1", name: "วัดพระแก้ว", location: "กรุงเทพฯ", phone: "081-111-1111", email: "wat1@example.com" },
  { id: 2, username: "monk2", name: "วัดโพธิ์", location: "กรุงเทพฯ", phone: "082-222-2222", email: "wat2@example.com" },
];

const TempleTable = () => {
  const [temples, setTemples] = useState(initialTemples);
  const [showForm, setShowForm] = useState(false);
  const [newTemple, setNewTemple] = useState({ name: "", location: "", phone: "", email: "" });
  const [editTemple, setEditTemple] = useState(null); // ✅ เก็บข้อมูลวัดที่กำลังแก้ไข

  // ✅ ลบวัด
  const handleDelete = (id) => {
    setTemples(temples.filter((temple) => temple.id !== id));
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">จัดการข้อมูลวัด</h2>
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
          + เพิ่มวัด
        </button>
      </div>

      {/* ✅ ฟอร์มเพิ่มวัด */}
      {showForm ? (
        <div className="border p-4 bg-gray-200 rounded-md">
          <label>ชื่อวัด</label>
          <input type="text" value={newTemple.name} onChange={(e) => setNewTemple({ ...newTemple, name: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <label>ที่อยู่</label>
          <input type="text" value={newTemple.location} onChange={(e) => setNewTemple({ ...newTemple, location: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <label>โทรศัพท์</label>
          <input type="text" value={newTemple.phone} onChange={(e) => setNewTemple({ ...newTemple, phone: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <label>อีเมล</label>
          <input type="email" value={newTemple.email} onChange={(e) => setNewTemple({ ...newTemple, email: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <div className="flex justify-center mt-2">
            <button onClick={handleAddTemple} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">เพิ่มวัด</button>
            <button onClick={() => setShowForm(false)} className="bg-red-500 text-white px-4 py-2 rounded">ยกเลิก</button>
          </div>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">USERNAME</th>
              <th className="border p-2">ชื่อวัด</th>
              <th className="border p-2">ที่อยู่</th>
              <th className="border p-2">โทรศัพท์</th>
              <th className="border p-2">อีเมล</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {temples.map((temple) => (
              <tr key={temple.id} className="text-center">
                <td className="border p-2">{temple.id}</td>
                <td className="border p-2">{temple.username}</td>
                <td className="border p-2">{temple.name}</td>
                <td className="border p-2">{temple.location}</td>
                <td className="border p-2">{temple.phone}</td>
                <td className="border p-2">{temple.email}</td>
                <td className="border p-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded mr-2" onClick={() => handleEdit(temple)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(temple.id)}>Delete</button>
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
              ที่อยู่:
              <input type="text" className="w-full p-2 border rounded" value={editTemple.location} onChange={(e) => setEditTemple({ ...editTemple, location: e.target.value })} />
            </label>
            <label className="block mb-2">
              โทรศัพท์:
              <input type="text" className="w-full p-2 border rounded" value={editTemple.phone} onChange={(e) => setEditTemple({ ...editTemple, phone: e.target.value })} />
            </label>
            <label className="block mb-2">
              อีเมล:
              <input type="email" className="w-full p-2 border rounded" value={editTemple.email} onChange={(e) => setEditTemple({ ...editTemple, email: e.target.value })} />
            </label>
            <div className="mt-4 flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleTable;
