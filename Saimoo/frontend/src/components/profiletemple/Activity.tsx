const Activity = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">ไม่พบข้อมูลกิจกรรม</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6 cursor-pointer">
      {activities.map((activity, idx) => (
        <div 
          key={idx} 
          className="relative bg-white overflow-hidden transition-all duration-300
                   hover:shadow-lg hover:-translate-y-2 active:shadow-xl active:scale-105 cursor-pointer"
        >
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
