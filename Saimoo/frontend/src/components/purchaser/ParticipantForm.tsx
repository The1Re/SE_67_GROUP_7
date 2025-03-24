// components/ParticipantForm.tsx
import React from 'react';

interface Participant {
  name: string;
  phone: string;
  note: string;
  ageUnder6: boolean;
}

interface Props {
  index: number;
  data: Participant;
  onChange: (index: number, field: keyof Participant, value: string | boolean) => void;
}

const ParticipantForm: React.FC<Props> = ({ index, data, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
      <h3 className="font-medium mb-2">คนที่ {index + 1}</h3>

      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={!!data.ageUnder6}
          onChange={(e) => onChange(index, 'ageUnder6', e.target.checked)}
          className='cursor-pointer'
        />
        <span>อายุต่ำกว่า 6 ปี</span>
      </label>

      <input
        type="text"
        placeholder="ชื่อ - นามสกุล"
        value={data.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        className="block w-full border px-3 py-2 rounded mb-3"
      />

      <input
        type="text"
        placeholder="เบอร์โทร"
        value={data.phone}
        onChange={(e) => onChange(index, 'phone', e.target.value)}
        className="block w-full border px-3 py-2 rounded mb-3"
      />

      <textarea
        placeholder="ความต้องการเพิ่มเติม"
        value={data.note}
        onChange={(e) => onChange(index, 'note', e.target.value)}
        className="block w-full border px-3 py-2 rounded"
      />
    </div>
  );
};

export default ParticipantForm;
