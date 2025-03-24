import React from 'react';

const ScreeningCriteria = ({ screeningCriteria, screeningCriteriaOther, handleScreeningCriteriaChange, handleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">เกณฑ์การตรวจสอบ</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">เกณฑ์การตรวจสอบ:</label>
        <div className="flex flex-wrap gap-4">
          {['criminal', 'security', 'health', 'other'].map((criteria) => (
            <label key={criteria} className="flex items-center">
              <input
                type="checkbox"
                checked={screeningCriteria[criteria]}
                onChange={(e) => handleScreeningCriteriaChange(criteria, e.target.checked)}
                className="mr-2"
              />
              {criteria}
            </label>
          ))}
        </div>
      </div>
      {screeningCriteria.other && (
        <div className="mt-2">
          <input
            type="text"
            name="screeningCriteriaOther"
            value={screeningCriteriaOther}
            onChange={handleChange}
            placeholder="โปรดระบุ"
            className="w-full p-2 border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ScreeningCriteria;
