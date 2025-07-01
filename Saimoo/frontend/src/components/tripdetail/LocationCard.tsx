import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import ImageGallery from "./ImageGallery";

const LocationCard = ({ location, index, openImageModal }) => {
  return (
    <li className="relative pl-3 my-8">
      <div className="absolute -left-[18px] top-4 transform -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white font-bold">
        {index + 1}
      </div>
      <div className="ml-3">
        <h2 className="font-bold text-gray-800 items-center gap-3 flex">
          <FaMapMarkerAlt className="text-red-500" /> {location.name}
        </h2>
        {location.address && <p className="text-gray-600 text-sm">{location.address}</p>}
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <FaClock /> {location.time}
        </p>
        <p className="text-gray-600 text-sm mt-2 ml-8">{location.description}</p>
      </div>
      <ImageGallery images={location.images} openImageModal={openImageModal} />
    </li>
  );
};

export default LocationCard;
