import { useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const TempleDetail = () => {
  const [selectedTab, setSelectedTab] = useState("Picture");
  const [showAddCharmPopup, setShowAddCharmPopup] = useState(false);
  const [descImage, setDescImage] = useState(null);
  const [charmImage, setCharmImage] = useState(null);

  const [templeData, setTempleData] = useState({
    name: "วัดศีรษะทอง",
    description: "วัดเก่าแก่ของอำเภอนครชัยศรี จังหวัดนครปฐม วัดศีรษะทอง แห่งนี้ได้เป็นที่รู้จักของมวลพสกนิกรชาวไทยและชาวต่างชาติ...",
    address: "8/1 หมู่ 1 ถนนศีรษะทอง อำเภอศีรษะทอง จังหวัดนครปฐม 11111",
  });

  const [charmData, setCharmData] = useState({
    name: "",
    material: "",
    model: "",
    price: "",
  });

  const handleChange = (e) => {
    setTempleData({ ...templeData, [e.target.name]: e.target.value });
  };

  const handleCharmChange = (e) => {
    setCharmData({ ...charmData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "desc") {
        setDescImage(imageUrl);
      } else if (type === "charm") {
        setCharmImage(imageUrl);
      }
    }
  };

  const handleDeleteImage = (type) => {
    if (type === "desc") {
      setDescImage(null);
    } else if (type === "charm") {
      setCharmImage(null);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white p-6">
      <div className="w-full max-w-5xl p-6">
        
        {/* ชื่อวัด */}
        <div className="flex items-center space-x-2 mb-4">
          <FaPencilAlt className="text-2xl text-black" />
          <input
            type="text"
            name="name"
            value={templeData.name}
            onChange={handleChange}
            className="text-2xl font-bold text-black border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* ส่วนของ Description */}
        <div className="flex space-x-6">
          {/* รูปภาพ Description */}
          <label className="w-64 h-40 bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer border border-gray-400">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "desc")} />
            {descImage ? (
              <img src={descImage} alt="Description Upload" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-3xl text-gray-600">+</span>
            )}
          </label>

          {/* คำอธิบายและที่อยู่ */}
          <div className="text-black text-sm w-full">
            <h2 className="font-bold">คำอธิบาย</h2>
            <textarea
              name="description"
              value={templeData.description}
              onChange={handleChange}
              className="w-full h-24 p-2 border rounded-lg text-black text-sm mt-1 focus:outline-none focus:border-blue-500"
            ></textarea>
            <p className="text-gray-700 mt-2">
              <strong>ที่อยู่:</strong>
            </p>
            <input
              type="text"
              name="address"
              value={templeData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-black text-sm mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* เมนูแท็บ */}
        <div className="mt-6 border-b">
          <div className="flex justify-center space-x-12 text-gray-600">
            {["Activity", "Charm", "Picture"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${selectedTab === tab ? "border-b-2 border-black font-bold text-black" : ""}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ปุ่ม Add Charm */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-[#FF9800] text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600"
            onClick={() => setShowAddCharmPopup(true)}
          >
            Add Charm
          </button>
        </div>

        {/* Popup Add Charm */}
        {showAddCharmPopup && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full text-center">
              <button className="absolute top-2 right-2 text-gray-700" onClick={() => setShowAddCharmPopup(false)}>
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold text-[#44AFB6]">Add Charm Temple</h2>

              {/* อัปโหลดรูป Charm */}
              <label className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer mt-4">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "charm")} />
                {charmImage ? (
                  <img src={charmImage} alt="Charm Upload" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-3xl text-gray-600">+</span>
                )}
              </label>

              {/* ปุ่ม Edit / Delete */}
              <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-[#44AFB6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700" onClick={() => handleDeleteImage("charm")}>
                  Delete
                </button>
              </div>

              {/* ฟิลด์ข้อมูล Charm */}
              <div className="mt-4 text-left">
                <label className="block font-bold">ชื่อ:</label>
                <input type="text" name="name" value={charmData.name} onChange={handleCharmChange} className="w-full p-2 border rounded-lg text-sm" />
                <label className="block font-bold mt-2">เนื้อพระ:</label>
                <input type="text" name="material" value={charmData.material} onChange={handleCharmChange} className="w-full p-2 border rounded-lg text-sm" />
                <label className="block font-bold mt-2">รุ่นพระ:</label>
                <input type="text" name="model" value={charmData.model} onChange={handleCharmChange} className="w-full p-2 border rounded-lg text-sm" />
                <label className="block font-bold mt-2">ราคา:</label>
                <input type="text" name="price" value={charmData.price} onChange={handleCharmChange} className="w-full p-2 border rounded-lg text-sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempleDetail;
