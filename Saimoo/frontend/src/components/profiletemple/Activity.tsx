import React from "react";

const Activity = ({ activities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6  ">
      {activities.map((activity, idx) => (
        <div key={idx} className="relative bg-white  ">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{activity.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{activity.date}</p>
            <p className="text-gray-700 text-sm">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activity;
