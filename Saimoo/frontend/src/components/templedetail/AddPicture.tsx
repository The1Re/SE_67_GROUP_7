import { useState, useEffect } from "react";
import api from "@/api";
import { env } from "@/config";

interface Picture {
  id?: number;
  templeId: number;
  imagePath: string;
  description?: string;
}

interface AddPictureProps {
  show: boolean;
  onClose: () => void;
  onSave: (picture: Picture) => void;
  onDelete: (id: number) => void;
  imageToEdit: Picture | null;
  callback: (path: string) => void;
}

const AddPicture: React.FC<AddPictureProps> = ({ 
  show, 
  onClose, 
  onSave, 
  imageToEdit, 
  onDelete, 
  callback 
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(imageToEdit?.imagePath || null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [description, setDescription] = useState<string>(imageToEdit?.description || "");

  const sendFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);

      if (response.status === 200) {
        const data = response.data.file;
        console.log("File data:", data);
        if (data && data.path) {
          setImageUrl(data.path);
          callback(data.path);
        } else {
          console.error("Invalid response format - missing path:", data);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  if (!show) return null;

  // Reset state when editing a different image
  useEffect(() => {
    setImageUrl(imageToEdit?.imagePath || null);
    setDescription(imageToEdit?.description || "");
  }, [imageToEdit]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      sendFile(event.target.files[0]);
    }
  };

  const handleDelete = () => {
    if (imageToEdit) {
      console.log("กำลังลบรูป:", imageToEdit);
      onDelete(imageToEdit.id); // Pass just the ID instead of the whole Picture object
      setImageUrl(null);
      setConfirmDelete(false);
      onClose();
    }
  };
  const handleSave = () => {
    if (imageUrl) {
      const pictureData: Picture = {
        id: imageToEdit?.id,
        templeId: imageToEdit?.templeId || 0, // You might want to pass templeId as a prop
        imagePath: imageUrl,
        description: description
      };
      onSave(pictureData);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#44AFB6]">
          {imageToEdit ? "Edit Picture" : "Add Picture"}
        </h2>

        <label className="w-full flex justify-center items-center bg-gray-300 rounded-lg cursor-pointer mt-4 overflow-hidden relative">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          {imageUrl ? (
            <img
              src={env.API_URL + "/" + imageUrl}
              alt="Uploaded"
              className="w-auto h-auto max-h-[500px] max-w-full object-contain aspect-auto rounded-lg"
            />
          ) : (
            <span className="text-4xl text-gray-600">+</span>
          )}
        </label>

        <div className="flex justify-center space-x-4 mt-6">
          {imageToEdit && (
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 text-lg cursor-pointer"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          )}
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-700 text-lg cursor-pointer"
            onClick={handleSave}
            disabled={!imageUrl}
          >
            {imageToEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this picture?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPicture;
