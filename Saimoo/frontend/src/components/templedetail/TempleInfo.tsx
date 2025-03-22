import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { FaRegEdit } from "react-icons/fa";

export type TempleData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  provinceId: number;
  Province: {
    id: number;
    name: string;
  };
  Temple: {
    id: number;
    description: string;
    likes: number;
    locationId: number;
  }[];
};

export type TempleFront = {
  id: number;
  imagePath: string;
  description: string;
  templeId: number;
}

export type TempleDisplayData = {
  id: number;
  name: string;
  description: string;
  likes: number;
  province: string;
  latitude: number;
  longitude: number;
  locationId: number;
  templeId: number;
};

const TempleInfo = () => {
  const [temple, setTemple] = useState<TempleData[]>([]);
  const [templeData, setTempleData] = useState({
    name: "",
    description: "",
    province: ""
  });
  const [descImage, setDescImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/temples");
        const data = res.data.data;
        setTemple(
          data.map((v) => ({
            id: v.id,
            name: v.name,
            latitude: v.latitude,
            longitude: v.longitude,
            type: v.type,
            provinceId: v.provinceId,
            Province: {
              id: v.Province.id,
              name: v.Province.name,
            },
            Temple: v.Temple.map((t) => ({
              id: t.id,
              description: t.description,
              likes: t.likes,
              locationId: t.locationId,
            })),
          }))
        );
        
        // Set initial temple data if available
        if (data.length > 0) {
          setTempleData({
            name: data[0].name,
            description: data[0].Temple[0]?.description || "",
            province: data[0].Province.name
          });
        }
      } catch (error) {
        console.error("Error fetching temples:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full p-6">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center">
            <input
              type="text"
              name="name"
              value={templeData.name}
              onChange={handleChange}
              className="text-4xl font-bold text-black border-none focus:outline-none w-auto text-center leading-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 items-start">
          
          <div className="flex flex-col items-center w-full">
            <label className="w-full max-w-[350px] min-h-[220px] bg-gray-300 flex items-center justify-center rounded-lg border border-gray-400 overflow-hidden cursor-pointer aspect-[4/3]">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setDescImage(URL.createObjectURL(file));
                }
              }} />
              {descImage ? (
                <img src={descImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-600 text-3xl">+</span>
              )}
            </label>
          </div>

          <div className="text-black w-full">
            <h2 className="text-xl font-semibold mt-2">คำอธิบาย</h2>
            <textarea
              name="description"
              value={templeData.description}
              onChange={handleChange}
              className="w-full min-h-[180px] max-h-[350px] p-4 border rounded-lg text-lg mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>

            <h2 className="text-xl font-semibold mt-4">จังหวัด</h2>
            <input
              type="text"
              name="province"
              value={templeData.province}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg text-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleInfo;
