import React from 'react';
import PackageCard from '@/components/historyguidetrip/PackageCard';
import { PackageData } from '@/components/historyguidetrip/Types';
interface TripHistoryProps {
  packages: PackageData[];
  onViewTrip: (id: number) => void;
  onCancelTrip: (id: number) => void;
  onClone: (id: number) => void;
}

const TripHistory: React.FC<TripHistoryProps> = ({ 
  packages, 
  onViewTrip, 
  onCancelTrip, 
  onClone 
}) => {
  return (
    <div className="max-w-5xl mx-auto p-5 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">แพ็คเกจทัวร์ของฉัน</h1>
        <div className="h-1 w-20 bg-teal-500"></div>
      </header>
      
      <div className="flex flex-col gap-5">
        {packages.map(pkg => (
          <PackageCard 
            key={pkg.id} 
            packageData={pkg} 
            onViewTrip={onViewTrip}
            onCancelTrip={onCancelTrip}
            onClone={onClone}
          />
        ))}
      </div>
    </div>
  );
};

export default TripHistory;
