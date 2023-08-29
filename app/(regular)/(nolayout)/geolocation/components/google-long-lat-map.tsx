import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapDisplayProps = {
  latitude: number;
  longitude: number;
};

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude }) => {
  return (
    <div className='w-full h-[40vh] rounded-md shadow-lg'>
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
