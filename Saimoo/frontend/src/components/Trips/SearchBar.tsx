import { FaSearch, FaFilter } from "react-icons/fa";

const SearchBar = ({ search, setSearch, selectedSort, setSelectedSort }) => {
  const sortOptions = [
    { value: "lastest", label: "ใหม่ล่าสุด" },
    { value: "paid", label: "แบบเสียตัง" },
    { value: "free", label: "แบบฟรี" },
  ];

  return (
    <div className="flex items-center justify-between gap-4 p-4 w-full max-w-4xl mx-auto ">
      {/* Search Input */}
      <div className="relative flex-1">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          id="search"
          className="w-full p-3 pl-12 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ค้นหาสถานที่ที่ต้องการ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2 p-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          onClick={() => document.getElementById("sortDropdown").classList.toggle("hidden")}
        >
          <FaFilter className="text-gray-500" />
          {sortOptions.find((opt) => opt.value === selectedSort)?.label || "ใหม่ล่าสุด"}
        </button>

        {/* Dropdown Options */}
        <div
          id="sortDropdown"
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg hidden"
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className="cursor-pointer block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedSort(option.value);
                document.getElementById("sortDropdown").classList.add("hidden");
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
