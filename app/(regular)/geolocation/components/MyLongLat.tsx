'use client ';
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MyLongLat: React.FC = () => {
	const [lat, setLat] = useState<number | null>(null);
	const [long, setLong] = useState<number | null>(null);
	const [error, setError] = useState<string>('');
	const [showCoords, setShowCoords] = useState<boolean>(false);

	const getUserLocation = () => {
		const geolocationAPI = navigator.geolocation;
		if (!geolocationAPI) {
			setError('Geolocation API is not available in your browser');
            toast({ title: "Geolocation API is not available in your browser" });

		} else {
			geolocationAPI.getCurrentPosition(
				(position) => {
					const { coords } = position;
					console.log(coords);
					setLat(coords.latitude);
					setLong(coords.longitude);
					setShowCoords(true);
                    toast({ title: "Found your location" });
				},
				(error) => {
					console.log(error);
                    toast({ title: "omething went wrong getting your position" });
				}
			);
		}
	};

	const hideUserLocation = () => {
		setShowCoords(false);
		setLat(null);
		setLong(null);
	};

	return (
		<Card className="m-5 w-full text-center">
			{showCoords ? (
				<><div className="flex gap-8 w-full">
					<p>Latitude: {lat}</p>
					<p>Longitude: {long}</p>
<span onClick={hideUserLocation} className="flex w-full justify-end text-sm font-medium">Hide my location</span>			</div>	
				</>
			) : (
				<span onClick={getUserLocation} className="text-sm font-medium">My longitude and latitude is..</span>

			)}
		</Card>
	);
};

export default MyLongLat;
