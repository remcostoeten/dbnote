import { GoogleMap, GoogleMaps, Marker } from "next-google-maps"

const Map: React.FC = () => {
  return (
    <GoogleMap id="map" center={{ lat: 37.7749, lng: -122.4194 }} zoom={8}>
      <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
    </GoogleMap>
  )
}

export default Map
