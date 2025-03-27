import React from 'react';
import BuddhaEvent from './BuddhaEvent';

const EventSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4">
        ทริปยอดนิยม
      </h2>
      <BuddhaEvent />
    </div>
  );
};

export default EventSection;