'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import React, { useState } from "react";

interface DistanceCalculatorProps {
    apiKey: string;
}

const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({ apiKey }) => {
    const [address1, setAddress1] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");
    const [distance, setDistance] = useState<number | null>(null);

    const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    const computeDistance = async () => {
        const endpoints = [
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address1)}&key=${apiKey}`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address2)}&key=${apiKey}`
        ];

        try {
            const responses = await Promise.all(endpoints.map(endpoint => fetch(endpoint)));
            const jsons = await Promise.all(responses.map(response => response.json()));

            const location1 = jsons[0]?.results[0]?.geometry?.location;
            const location2 = jsons[1]?.results[0]?.geometry?.location;

            if (location1 && location2) {
                const dist = getDistanceFromLatLonInKm(location1.lat, location1.lng, location2.lat, location2.lng);
                setDistance(dist);
                toast({ title: `Distance computed: ${dist.toFixed(2)} km` });
            } else {
                toast({ title: "Unable to compute distance. Please check the addresses." });
            }

        } catch (error) {
            toast({ title: "Error computing distance." });
            console.error(error);
        }
    };

    return (
        <>
            <Card className="flex flex-col gap-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Address 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="text" placeholder="Address 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                </CardContent>
            </Card>

            <Card className="flex flex-col gap-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Address 2</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="text" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    <button className="mt-2" onClick={computeDistance}>Compute Distance</button>
                    {distance !== null && <p className="mt-2">Distance: {distance.toFixed(2)} km</p>}
                </CardContent>
            </Card>
        </>
    );
}

export default DistanceCalculator;
