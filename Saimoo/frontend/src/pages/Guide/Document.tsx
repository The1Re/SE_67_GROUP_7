import React, { useEffect, useState } from "react";
import Table from "@/components/Tableguide/Table";
import TableHeader from "@/components/Tableguide/TableHeader";
import TableRow from "@/components/Tableguide/TableRow";
import TableCell from "@/components/Tableguide/TableCell";
import Button from "@/components/Tableguide/Button";
import Header from "@/components/Tableguide/Header";
import SubmitPopup from "@/pages/Guide/SubmitPop";
import { useParams } from "react-router-dom";
import axios from "axios";

// ✅ Define button type to enforce type safety
type ButtonType = "refresh" | "form-code";

// ✅ Interface สำหรับข้อมูลที่ดึงจาก API
interface Document {
  id: number;
  name: string;
  date: string;
  buttonType: ButtonType;
}

// ✅ URL API
const API_BASE_URL = "https://rkhgjh4q-3000.asse.devtunnels.ms/api";

// ✅ ฟังก์ชันหลัก
const DocumentPage = () => {
  const { tripId } = useParams<{ tripId: string }>(); // 📚 ดึง tripId จาก URL

  // ✅ แสดง tripId ใน console
  console.log("🔍 ค่า tripId ที่ได้จาก URL:", tripId);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [tripTitle, setTripTitle] = useState<string>(""); // ✅ เก็บชื่อทริป
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchTripDetails = async () => {
      console.log(`🚀 กำลังดึงข้อมูลสำหรับ tripId: ${tripId}`);
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/trips/${tripId}`);
        console.log("✅ ข้อมูลที่ได้จาก API:", response.data);

        // ✅ ตรวจสอบว่าข้อมูลมีค่า
        if (response.data && response.data.User && response.data.dateStart) {
          const tripData = response.data;

          // ✅ ตั้งค่า title ของทริปใน Header
          setTripTitle(tripData.title || "ไม่พบข้อมูลทริป");

          // ✅ แปลงข้อมูลเป็น Document
          const formattedData: Document[] = [
            {
              id: tripData.id,
              name: tripData.User.fullName || "ไม่ระบุชื่อ",
              date: formatDate(tripData.dateStart),
              buttonType: "form-code",
            },
          ];

          setDocuments(formattedData);
        } else {
          setDocuments([]);
          setTripTitle("ไม่พบข้อมูลทริป");
        }
      } catch (error) {
        console.error("❌ ไม่สามารถโหลดข้อมูลทริปได้:", error);
        setTripTitle("ไม่สามารถโหลดข้อมูลทริปได้");
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  // ✅ ฟังก์ชันแปลงวันที่เป็น dd/mm/yyyy
  const formatDate = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ คอลัมน์ตาราง
  const columns = [
    { title: "ชื่อ-นามสกุล", align: "left" },
    { title: "วันที่", align: "left" },
    { title: "เช็คชื่อ", align: "center" },
  ];

  // ✅ เปิด Popup กรอกโค้ด
  const handleFormCodeClick = () => {
    setIsPopupOpen(true);
  };

  // ✅ ฟังก์ชันส่งโค้ด
  const handlePopupSubmit = () => {
    if (inputCode.trim() === "") {
      setError("กรุณากรอกโค้ดก่อน");
      return;
    }

    console.log("✅ Submitted code:", inputCode);
    setIsPopupOpen(false);
    setIsConfirmationOpen(true);
  };

  // ✅ ปิด Popup ยืนยันสำเร็จ
  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setInputCode("");
    setError("");
  };

  // ✅ จัดการการเปลี่ยนแปลง input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setInputCode(value);
      if (value.trim() !== "") setError("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* ✅ ส่วนหัว: เปลี่ยนเป็นชื่อทริป */}
      <Header title={`ลูกทริป - ${tripTitle}`} />

      {/* ✅ ตารางแสดงข้อมูล */}
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                ⏳ กำลังโหลดข้อมูล...
              </TableCell>
            </TableRow>
          ) : documents.length > 0 ? (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell align="center">
                  <Button
                    type={doc.buttonType}
                    onClick={
                      doc.buttonType === "form-code"
                        ? handleFormCodeClick
                        : undefined
                    }
                  >
                    {doc.buttonType === "refresh" ? "เช็คชื่อแล้ว" : "กรอก Code"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                ⛔️ ไม่พบข้อมูลเอกสาร
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      {/* ✅ Popup สำหรับกรอกโค้ด */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">กรอกโค้ด</h2>
            <input
              type="text"
              value={inputCode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="กรุณากรอกโค้ด (4 ตัวอักษร)"
              maxLength={4}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsPopupOpen(false);
                  setError("");
                }}
              >
                ยกเลิก
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePopupSubmit}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Popup ยืนยันสำเร็จ */}
      <SubmitPopup isOpen={isConfirmationOpen} onClose={handleConfirmationClose} />
    </div>
  );
};

export default DocumentPage;
