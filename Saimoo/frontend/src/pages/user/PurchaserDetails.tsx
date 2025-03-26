import api from "@/api";
import ParticipantForm from "@/components/purchaser/ParticipantForm";
import { OrderDetailRequest, OrderRequest } from "@/models/Order";
import { Trip } from "@/models/Trip";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PurchaserDetails() {
  const { tripId } = useParams<{ tripId: string }>();
  const numericTripId = Number(tripId) || 2;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [participants, setParticipants] = useState<OrderDetailRequest[]>([]);
  const [numPeople, setNumPeople] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${numericTripId}`);
        setTrip(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrip();
  }, [numericTripId]);

  useEffect(() => {
    // Initialize with one empty participant if none exist
    if (participants.length === 0) {
      setParticipants([
        {
          order: 1,
          fullName: "",
          phone: null,
          requirement: null,
          isChild: 0
        }
      ]);
    }
  }, [participants.length]);

  const handleChange = (
    index: number,
    field: keyof OrderDetailRequest,
    value: string | boolean
  ) => {
    const updated = [...participants];
    
    // Convert boolean to number for isChild field
    if (field === 'isChild') {
      updated[index] = { 
        ...updated[index], 
        [field]: value ? 1 : 0 
      };
    } else if (field === 'phone') {
      // For phone, only allow digits and limit to 10 characters
      const phoneValue = typeof value === 'string' ? value.replace(/\D/g, '').slice(0, 10) : null;
      updated[index] = { 
        ...updated[index], 
        [field]: phoneValue === "" ? null : phoneValue 
      };
    } else {
      updated[index] = { 
        ...updated[index], 
        [field]: value === "" ? null : value 
      };
    }
    
    setParticipants(updated);
    // Clear validation errors when user makes changes
    setValidationErrors([]);
  };

  const handleNumChange = (value: number) => {
    setNumPeople(value);
    const updated = [...participants];
    
    if (value > updated.length) {
      const diff = value - updated.length;
      for (let i = 0; i < diff; i++) {
        updated.push({
          order: updated.length + 1,
          fullName: "",
          phone: null,
          requirement: null,
          isChild: 0
        });
      }
    } else {
      updated.length = value;
    }
    
    setParticipants(updated);
    // Clear validation errors when user changes number of participants
    setValidationErrors([]);
  };

  const validateData = () => {
    const errors: string[] = [];
    
    // Check if all participants have a fullName
    participants.forEach((participant, index) => {
      if (!participant.fullName || participant.fullName.trim() === "") {
        errors.push(`ผู้เข้าร่วมคนที่ ${index + 1} ยังไม่ได้กรอกชื่อ`);
      }
      
      // Check phone format if provided
      if (participant.phone && participant.phone.length !== 10) {
        errors.push(`ผู้เข้าร่วมคนที่ ${index + 1} เบอร์โทรต้องมี 10 หลัก`);
      }
    });
    
    // Check if tripId is valid
    if (!numericTripId || numericTripId <= 0) {
      errors.push("ไม่พบข้อมูลทริป");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    // Validate data before submitting
    if (!validateData()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Ensure order numbers are sequential
      const updatedParticipants = participants.map((p, index) => ({
        ...p,
        order: index + 1
      }));

      const orderData: OrderRequest = {
        tripId: numericTripId,
        amountPerson: updatedParticipants.length,
        details: updatedParticipants
      };      

      console.log("Sending data to API:", orderData);

      // Send data to API
      const response = await api.post('/orders', orderData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });

      console.log("API response:", response.data);
      
      // Store order ID for payment page
      if (response.data && response.data.id) {
        localStorage.setItem('orderId', response.data.id.toString());
        console.log("Order ID saved:", response.data.id);
      }
      
      // Navigate to payment page
      navigate(`/trips/${numericTripId}/payment`);
    } catch (error: any) {
      console.error("Error submitting order:", error);
      
      // Show more detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        setValidationErrors([
          `เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: ${error.response.status}`,
          error.response.data?.message || "โปรดตรวจสอบข้อมูลและลองใหม่อีกครั้ง"
        ]);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setValidationErrors(["ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์ โปรดตรวจสอบการเชื่อมต่อ"]);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setValidationErrors([`เกิดข้อผิดพลาด: ${error.message}`]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to toggle debug information;
  const PurchaserDetails = () => {
    // ใช้ useParams เพื่อรับค่า tripId จาก URL
    const { tripId } = useParams();
    
    // แปลง tripId จาก string เป็น number (ถ้าจำเป็น)
    const tripIdNumber = tripId ? parseInt(tripId) : undefined;
    
    // ใช้ tripIdNumber ในการดึงข้อมูลทริป
    useEffect(() => {
      const fetchTripDetails = async () => {
        if (!tripIdNumber) return;
        
        try {
          const response = await api.get(`/trips/${tripIdNumber}`);
          // จัดการข้อมูลที่ได้รับ
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching trip details:", error);
        }
      };
      
      fetchTripDetails();
    }, [tripIdNumber]);
    
    // ส่วนที่เหลือของคอมโพเนนต์...
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Steps Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          ข้อมูลผู้ซื้อ
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          ข้อมูลการชำระเงิน
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          ยืนยันการซื้อแล้ว
        </button>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-3/4 mx-auto">
          <h3 className="font-bold">โปรดแก้ไขข้อผิดพลาดต่อไปนี้:</h3>
          <ul className="list-disc pl-5">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
        {trip ? (
          <>
            <h2 className="text-lg font-bold">{trip.title}</h2>
            <h3 className="mb-2">
              กำหนดการ{" "}
              {new Date(trip.dateStart).toLocaleDateString("th-TH")} -{" "}
              {new Date(trip.dateEnd).toLocaleDateString("th-TH")}
            </h3>
            <h2 className="text-3xl font-bold mb-4">
              {trip.price.toLocaleString()} ฿ / คน
            </h2>
            <label className="block mb-1">จำนวนคนที่เข้าร่วมทริป</label>
            <select
              value={numPeople}
              onChange={(e) => handleNumChange(Number(e.target.value))}
              className="border rounded px-2 py-1 cursor-pointer"
            >
              {Array.from({ length: Math.min(trip.maxPerson || 10, 10) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </>
        ) : (
          <p>กำลังโหลดข้อมูลทริป...</p>
        )}
      </div>

      {/* Participant Forms */}
      {participants.map((person, index) => (
        <ParticipantForm
          key={index}
          index={index}
          data={person}
          onChange={handleChange}
        />
      ))}

      {/* Continue Button */}
      <div className="w-3/4 mx-auto flex justify-end">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
          } text-white px-6 py-2 rounded cursor-pointer`}
        >
          {isSubmitting ? "กำลังดำเนินการ..." : "ต่อไป"}
        </button>
      </div>
    </div>
  );
}

export default PurchaserDetails;
