import { useState } from "react";
import { motion } from "framer-motion";
import watpha from "../../assets/watpha.jpg";
import watnakhon from "../../assets/watnakhon.jpg";
import watchai from "../../assets/watchai.jpg";
import watarun from "../../assets/watarun.jpg";
import watjai from "../../assets/watjai.jpg";

const trips = [
  { id: 1, title: "เชียงใหม่ 9 วัด", description: "เที่ยวเชียงใหม่ 3 วัน 2 คืน", imageUrl: watpha, category: "ธรรมชาติ" },
  { id: 2, title: "ทริป 8 วัน", description: "เยี่ยมสุดๆ", imageUrl: watnakhon, category: "ยอดนิยม" },
  { id: 3, title: "กรุงเทพมหานคร", description: "เมืองหลวงที่ไม่เคยหลับ", imageUrl: watchai, category: "ประวัติศาสตร์" },
  { id: 4, title: "อุทยานวัด", description: "สูดอากาศบริสุทธิ์", imageUrl: watarun, category: "ธรรมชาติ" },
  { id: 5, title: "เหงาๆ ไปเที่ยวกันปะ", description: "เที่ยวเชียงใหม่ 3 วัน 2 คืน", imageUrl: watjai, category: "ธรรมชาติ" },
];

const filters = ["ทั้งหมด", "ธรรมชาติ", "ยอดนิยม", "ประวัติศาสตร์"];

const BrowseTrip = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");
  const [isModalOpen, setIsModalOpen] = useState(null); // null = ปิด, 'login' = login, 'signup' = signup

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.title.includes(searchQuery) || trip.description.includes(searchQuery);
    const matchesFilter = selectedFilter === "ทั้งหมด" || trip.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white min-h-screen text-gray-500">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold">
          <span className="text-red-500">S</span>
          <span className="text-white">AIM</span>
          <span className="text-yellow-500">O</span>
          <span className="text-blue-500">O</span>
        </h1>
        <div className="flex space-x-4 justify-center">
          <button className="text-white bg-blue-500 px-4 py-2 rounded-lg mx-2 ">SaiTrip</button>
          <button className="text-white bg-green-500 px-4 py-2 rounded-lg mx-2 ">SaiWat</button>
          <div className="flex items-center">
            <span className="w-0.5 h-6 bg-gray-500 mr-2"></span>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
              onClick={() => setIsModalOpen("login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Search & Filter */}
      <div className="p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-center ">
        <input
          type="text"
          placeholder="🔍 ค้นหาทริป..."
          className="border px-4 py-2 rounded-lg w-2/3 md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-lg"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {filters.map((filter, index) => (
            <option key={index} value={filter}>{filter}</option>
          ))}
        </select>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              className="bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.2, // ให้การ์ดแสดงในลำดับที่แตกต่าง
                duration: 0.5, // ระยะเวลาในการเคลื่อนไหว
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05, // เพิ่มขนาดเมื่อมีการ hover
                rotate: 3, // หมุนเล็กน้อย
                boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)", // เพิ่มเงาให้การ์ด
              }}
            >
              <img src={trip.imageUrl} alt={trip.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-gray-800 font-bold mt-2">{trip.title}</h3>
              <p className="text-gray-600 text-sm">{trip.description}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">ไม่พบทริปที่ตรงกับการค้นหา</p>
        )}
      </div>

      {/* Login & Signup Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg w-96"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {isModalOpen === 'login' ? 'Sign in' : 'Sign up'}
      </h2>
      <input type="text" placeholder="Email" className="border px-4 py-2 w-full rounded-lg mb-2" />
      {isModalOpen === 'signup' && (
        <>
          <input type="text" placeholder="First Name" className="border px-4 py-2 w-full rounded-lg mb-2" />
          <input type="text" placeholder="Last Name" className="border px-4 py-2 w-full rounded-lg mb-2" />
          <input type="text" placeholder="Username" className="border px-4 py-2 w-full rounded-lg mb-2" />
          <input type="text" placeholder="Phone" className="border px-4 py-2 w-full rounded-lg mb-2" />
        </>
      )}
      <input type="password" placeholder="Password" className="border px-4 py-2 w-full rounded-lg mb-2" />
      <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">
        {isModalOpen === 'login' ? 'Login' : 'Sign up'}
      </button>
      <p className="text-center mt-2 text-gray-500">
        {isModalOpen === 'login' ? "Don't have an account?" : "Already have an account?"} 
        <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen(isModalOpen === 'login' ? 'signup' : 'login')}>
          {isModalOpen === 'login' ? 'Sign up' : 'Sign in'}
        </span>
      </p>
      <button className="mt-4 w-full text-sm text-gray-500 hover:underline" onClick={() => setIsModalOpen(null)}>
        Close
      </button>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default BrowseTrip;
