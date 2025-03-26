import { useState, useRef } from 'react';
import { XMarkIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LocationModal from './LocationModal';
import { getFile, sendFile } from '@/services/fileupload';

const TripDetails = ({
    id,
    title = '',
    initialDescription = '',
    initialArriveTime = '',
    images = [],
    location,
    onDelete,
    onUpdate
}) => {
    const [description, setDescription] = useState(initialDescription);
    const [time, setTime] = useState(initialArriveTime);
    const [imageList, setImageList] = useState<string[]>(images);
    const fileInputRef = useRef(null);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isOpenLocationModal, setIsOpenLocationModal] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newImages = await Promise.all(files.map(async (file: File) => {
            return (await sendFile(file)).file.path;
        }));
        const updated = [...imageList, ...newImages];
        setImageList(updated);
        onUpdate(id, { TripDetailPicture: { imagePath: updated } });
        e.target.value = null;
    };

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className="relative mb-4 w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <button
                onClick={() => onDelete(id)}
                className="cursor-pointer absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 z-2"
                aria-label="Delete"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="pb-0 p-5">
                <input
                    type="text"
                    value={title}
                    readOnly
                    className="w-full font-bold text-xl mb-3 text-gray-800 border-b border-transparent focus:border-gray-300 focus:outline-none py-1"
                />

                <div className="flex flex-col md:flex-row md:gap-4 max-sm:mb-4">
                    <div className="w-full md:w-3/4">
                        {
                            location ? (
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                                    <span className="text-gray-600">{location.name}</span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsOpenLocationModal(true)}
                                    className="cursor-pointer flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-4"
                                >
                                    <MapPinIcon className="h-5 w-5 mr-2" />
                                    เลือกสถานที่
                                </button>
                            )
                        }

                        <textarea
                            value={description}
                            onChange={(e) => {
                                const value = e.target.value;
                                setDescription(value);
                                onUpdate(id, { description: value });
                            }}
                            placeholder="เพิ่มคำอธิบาย"
                            rows={3}
                            className="w-full text-gray-600 mb-4 border border-gray-200 rounded-md p-2 focus:border-blue-400 focus:outline-none resize-none"
                        />
                    </div>

                    <div {...attributes} {...listeners} className="cursor-move">
                        <div className="flex flex-row items-center">
                            <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                            <input
                                type="datetime-local"
                                value={time}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setTime(value);
                                    onUpdate(id, { arriveTime: value });
                                }}
                                className="border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-2 p-4 overflow-x-auto">
                <div className="flex space-x-2">
                    {imageList.map((image, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer rounded-md overflow-hidden flex-shrink-0 transition-all"
                        >
                            <img
                                src={getFile(image)}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-16 w-16 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                        </div>
                    ))}

                    <div
                        className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400 flex-shrink-0"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>
            <LocationModal 
                tripDetailId={id} 
                isOpen={isOpenLocationModal} 
                setIsOpen={setIsOpenLocationModal}
                onUpdate={onUpdate}
            />
        </div>

    );
};

export default TripDetails;
