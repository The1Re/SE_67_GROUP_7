import api from "@/api";
import { env } from "@/config";
import React, { useRef, useState } from "react";
import DataLoading from "@/components/DataLoading"; // ✅ เพิ่ม

interface FileUploadProps {
  label: string;
  callback: (fileUrl: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, callback }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // ✅ state โหลด

  const sendFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true); // 👉 เริ่มโหลด

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const data = response.data.file;
        setFileName(file.name);
        setFileUrl(data.path);
        callback(data.path);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // ✅ หยุดโหลด
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // เพิ่มบรรทัดนี้เพื่อส่ง URL กลับไปยัง parent
      callback(url);
    }
  };

  return (
    <div className="mb-3 flex flex-col">
      <label className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>

      {isLoading ? ( // ✅ ถ้าโหลดให้แสดง DataLoading
        <DataLoading />
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded shadow-md text-sm cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            choose file
          </button>
          {fileName && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">{fileName}</span>
              {fileUrl && (
                <a
                  href={env.API_URL + "/" + fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm hover:underline cursor-pointer"
                >
                  ดูไฟล์
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
