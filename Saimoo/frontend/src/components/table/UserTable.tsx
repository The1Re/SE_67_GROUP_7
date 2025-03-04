import api from "@/api";
import { useState, useEffect } from "react";

export type User = {
  id: number;
  username: string;
  fullName: string;
  phone: string;
  email: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User>(null);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api
        .get("/users", { 
          headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token")
          } 
        } 
      );
      setUsers(res.data);
    }

    fetchData();
  }, [])

  const handleEdit = (user) => {
    setEditUser({ ...user });
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setEditUser(null);
    document.body.style.overflow = "auto";
  };

  const handleSave = () => {
    setUsers(users.map(user => user.id === editUser.id ? editUser : user));
    const saveData = async () => {
      await api
        .put(`/users`, editUser, { 
          headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token") 
          } 
        }
      );
    }
    saveData();
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    const deleteData = async () => {
      await api
        .delete(`/users/${id}`, { 
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
    }
    deleteData();
  };

  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.id === Number(search) ||
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.includes(search)
    ));
  }, [search, users])


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">จัดการข้อมูลผู้ใช้</h2>

      {/* ✅ Search Box */}
      <input
        type="text"
        placeholder="ค้นหาผู้ใช้..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.fullName}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  className="cursor-pointer bg-yellow-400 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Popup Modal (แสดงเมื่อกด Edit) */}
      {editUser && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-xl transition-all duration-300"
          onClick={handleClose} // ✅ ปิด Popup เมื่อกดที่พื้นหลัง
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3 relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">แก้ไขข้อมูลผู้ใช้</h3>
            <label className="block mb-2">
              Username:
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editUser.username}
                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Full Name:
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editUser.fullName}
                onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                Save
              </button>
              <button className="cursor-pointer border border-red-500 text-red-500 px-4 py-2 rounded" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
