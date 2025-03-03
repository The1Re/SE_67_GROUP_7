import { useState } from "react";
import { motion } from "framer-motion";
import watpha from "../../assets/watpha.jpg";
import watnakhon from "../../assets/watnakhon.jpg";
import watchai from "../../assets/watchai.jpg";
import watarun from "../../assets/watarun.jpg";
import watjai from "../../assets/watjai.jpg";

const trips = [
  { id: 1, title: "วัดพระธาตุช่อแฮ", description: "แพร่", imageUrl: watpha },
  { id: 2, title: "องค์พระปฐมเจดีย์", description: "นครปฐม", imageUrl: watnakhon },
  { id: 3, title: "วัดไชยธาราราม", description: "ภูเก็ต", imageUrl: watchai },
  { id: 4, title: "วัดพระแก้ว", description: "กรุงเทพฯ", imageUrl: watarun },
  { id: 5, title: "วัดอรุณราชวราราม", description: "กรุงเทพฯ", imageUrl: watjai },
];

const BrowseTempleWithGuest = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);

  return (
    <div className="bg-white min-h-screen text-gray-500">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between text-white">
        <h1 className="text-2xl font-bold">SaiMoo</h1>
        <div className="flex space-x-4">
          <button className="text-white bg-blue-500 px-4 py-2 rounded-lg">SaiTrip</button>
          <button className="text-white bg-green-500 px-4 py-2 rounded-lg">SaiWat</button>
        </div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600" onClick={() => setIsModalOpen("login")}>
          Login
        </button>
      </nav>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-grab"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
          >
            <img src={trip.imageUrl} alt={trip.title} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-gray-800 font-bold mt-2">{trip.title}</h3>
            <p className="text-gray-600 text-sm">{trip.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && <AuthModal type={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

const AuthModal = ({ type, setIsModalOpen }) => {
  const titles = {
    login: "Sign In",
    signup: "Sign Up",
    forgot: "Forgot Password"
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-[600px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#44AFB6" }}>
          {titles[type]}
        </h2>
        
        {type === "signup" && (
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
              <input type="text" placeholder="Enter your email" className="border px-4 py-2 w-full rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Firstname</label>
              <input type="text" placeholder="Enter your firstname" className="border px-4 py-2 w-full rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Username</label>
              <input type="text" placeholder="Enter your username" className="border px-4 py-2 w-full rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Surname</label>
              <input type="text" placeholder="Enter your surname" className="border px-4 py-2 w-full rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
              <input type="password" placeholder="Enter your password" className="border px-4 py-2 w-full rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Phone</label>
              <input type="text" placeholder="Enter your phone number" className="border px-4 py-2 w-full rounded-lg" />
            </div>
          </div>
        )}

        {type === "login" && (
          <>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-1">Username/Email</label>
              <input type="text" placeholder="Enter your username or email" className="border px-4 py-2 w-full rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-1">Password</label>
              <input type="password" placeholder="Enter your password" className="border px-4 py-2 w-full rounded-lg" />
            </div>

            <p className="text-right text-sm text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => setIsModalOpen("forgot")}>
              Forgot password?
            </p>
          </>
        )}

        {type === "forgot" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
              <input type="text" placeholder="Enter your email" className="border px-4 py-2 w-full rounded-lg" />
            </div>
            <p className="text-sm text-gray-500">We will send you a reset link.</p>
          </>
        )}

        <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 mt-2">{titles[type]}</button>

        <p className="text-center mt-2 text-gray-500">
          {type === "login" ? (
            <>Don't have an account? <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen("signup")}>Sign up</span></>
          ) : type === "signup" ? (
            <>Already have an account? <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen("login")}>Sign in</span></>
          ) : null}
        </p>

        <button
          className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 mt-4"
          onClick={() => setIsModalOpen(type === "forgot" || type === "signup" ? "login" : null)}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};


export default BrowseTempleWithGuest;
