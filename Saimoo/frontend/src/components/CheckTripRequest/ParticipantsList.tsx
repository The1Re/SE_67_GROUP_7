import React from 'react';

const ParticipantsList = ({ participants, handleParticipantChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">รายชื่อผู้เข้าร่วม</h2>
      {participants.map((participant, index) => (
        <div key={index} className="flex gap-4 mb-2">
          <input
            type="text"
            value={participant.name}
            onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="text"
            value={participant.idNumber}
            onChange={(e) => handleParticipantChange(index, 'idNumber', e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="text"
            value={participant.notes}
            onChange={(e) => handleParticipantChange(index, 'notes', e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default ParticipantsList;
