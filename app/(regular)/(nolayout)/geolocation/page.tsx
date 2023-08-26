'use client'
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import AddressesList from "./components/AddressesList";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import MapDisplay from "./components/Map";
import { auth, db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
  } from "firebase/firestore"

interface Location {
    name : string;
    latitude : string;
    longitude : string;
}

const AddressConverter : React.FC = () => {
    const [latitude,
        setLatitude] = useState < string > ("");
    const [longitude,
        setLongitude] = useState < string > ("");
    const [address,
        setAddress] = useState < string > ("");
    const [locations,
        setLocations] = useState < Location[] > ([]);
    const [showLocations,
        setShowLocations] = useState < boolean > (false);
    const [showMap,
        setShowMap] = useState < boolean > (false);

    const convertToLatLong = () => {
        const apiKey = "AIzaSyDj4mkVMrmeVHKohAW9ulDpc9dUvABwGgM"
        const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        fetch(endpoint).then((response) => response.json()).then((data) => {
            if (data.status === "OK") {
                const location = data.results[0].geometry.location;
                setLatitude(location.lat.toString());
                setLongitude(location.lng.toString());
                toast({
                    title: `Found location: ${location
                        .lat
                        .toString()}, ${location
                        .lng
                        .toString()}`
                });
            } else {
                toast({title: "Could not find location"});
            }
        }).catch((error) => {
            console.error("An error occurred:", error);
            toast({title: "An error occurred."});
        });
    };

    const saveLocation = async () => {
      const location : Location = {
        name: address,
        latitude,
        longitude
      };
      const updatedLocations = [
        ...locations,
        location
      ];
      setLocations(updatedLocations);
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      setLatitude("");
      setLongitude("");
      setAddress("");
      setShowLocations(true);
      setShowMap(true);
    
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        await setDoc(doc(db, "locations", userId), location);
      } else {
        console.error("No user is signed in.");
      }
    };
    

    const copyToClipboard = (type : "latitude" | "longitude") => {
        const value = type === "latitude"
            ? latitude
            : longitude;
        if (value) {
            navigator
                .clipboard
                .writeText(value);
            alert("Copied to clipboard!");
        }
    };

    useEffect(() => {
        const storedLocations = JSON.parse(localStorage.getItem("locations") || "[]");
        setLocations(storedLocations);
    }, []);

    const clearStorage = () => {
        localStorage.clear();
        setLocations([]);
        setShowLocations(false);
        setShowMap(false);
    };

    return (
        <div className="flex flex-col">
            <div className="grid my-[80px] gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="flex flex-col gap-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            type="text"
                            id="adres"
                            placeholder="Fill in the address"
                            value={address}
                            className="mb-2"
                            onChange={(e) => setAddress(e.target.value)}/>
                        <span className="flex w-full justify-between">
                            <span className="text-xs text-muted-foreground" onClick={convertToLatLong}>
                                Get Lat/Long
                            </span>
                            <span
                                className=" flex w-full justify-end mt-2 text-xs text-muted-foreground"
                                onClick={saveLocation}>
                                Save location
                            </span>
                        </span>
                    </CardContent>
                </Card>
                <Card className="flex flex-col gap-2">
                    <CardHeader
                        className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Latitude
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input type="text" id="latitude" readOnly value={latitude}/>
                        <span
                            className=" flex w-full justify-end mt-2 text-xs text-muted-foreground"
                            onClick={() => copyToClipboard("latitude")}>
                            Copy
                        </span>
                    </CardContent>
                </Card >
                <Card className="flex flex-col gap-2">
                    <CardHeader
                        className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Longitude
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input type="text" id="longitude" readOnly value={longitude}/>
                        <span
                            className="text-xs text-muted-foreground"
                            onClick={() => copyToClipboard("longitude")}>
                            Copy
                        </span>
                    </CardContent>
                </Card>
                <Card className="flex flex-col gap-2">
                    <CardHeader
                        className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Locations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {showLocations && (<AddressesList
                            locations={locations}
                            onSelect={(selectedLocation) => {
                            setLatitude(selectedLocation.latitude);
                            setLongitude(selectedLocation.longitude);
                            setAddress(selectedLocation.name);
                        }}/>)}
                        <span className="text-xs text-muted-foreground" onClick={clearStorage}>
                            Clear storage
                        </span>
                    </CardContent>
                </Card>

            </div>
            {showMap && (
                < >
                            {typeof window !== 'undefined' && latitude && longitude && (<MapDisplay latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}/>)}
                </>
            )}
        </div>
    );
}

export default AddressConverter;
