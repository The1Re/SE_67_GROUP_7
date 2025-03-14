import { useState } from "react";
import TempleCard from "../../components/ฺbrowsetemple/TempleCard";
import watpha from "../../assets/watpha.jpg";
import watnakhon from "../../assets/watnakhon.jpg";
import watchai from "../../assets/watchai.jpg";
import watarun from "../../assets/watarun.jpg";
import watjai from "../../assets/watjai.jpg";
import SearchBar from "@/components/Trips/SearchBar";

const tripsData = [
  { id: 1, title: "วัดพระธาตุช่อแฮ", description: "1 หมู่ 11 ตำบล ช่อแฮ อำเภอเมืองแพร่ แพร่ 54000", imageUrl: watpha, category: "popular" },
  { id: 2, title: "องค์พระปฐมเจดีย์", description: "27 ถนน เทศา ตำบลพระปฐมเจดีย์ อำเภอเมืองนครปฐม นครปฐม 73000", imageUrl: watnakhon, category: "new" },
  { id: 3, title: "วัดไชยธาราราม", description: "70 หมู่ 6 ถนนเจ้าฟ้าตะวันตก ฉลอง เมืองภูเก็ต ภูเก็ต 83130", imageUrl: watchai, category: "recommended" },
  { id: 4, title: "วัดพระแก้ว", description: "กรุงเถนน หน้าพระลาน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200ทพฯ", imageUrl: watarun, category: "popular" },
  { id: 5, title: "วัดอรุณราชวราราม", description: "เลขที่ 34 ถนนวังเดิม แขวงวัดอรุณ · เขตบางกอกใหญ่ กรุงเทพมหานคร 10600", imageUrl: watjai, category: "new" },
];

const BrowseTempleWithGuest = () => {
  const [filteredTrips] = useState(tripsData);

  // const handleSearch = (searchTerm) => {
  //   const filtered = tripsData.filter((trip) =>
  //     trip.title.includes(searchTerm) || trip.description.includes(searchTerm)
  //   );
  //   setFilteredTrips(filtered);
  // };

  // const handleFilter = (filter) => {
  //   if (!filter) {
  //     setFilteredTrips(tripsData);
  //     return;
  //   }
  //   const filtered = tripsData.filter((trip) => trip.category === filter);
  //   setFilteredTrips(filtered);
  // };

  return (
    <div className="bg-white min-h-screen text-gray-500">
      <SearchBar search="" setSearch={() => {}} selectedSort="recommended" setSelectedSort={() => {}} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTrips.map((trip) => (
          <TempleCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default BrowseTempleWithGuest;
