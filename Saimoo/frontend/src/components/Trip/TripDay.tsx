import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import { DropResult } from "react-beautiful-dnd";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ กำหนดโครงสร้างของข้อมูล Location (แต่ละสถานที่)
interface Location {
    id: string;
    name?: string;
    address?: string;
    lat?: number;  // 🌍 พิกัดละติจูด
    lng?: number;  // 📍 พิกัดลองจิจูด
    images: string[];
    thumbnail?: string | null;
    description?: string;
    time?: string;
}

const TripDay = ({ startDate, endDate, setLocations, days, setDays }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [popupLocation, setPopupLocation] = useState(null);
    const [customLocation, setCustomLocation] = useState({ name: "", address: "", lat: "", lng: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const hasInitialized = useRef(false);
    const isNavigatingBack = useRef(false);
    const daysRef = useRef(days);
    
    useEffect(() => {
        daysRef.current = days;
    }, [days]);
    
    // ✅ รวมโลจิกการโหลดจาก sessionStorage ให้เป็นฟังก์ชั่นเดียว
    useEffect(() => {
        // Only run this when coming back from temple selection
        if (location.state?.fromTemple) {
            const savedTemple = sessionStorage.getItem("selectedTemple");
            if (savedTemple) {
                try {
                    const selectedTemple = JSON.parse(savedTemple);
                    
                    // Make a deep copy of days to avoid reference issues
                    setDays(prevDays => {
                        const newDays = JSON.parse(JSON.stringify(prevDays));
                        
                        // Find the day matching activeTab
                        const dayIndex = newDays.findIndex(day => day.id === activeTab);
                        if (dayIndex !== -1) {
                            // Add temple to the locations array
                            newDays[dayIndex].locations.push({
                                id: `${activeTab}-temple-${Date.now()}`,
                                name: selectedTemple.name,
                                address: selectedTemple.address || "",
                                lat: selectedTemple.lat,
                                lng: selectedTemple.lng,
                                images: [],
                                thumbnail: null,
                                description: "",
                                time: "",
                            });
                        }
                        
                        return newDays;
                    });
                    
                    // Clear the temple data after adding it
                    sessionStorage.removeItem("selectedTemple");
                } catch (err) {
                    console.error("❌ ไม่สามารถเพิ่มวัดได้", err);
                }
            }
        }
    }, [location.state, activeTab,setDays]);
    
    // ✅ อัปเดต locations เมื่อ activeTab หรือ days เปลี่ยน
    useEffect(() => {
        const currentDay = days.find(day => day.id === activeTab);
        if (!currentDay) return;
        
        const updatedLocations = currentDay.locations
            .filter((loc: Location) => loc.lat !== undefined && loc.lng !== undefined)
            .map((loc: Location) => ({
                key: loc.name ?? "ไม่ระบุชื่อ",
                location: { lat: loc.lat!, lng: loc.lng! }
            }));
            
        setLocations(updatedLocations);
    }, [activeTab, days, setLocations]);
    
    // ✅ จัดการเพิ่มวัดจาก sessionStorage
    useEffect(() => {
        if (!hasInitialized.current) return;
        
        const savedTemple = sessionStorage.getItem("selectedTemple");
        if (!savedTemple) return;
        
        try {
            const selectedTemple = JSON.parse(savedTemple);
            
            // เพิ่มวัดเข้าไปใน day ที่เลือก
            setDays((prevDays) => {
                // สร้าง array ใหม่เพื่อไม่ให้มีการ mutate state เดิม
                return prevDays.map((day) => {
                    if (day.id === activeTab) {
                        return {
                            ...day,
                            locations: [
                                ...day.locations,
                                {
                                    id: `${day.id}-temple-${Date.now()}`,
                                    name: selectedTemple.name,
                                    address: selectedTemple.address || "",
                                    lat: selectedTemple.lat,
                                    lng: selectedTemple.lng,
                                    images: [],
                                    thumbnail: null,
                                    description: "",
                                    time: "",
                                },
                            ],
                        };
                    }
                    return day;
                });
            });
            
            // ลบข้อมูลวัดจาก sessionStorage หลังจากใช้งานเสร็จ
            sessionStorage.removeItem("selectedTemple");
        } catch (err) {
            console.error("❌ ไม่สามารถเพิ่มวัดได้", err);
        }
    }, [activeTab, setDays]);
    
    // ✅ บันทึก days ไปยัง sessionStorage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        if (days.length === 0) {
            console.warn("⚠️ days ว่าง ไม่บันทึกลง sessionStorage");
            return;
        }
        
        // บันทึกข้อมูลลง sessionStorage
        console.log("📦 บันทึก days ลง sessionStorage:", days);
        sessionStorage.setItem("tripDays", JSON.stringify(days));
    }, [days]);
    
    // ✅ เก็บสถานะการนำทางเมื่อจะไปเลือกวัด
    const goToBrowseTemple = (dayId, locId) => {
        // บันทึกสถานะปัจจุบันก่อนนำทางไปหน้าอื่น
        sessionStorage.setItem("currentFormState", JSON.stringify({
            activeTab,
            popupLocation: { dayId, locId }
        }));
        
        // นำทางไปยังหน้าเลือกวัด
        navigate("/browse-temple", {
            state: {
                fromTripDay: true,
                dayId,
                locId,
            }
        });
    };
    
    // ✅ โหลดสถานะกลับมาเมื่อกลับจากหน้าเลือกวัด
    useEffect(() => {
        if (isNavigatingBack.current) {
            try {
                const savedState = sessionStorage.getItem("currentFormState");
                if (savedState) {
                    const { activeTab: savedTab } = JSON.parse(savedState);
                    setActiveTab(savedTab);
                    sessionStorage.removeItem("currentFormState");
                }
            } catch (err) {
                console.error("❌ ไม่สามารถโหลดสถานะฟอร์มกลับมาได้", err);
            }
            
            isNavigatingBack.current = false;
        }
    }, [location]);
    
    const addLocation = (dayId) => {
        setDays(prevDays => 
            prevDays.map(day => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        locations: [
                            ...day.locations,
                            { id: `${day.id}-loc${day.locations.length + 1}`, type: "location", images: [], thumbnail: null, description: "", time: "" }
                        ]
                    };
                }
                return day;
            })
        );
    };
    
    const handleUploadImage = (event, dayId, locId, index = null, isThumbnail = false) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setDays(days.map(day => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        locations: day.locations.map(loc => {
                            if (loc.id === locId) {
                                if (isThumbnail) {
                                    // 📌 อัปเดตรูปภาพหลัก (thumbnail)
                                    return { ...loc, thumbnail: reader.result };
                                } else if (index !== null) {
                                    // 📌 เปลี่ยนรูปภาพในอาร์เรย์
                                    const newImages = [...loc.images];
                                    newImages[index] = reader.result;
                                    return { ...loc, images: newImages };
                                } else {
                                    // 📌 เพิ่มรูปภาพใหม่เข้าไป
                                    return { ...loc, images: [...loc.images, reader.result] };
                                }
                            }
                            return loc;
                        })
                    };
                }
                return day;
            }));
        };
        reader.readAsDataURL(file);
    };
    
    const handleDeleteImage = (dayId, locId, index) => {
        setDays(days.map(day => {
            if (day.id === dayId) {
                return {
                    ...day,
                    locations: day.locations.map(loc => {
                        if (loc.id === locId) {
                            return { ...loc, images: loc.images.filter((_, i) => i !== index) };
                        }
                        return loc;
                    })
                };
            }
            return day;
        }));
    };

    const handleInputChange = (dayId, locId, field, value) => {
        setDays(days.map(day => {
            if (day.id === dayId) {
                return {
                    ...day,
                    locations: day.locations.map(loc => loc.id === locId ? { ...loc, [field]: value } : loc)
                };
            }
            return day;
        }));
    };
    
    const handleSelectLocationType = (dayId, locId, type) => {
        if (type === "สถานที่อื่นๆ") {
            setPopupLocation({ dayId, locId, type: "custom" });
        } else {
            setDays(days.map(day => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        locations: day.locations.map(loc => loc.id === locId ? { ...loc, name: type } : loc)
                    };
                }
                return day;
            }));
            setPopupLocation(null);
        }
    };

    const handleSaveCustomLocation = () => {
        if (!customLocation.name.trim() || !customLocation.address.trim() || !customLocation.lat.trim() || !customLocation.lng.trim()) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, ที่อยู่, ละติจูด, ลองจิจูด)");
            return;
        }
    
        const latitude = Number(customLocation.lat);
        const longitude = Number(customLocation.lng);
    
        if (isNaN(latitude) || isNaN(longitude)) {
            alert("❌ กรุณากรอกพิกัดให้ถูกต้อง (ตัวเลขเท่านั้น)");
            return;
        }
    
        setDays(days.map(day => {
            if (day.id === popupLocation.dayId) {
                return {
                    ...day,
                    locations: day.locations.map(loc =>
                        loc.id === popupLocation.locId
                            ? { ...loc, name: customLocation.name, address: customLocation.address, lat: latitude, lng: longitude }
                            : loc
                    )
                };
            }
            return day;
        }));
    
        // ✅ อัปเดต locations ให้ MyMap
        setLocations((prev) => [
            ...prev,
            { key: customLocation.name, location: { lat: latitude, lng: longitude } }
        ]);
    
        setPopupLocation(null);
        setCustomLocation({ name: "", address: "", lat: "", lng: "" });
    };
    
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
    
        const dayId = parseInt(result.source.droppableId.split("-")[1]);
        const updatedDays = days.map(day => {
            if (day.id === dayId) {
                const items = Array.from(day.locations);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
    
                // ✅ ตรวจสอบ `lat` และ `lng` ก่อนอัปเดต
                const updatedLocations = items
                    .filter((loc: Location) => loc.lat !== undefined && loc.lng !== undefined)
                    .map((loc: Location) => ({
                        key: loc.name ?? "ไม่ระบุชื่อ",
                        location: { lat: loc.lat!, lng: loc.lng! }
                    }));
    
                console.log("📌 อัปเดต locations:", updatedLocations);
    
                setLocations([...updatedLocations]); // ✅ บังคับให้ `setLocations` รีเรนเดอร์ใหม่
    
                return { ...day, locations: items };
            }
            return day;
        });
    
        setDays(updatedDays);
    };

    const removeLocation = (dayId, locId) => {
        setDays(prevDays =>
            prevDays.map(day => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        locations: day.locations.filter(loc => loc.id !== locId) // ลบสถานที่ที่ตรงกับ locId
                    };
                }
                return day;
            })
        );
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="flex space-x-2 mb-4 overflow-x-auto">
            <div className="flex flex-nowrap">
                {days.map((day) => (
                <button
                    key={day.id}
                    className={`cursor-pointer px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
                    activeTab === day.id ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setActiveTab(day.id)}
                >
                    Day {day.id}
                </button>
                ))}
            </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                {days.map((day) => (
                    activeTab === day.id && (
                        <Droppable key={day.id} droppableId={`droppable-${day.id}`}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-md">
                                    {day.locations && day.locations.map((location, index) => (
                                        <Draggable key={location.id} draggableId={location.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="p-4 bg-gray-200 rounded-lg shadow-md"
                                                >
                                                    <p className="font-bold">
                                                        {day.id === 1 && index === 0 ? "จุดนัดพบ" : "สถานที่"}
                                                    </p>
                                                    <div 
                                                        className="w-full p-3 bg-gray-300 text-center rounded-lg cursor-pointer"
                                                        onClick={() => setPopupLocation({ dayId: day.id, locId: location.id })}
                                                    >
                                                        <p className="font-bold">{location.name || "เลือกสถานที่"}</p>
                                                        {location.address && <p className="text-sm text-gray-600 mt-1">{location.address}</p>}
                                                    </div>
                                                    <textarea 
                                                        placeholder="คำอธิบาย" 
                                                        value={location.description} 
                                                        onChange={(e) => handleInputChange(day.id, location.id, 'description', e.target.value)}
                                                        onInput={(e) => {
                                                            const target = e.target as HTMLTextAreaElement; // ✅ บอก TypeScript ว่าเป็น textarea
                                                            target.style.height = "auto"; // รีเซ็ตความสูงก่อนคำนวณใหม่
                                                            target.style.height = `${target.scrollHeight}px`; // ปรับขนาดอัตโนมัติ
                                                        }} 
                                                        className="mt-2 p-2 border rounded-lg w-full resize-none overflow-hidden"
                                                        style={{ minHeight: "50px", height: "auto" }}
                                                    />
                                                    <input 
                                                        type="time" 
                                                        value={location.time} 
                                                        onChange={(e) => handleInputChange(day.id, location.id, 'time', e.target.value)} 
                                                        className="mt-2 p-2 border rounded-lg w-full"
                                                    />
                                                    <div className="mt-2 flex space-x-2 overflow-x-auto">
                                                        {location.images.map((img, i) => (
                                                            <div key={i} className="relative">
                                                                <img 
                                                                    src={img} 
                                                                    alt={`img-${i}`} 
                                                                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                                                    onClick={() => setSelectedImage(img)}
                                                                />
                                                                <input 
                                                                    type="file" 
                                                                    id={`edit-image-${day.id}-${location.id}-${i}`} 
                                                                    className="hidden" 
                                                                    onChange={(e) => handleUploadImage(e, day.id, location.id, i)}
                                                                />
                                                                <label 
                                                                    htmlFor={`edit-image-${day.id}-${location.id}-${i}`} 
                                                                    className="absolute top-0 left-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                                                                >
                                                                    ✎
                                                                </label>
                                                                <button 
                                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                                    onClick={() => handleDeleteImage(day.id, location.id, i)}
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <label className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer">
                                                            <span>+</span>
                                                            <input type="file" className="hidden" onChange={(e) => handleUploadImage(e, day.id, location.id)} />
                                                        </label>
                                                    </div>
                                                    <button
                                                        onClick={() => removeLocation(day.id, location.id)} // 🔥 ปุ่มลบสถานที่
                                                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg"
                                                    >
                                                        ลบ
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => addLocation(day.id)}>+ เพิ่มสถานที่</button>
                                </div>
                            )}
                        </Droppable>
                    )
                ))}
            </DragDropContext>
            {selectedImage && (
                <Modal 
                    isOpen={!!selectedImage} 
                    onRequestClose={() => setSelectedImage(null)} 
                    overlayClassName="fixed inset-0 flex items-center justify-center backdrop-blur-md"
                    className="relative bg-white rounded-lg p-4 shadow-lg w-[60vw] max-w-[90%] h-auto max-h-[90%] flex items-center justify-center"
                >
                    <img 
                        src={selectedImage} 
                        alt="preview" 
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <button 
                        className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                        onClick={() => setSelectedImage(null)}
                    >
                        ✕
                    </button>
                </Modal>
            )}
            {popupLocation && (
                <Modal
                    isOpen={!!popupLocation}
                    onRequestClose={() => setPopupLocation(null)}
                    className="bg-white rounded-lg p-6 shadow-lg w-80 text-center"
                    overlayClassName="fixed inset-0 flex items-center justify-center backdrop-blur-md"
                >
                    <h2 className="mb-4">เลือกประเภทสถานที่</h2>
                    <button 
                        className="w-full p-3 bg-blue-400 rounded-lg text-white mb-2" 
                        onClick={() => goToBrowseTemple(popupLocation.dayId, popupLocation.locId)}
                    >
                        วัด
                    </button>
                    <button 
                        className="w-full p-3 bg-gray-400 rounded-lg text-white" 
                        onClick={() => handleSelectLocationType(popupLocation.dayId, popupLocation.locId, "สถานที่อื่นๆ")}
                    >สถานที่อื่นๆ</button>
                    <button className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-8 h-8" onClick={() => setPopupLocation(null)}>✕</button>
                </Modal>
            )}
            {popupLocation?.type === "custom" && (
                <Modal
                    isOpen={popupLocation?.type === "custom"}
                    onRequestClose={() => setPopupLocation(null)}
                    className="bg-white rounded-lg p-6 shadow-lg w-80 text-center"
                    overlayClassName="fixed inset-0 flex items-center justify-center backdrop-blur-md"
                >
                    <h2 className="mb-4">เพิ่มสถานที่</h2>
                    <input
                        type="text"
                        placeholder="ชื่อสถานที่"
                        value={customLocation.name}
                        onChange={(e) => setCustomLocation({ ...customLocation, name: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="ที่ตั้ง"
                        value={customLocation.address}
                        onChange={(e) => setCustomLocation({ ...customLocation, address: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="ละติจูด (Latitude)"
                        value={customLocation.lat}
                        onChange={(e) => setCustomLocation({ ...customLocation, lat: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="ลองจิจูด (Longitude)"
                        value={customLocation.lng}
                        onChange={(e) => setCustomLocation({ ...customLocation, lng: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-4"
                    />
                    <button 
                        className="w-full p-3 bg-green-500 text-white rounded-lg mb-2"
                        onClick={handleSaveCustomLocation}
                    >บันทึก</button>
                    <button className="w-full p-3 bg-gray-500 text-white rounded-lg" onClick={() => setPopupLocation(null)}>ยกเลิก</button>
                </Modal>
            )}
        </div>
    );
};

export default TripDay;