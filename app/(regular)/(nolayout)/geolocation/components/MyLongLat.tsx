import CustomStatusBadge from '@/components/core/StatusBadge';
import { useUserLocation } from '@/lib/useUserLocation';
import React from 'react';

const MyLongLat: React.FC = () => {
  const {
    lat,
    long,
    showCoords,
    getUserLocation,
    hideUserLocation,
  } = useUserLocation();

  return (
    <div className="pl-6 pt-6 pr-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <button onClick={hideUserLocation} className="text-sm font-medium">
        Hide my location
      </button>
      <span className="text-sm font-medium" onClick={getUserLocation}>
        Show my location
      </span>

      {showCoords && (
        <CustomStatusBadge position="top" title={`Longitude: ${long} Latitude: ${lat}`} />
      )}
    </div>
  );
};

export default MyLongLat;
