import { useState } from "react";

const UploadImage = () => {
    const [imageURL, setImageURL] = useState<string | null>(null); // ใช้เฉพาะ URL

    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageURL(URL.createObjectURL(file)); // ใช้ URL เท่านั้น
        }
    }

    return (
        <div className="w-full h-[400px] md:h-[400px] bg-gray-100 flex items-center justify-center rounded-lg relative overflow-hidden">
            {/* พื้นหลังเบลอ */}
            {imageURL && (
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-md opacity-50"
                    style={{ backgroundImage: `url(${imageURL})` }}
                ></div>
            )}

            {/* ถ้ายังไม่มีภาพ ให้แสดงปุ่ม + */}
            {!imageURL ? (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer relative">
                    <span className="text-4xl text-gray-500">+</span>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onImageChange} 
                        className="hidden"
                    />
                </label>
            ) : (
                <div className="w-full h-full flex items-center justify-center relative">
                    <img 
                        src={imageURL} 
                        alt="preview" 
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    {/* ปุ่มแก้ไขรูป */}
                    <label className="absolute bottom-2 left-2 bg-white p-2 text-sm shadow-md rounded cursor-pointer">
                        แก้ไข
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={onImageChange} 
                            className="hidden"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
