import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useUserLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [showCoords, setShowCoords] = useState<boolean>(false);

  const getUserLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      const geolocationAPI = navigator.geolocation;
      geolocationAPI.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLat(latitude);
          setLong(longitude);
          setShowCoords(true);
          toast({ title: 'Found your location' });
        },
        (error) => {
          console.log(error);
          toast({ title: 'Something went wrong getting your position' });
        }
      );
    } else {
      setError('Geolocation API is not available in your browser');
      toast({ title: 'Geolocation API is not available in your browser' });
    }
  };

  const hideUserLocation = () => {
    setShowCoords(false);
    setLat(null);
    setLong(null);
  };

  return {
    lat,
    long,
    error,
    showCoords,
    getUserLocation,
    hideUserLocation,
  };
};
