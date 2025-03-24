import { useState, useRef } from 'react';
import { XMarkIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import {  useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CardComponent = ({
    id,
    initialTitle = '',
    initialDescription = '',
    images = [],
    onDelete,
    onSelectLocation
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [time, setTime] = useState('');
    const [imageList, setImageList] = useState(images);
    const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : null);
    const fileInputRef = useRef(null);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newImages = files.map(file => {
            return URL.createObjectURL(file as Blob);
        });

        setImageList(prevImages => [...prevImages, ...newImages]);
        if (!selectedImage && newImages.length > 0) {
            setSelectedImage(newImages[0]);
        }

        // Reset the file input
        e.target.value = null;
    };

    // Trigger file input click
    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };

    // const handleImageDelete = (imageToDelete) => {
    //     const newImageList = imageList.filter(image => image !== imageToDelete);
    //     setImageList(newImageList);

    //     if (selectedImage === imageToDelete) {
    //         setSelectedImage(newImageList.length > 0 ? newImageList[0] : null);
    //     }
    // };

    return (
        <div 
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className="active:cursor-grabbing cursor-grab relative mb-4 w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <button
                onClick={onDelete}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
                aria-label="Delete"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="pb-0 p-5">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="เพิ่มหัวข้อ"
                    className="w-full font-bold text-xl mb-3 text-gray-800 border-b border-transparent focus:border-gray-300 focus:outline-none py-1"
                />

                <div className='flex flex-row gap-4'>
                    <div className='w-3/4'>
                        <button
                        onClick={onSelectLocation}
                        className="cursor-pointer flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-4"
                        >
                        <MapPinIcon className="h-5 w-5 mr-2" />
                            เลือกสถานที่
                        </button>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="เพิ่มคำอธิบาย"
                            rows={3}
                            className="w-full text-gray-600 mb-4 border border-gray-200 rounded-md p-2 focus:border-blue-400 focus:outline-none resize-none"
                        />
                    </div>
                    <div>
                        <div className="flex flex-row items-center">
                            <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                            <input
                                type="datetime-local"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
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
                            onClick={() => handleImageClick(image)}
                            className={`relative cursor-pointer rounded-md overflow-hidden flex-shrink-0 transition-all ${selectedImage === image ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-16 w-16 object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"
                            ></div>
                        </div>
                    ))}

                    <div
                        className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400 flex-shrink-0"
                        onClick={handleAddImageClick}
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
        </div>
    );
};

export default CardComponent;