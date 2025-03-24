import React from 'react';
interface TripPurposeProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TripPurpose: React.FC<TripPurposeProps> = ({ formData, handleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">วัตถุประสงค์การเดินทาง</h2>
      <div className="flex flex-wrap gap-4">
        {['ทัศนศึกษา', 'ดูงาน', 'กิจกรรมเพื่อสังคม', 'อบรม/สัมมนา', 'อื่นๆ'].map((purpose) => (
          <label key={purpose} className="flex items-center">
            <input 
              type="radio" 
              checked={formData.purpose === purpose} 
              onChange={() => handleChange({ target: { name: 'purpose', value: purpose } })}
              className="mr-2"
            />
            {purpose}
          </label>
        ))}
      </div>
      {formData.purpose === 'อื่นๆ' && (
        <div className="mt-2">
          <input 
            type="text" 
            name="purposeOther"
            value={formData.purposeOther}
            onChange={handleChange}
            placeholder="โปรดระบุ"
            className="w-full p-2 border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default TripPurpose;
