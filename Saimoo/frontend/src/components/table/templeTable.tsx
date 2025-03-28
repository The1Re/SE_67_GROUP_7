import api from "@/api";
import { useEffect, useState } from "react";
import DataLoading from "../DataLoading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export type Temple = {
  id?: number;
  name: string;
  latitude?: number;
  longitude?: number;
  province: string;
  provinceId?: number;
};

const provinces = [
  { id: 1, name: "กรุงเทพมหานคร" },
  { id: 2, name: "กระบี่" },
  { id: 3, name: "กาญจนบุรี" },
  { id: 4, name: "กาฬสินธุ์" },
  { id: 5, name: "กำแพงเพชร" },
  { id: 6, name: "ขอนแก่น" },
  { id: 7, name: "จันทบุรี" },
  { id: 8, name: "ฉะเชิงเทรา" },
  { id: 9, name: "ชัยนาท" },
  { id: 10, name: "ชัยภูมิ" },
  { id: 11, name: "ชุมพร" },
  { id: 12, name: "ชลบุรี" },
  { id: 13, name: "เชียงราย" },
  { id: 14, name: "เชียงใหม่" },
  { id: 15, name: "ตรัง" },
  { id: 16, name: "ตราด" },
  { id: 17, name: "ตาก" },
  { id: 18, name: "นครนายก" },
  { id: 19, name: "นครปฐม" },
  { id: 20, name: "นครพนม" },
  { id: 21, name: "นครราชสีมา" },
  { id: 22, name: "นครศรีธรรมราช" },
  { id: 23, name: "นครสวรรค์" },
  { id: 24, name: "นนทบุรี" },
  { id: 25, name: "นราธิวาส" },
  { id: 26, name: "น่าน" },
  { id: 27, name: "บึงกาฬ" }, 
  { id: 28, name: "บุรีรัมย์" },
  { id: 29, name: "ประจวบคีรีขันธ์" },
  { id: 30, name: "ปทุมธานี" },
  { id: 31, name: "ปราจีนบุรี" },
  { id: 32, name: "ปัตตานี" },
  { id: 33, name: "พระนครศรีอยุธยา" },
  { id: 34, name: "พะเยา" },
  { id: 35, name: "พังงา" },
  { id: 36, name: "พัทลุง" },
  { id: 37, name: "พิจิตร" },
  { id: 38, name: "พิษณุโลก" },
  { id: 39, name: "เพชรบุรี" },
  { id: 40, name: "เพชรบูรณ์" },
  { id: 41, name: "แพร่" },
  { id: 42, name: "ภูเก็ต" },
  { id: 43, name: "มหาสารคาม" },
  { id: 44, name: "มุกดาหาร" },
  { id: 45, name: "แม่ฮ่องสอน" },
  { id: 46, name: "ยโสธร" },
  { id: 47, name: "ยะลา" },
  { id: 48, name: "ร้อยเอ็ด" },
  { id: 49, name: "ระนอง" },
  { id: 50, name: "ระยอง" },
  { id: 51, name: "ราชบุรี" },
  { id: 52, name: "ลพบุรี" },
  { id: 53, name: "ลำปาง" },
  { id: 54, name: "ลำพูน" },
  { id: 55, name: "เลย" },
  { id: 56, name: "ศรีสะเกษ" },
  { id: 57, name: "สกลนคร" },
  { id: 58, name: "สงขลา" },
  { id: 59, name: "สตูล" },
  { id: 60, name: "สมุทรปราการ" },
  { id: 61, name: "สมุทรสงคราม" },
  { id: 62, name: "สมุทรสาคร" },
  { id: 63, name: "สระแก้ว" },
  { id: 64, name: "สระบุรี" },
  { id: 65, name: "สิงห์บุรี" },
  { id: 66, name: "สุโขทัย" },
  { id: 67, name: "สุพรรณบุรี" },
  { id: 68, name: "สุราษฎร์ธานี" },
  { id: 69, name: "สุรินทร์" },
  { id: 70, name: "หนองคาย" },
  { id: 71, name: "หนองบัวลำภู" },
  { id: 72, name: "อ่างทอง" },
  { id: 73, name: "อำนาจเจริญ" },
  { id: 74, name: "อุดรธานี" },
  { id: 75, name: "อุตรดิตถ์" },
  { id: 76, name: "อุทัยธานี" },
  { id: 77, name: "อุบลราชธานี" }
];


const TempleTable = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTemple, setNewTemple] = useState<Temple>({ name: "", province: "", latitude: 0 , longitude: 0 ,provinceId : undefined });
  const [editTemple, setEditTemple] = useState<Temple | null>(null); // Data of temple being edited

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of temples per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/temples?sortOrder=asc&page=${currentPage}&pageSize=${pageSize}`);
      const data = res.data.data;
      const total = res.data.pagination.totalPages;
      setTemples(data.map((v) => {
        return {
          id: v.id,
          name: v.name,
          latitude: v.latitude,
          longitude: v.longitude,
          province: v.Province?.name || "ไม่ระบุจังหวัด", // Added optional chaining and fallback
        };
      }));
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching temples:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณต้องการลบข้อมูลวัดนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบเลย",
      cancelButtonText: "ยกเลิก",
    });
  
    if (result.isConfirmed) {
      try {
        await api.delete(`/temples/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        fetchData(); // Refetch after deletion
  
        toast.success("ลบข้อมูลวัดเรียบร้อยแล้ว!");
      } catch (error) {
        console.error("Error deleting temple:", error);
        toast.error("เกิดข้อผิดพลาดในการลบข้อมูล!");
      }
    }
  };

  const handleAddTemple = async () => {
    try {
      const response = await api.post("/temples", newTemple);
      setNewTemple({ name: "", province: "", latitude: 0, longitude: 0 });
      setShowForm(false);
      fetchData();
      console.log("Temple added successfully:", response.data);
      toast.success("ข้อมูลวัดถูกลบสำเร็จ!");
    } catch (error) {
      console.error("Error creating temple:", error);
    }
  };

  const handleEdit = (temple: Temple) => {
    setEditTemple({ ...temple });
    document.body.style.overflow = "hidden"; // Prevent scrolling when popup is open
  };

  const handleClose = () => {
    setEditTemple(null);
    document.body.style.overflow = "auto"; // Allow scrolling again
  };

  const handleSave = async () => {
    if (!editTemple) return;
    try {
      const templeData = {
        name: editTemple.name,
        latitude: editTemple.latitude,
        longitude: editTemple.longitude,
        provinceId: editTemple.provinceId , // ป้องกัน undefined
      };
      await api.put(`/temples/name/${editTemple.id}`, templeData);
      toast.success("แก้ไขข้อมูลสำเร็จ!");
      fetchData();
      setEditTemple(null);
    } catch (error) {
      console.error("Error updating temple:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล!");
    }
  };
  

  if (loading) {
    return <DataLoading />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">จัดการข้อมูลวัด</h2>
        <button onClick={() => setShowForm(true)} className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded">
          + เพิ่มวัด
        </button>
      </div>

      {/* Form for adding a new temple */}
      {showForm ? (
        <div className="border p-4 bg-gray-200 rounded-md">
          <label>ชื่อวัด</label>
          <input type="text" value={newTemple.name} onChange={(e) => setNewTemple({ ...newTemple, name: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <label>พิกัด latitude</label>
          <input 
            type="number" 
            step="any" 
            value={newTemple.latitude} 
            onChange={(e) => setNewTemple({ ...newTemple, latitude: Number(e.target.value) })} 
            className="w-full p-2 border rounded mb-2" 
          />          
          <label>พิกัด longtitude</label>
          <input 
            type="number" 
            step="any" 
            value={newTemple.longitude} 
            onChange={(e) => setNewTemple({ ...newTemple, longitude: Number(e.target.value) })} 
            className="w-full p-2 border rounded mb-2" 
          />          
          <label>จังหวัด</label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={newTemple.provinceId || ""}
            onChange={(e) => setNewTemple({ 
              ...newTemple, 
              provinceId: Number(e.target.value),
              province: provinces.find(p => p.id === Number(e.target.value))?.name || ""
            })}
          >
            <option value="">-- เลือกจังหวัด --</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="flex justify-center mt-2">
            <button onClick={handleAddTemple} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mr-2">เพิ่มวัด</button>
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
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {temples.map((temple) => (
              <tr key={temple.id} className="text-center">
                <td className="border p-2">{temple.id}</td>
                <td className="border p-2">{temple.name}</td>
                <td className="border p-2">{temple.latitude}</td>
                <td className="border p-2">{temple.longitude}</td>
                <td className="border p-2">{temple.province}</td>
                <td className="border p-2">
                  <button className="cursor-pointer bg-yellow-400 px-3 py-1 rounded mr-2" onClick={() => handleEdit(temple)}>Edit</button>
                  <button className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(temple.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination controls */}
      {!showForm && (
        <div className="flex justify-between mt-4">
          <button 
            className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="self-center">Page {currentPage} of {totalPages}</span>
          <button 
            className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal for updating temple data */}
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
              <input type="number" className="w-full p-2 border rounded" value={editTemple.longitude} onChange={(e) => setEditTemple({ ...editTemple, longitude: Number(e.target.value) })} />
            </label>
            <select
              className="w-full p-2 border rounded mb-2"
              value={editTemple.provinceId || ""}
              onChange={(e) => setEditTemple({
                ...editTemple,
                provinceId: Number(e.target.value),
                province: provinces.find(p => p.id === Number(e.target.value))?.name || ""
              })}
            >
              <option value="">-- เลือกจังหวัด --</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

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
