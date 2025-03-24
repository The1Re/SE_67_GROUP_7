import React from 'react';
import { PackageData } from '@/components/historyguidetrip/Types';
import StatusLabel from '@/components/historyguidetrip/StatusLabel';
import Button from '@/components/historyguidetrip/Button';

interface PackageCardProps {
  packageData: PackageData;
  onViewTrip: (id: number) => void;
  onCancelTrip: (id: number) => void;
  onClone: (id: number) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  packageData, 
  onViewTrip, 
  onCancelTrip, 
  onClone 
}) => {
  const { 
    id,
    title, 
    subtitle, 
    image, 
    status, 
    date, 
    description, 
    showDetails 
  } = packageData;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-56 h-40 flex-shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute top-2 left-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
            สุพรรณบุรี
          </div>
        </div>

        <div className="flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            {subtitle && <span className="text-sm text-gray-600">{subtitle}</span>}
          </div>

          {showDetails && (
            <div className="mb-3">
              <p className="text-sm font-medium mb-1">{date}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}

          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">สถานะ:</span>
              <StatusLabel status={status} />
            </div>

            <div className="flex gap-2">
              {!showDetails ? (
                <>
                  <Button type="primary" text="ดูลูกทริป" onClick={() => onViewTrip(id)} />
                  <Button type="danger" text="ยกเลิกทริป" onClick={() => onCancelTrip(id)} />
                </>
              ) : (
                <Button type="primary" text="clone" onClick={() => onClone(id)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
