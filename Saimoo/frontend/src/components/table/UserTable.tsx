import { useState } from "react";

const initialUsers = [
  { id: 1, username: "admin", phone: "080-123-4567", email: "admin@example.com" },
  { id: 2, username: "user01", phone: "090-234-5678", email: "user01@example.com" },
  { id: 3, username: "user02", phone: "081-345-6789", email: "user02@example.com" },
];

const UserTable = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">จัดการข้อมูลผู้ใช้</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="ค้นหาผู้ใช้..."
        className="w-full p-2 border rounded mb-4"
      />

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button className="bg-yellow-400 px-3 py-1 rounded mr-2">Edit</button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
