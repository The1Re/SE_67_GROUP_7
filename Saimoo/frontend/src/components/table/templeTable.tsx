import api from "@/api";
import { useEffect, useState } from "react";
import DataLoading from "../DataLoading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export type Temple = {
  id?: number;
  name: string;
  latitude?: GLfloat;
  longitude?: GLfloat;
  province: string;
};

const TempleTable = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTemple, setNewTemple] = useState<Temple>({ name: "", province: "", latitude: 0 , longitude: 0 });
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
    if (editTemple) {
      try {
        await api.put(`/temples/${editTemple.id}`, editTemple);
        setTemples(temples.map(t => t.id === editTemple.id ? editTemple : t)); // Update temple in the state
        handleClose();
        console.log("Temple updated successfully.");
      } catch (error) {
        console.error("Error updating temple:", error);
      }
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
          <input type="text" value={newTemple.province} onChange={(e) => setNewTemple({ ...newTemple, province: e.target.value })} className="w-full p-2 border rounded mb-2" />
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
            <label className="block mb-2">
              จังหวัด:
              <input type="text" className="w-full p-2 border rounded" value={editTemple.province} onChange={(e) => setEditTemple({ ...editTemple, province: e.target.value })} />
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
