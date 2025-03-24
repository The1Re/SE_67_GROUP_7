import React, { useState } from 'react';
import TripInformation from '@/components/CheckTripRequest/TripInformation';
import TripPurpose from '@/components/CheckTripRequest/TripPurpose';
import ParticipantsList from '@/components/CheckTripRequest/ParticipantsList';
import ScreeningCriteria from '@/components/CheckTripRequest/ScreeningCriteria';
import OfficialSection from '@/components/CheckTripRequest/OfficialSection';

const TripScreeningForm = () => {
    const [formData, setFormData] = useState({
        requestDate: '',
        tripName: '',
        startDate: '',
        endDate: '',
        location: '',
        tripResponsible: '',
        position: '',
        phone: '',
        email: '',
        purpose: '',
        purposeOther: '',
        participants: Array.from({ length: 10 }, () => ({ name: '', idNumber: '', notes: '' })),
        screeningCriteria: {
          criminal: false,
          security: false,
          health: false,
          other: false
        },
        screeningCriteriaOther: '',
      });
      

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedParticipants = [...prev.participants];
      updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
      return { ...prev, participants: updatedParticipants };
    });
  };

  const handleScreeningCriteriaChange = (criteriaName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      screeningCriteria: { ...prev.screeningCriteria, [criteriaName]: checked }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requestDate || !formData.tripName) {
      alert('กรุณาระบุข้อมูลที่จำเป็น');
      return;
    }
    console.log('Form submitted:', formData);
    alert('แบบฟอร์มถูกส่งเรียบร้อยแล้ว');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">แบบฟอร์มคำขอตรวจสอบบุคคลเข้าร่วมทริป</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">วันที่ยื่นคำขอ:</label>
        <input
          type="date"
          name="requestDate"
          value={formData.requestDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <TripInformation formData={formData} handleChange={handleChange} />
      <TripPurpose formData={formData} handleChange={handleChange} />
      <ParticipantsList participants={formData.participants} handleParticipantChange={handleParticipantChange} />
      <ScreeningCriteria
        screeningCriteria={formData.screeningCriteria}
        screeningCriteriaOther={formData.screeningCriteriaOther}
        handleScreeningCriteriaChange={handleScreeningCriteriaChange}
        handleChange={handleChange}
      />
      <OfficialSection formData={formData} handleChange={handleChange} />

      <div className="text-center mt-6">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
          บันทึกแบบฟอร์ม
        </button>
      </div>
    </form>
  );
};

export default TripScreeningForm;
