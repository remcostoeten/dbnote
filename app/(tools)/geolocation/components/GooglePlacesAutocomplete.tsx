"use client"

import { useEffect, useRef, useState } from "react"
import { Label } from "@radix-ui/react-label"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface IProps {
  apiKey: string
}

const GoogleMapAutocomplete: React.FC<IProps> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const pacInputRef = useRef<HTMLInputElement | null>(null)

  const [placeName, setPlaceName] = useState<string>("")
  const [placeAddress, setPlaceAddress] = useState<string>("")

  useEffect(() => {
    const apiKey = process.env.API_GEOKEY

    if (apiKey) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&v=weekly`
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (!window.google || !pacInputRef.current || !mapRef.current) return

    const initMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      })

      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["establishment"],
      }

      const autocomplete = new google.maps.places.Autocomplete(
        pacInputRef.current,
        options
      )
      autocomplete.bindTo("bounds", map)

      const infowindow = new google.maps.InfoWindow()
      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      })

      autocomplete.addListener("place_changed", () => {
        infowindow.close()
        marker.setVisible(false)
        const place = autocomplete.getPlace()
        if (!place.geometry || !place.geometry.location) {
          window.alert("No details available for Input: '" + place.name + "'")
          return
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport)
        } else {
          map.setCenter(place.geometry.location)
          map.setZoom(17)
        }
        marker.setPosition(place.geometry.location)
        marker.setVisible(true)
        setPlaceName(place.name)
        setPlaceAddress(place.formatted_address)
        infowindow.open(map, marker)
      })
    }

    window.initMap = initMap
  }, [])
  return (
    <div>
      <div className="pac-card" id="pac-card">
        <Card>
          <div id="title">Autocomplete search</div>
          <Card id="type-selector" className="pac-controls">
            <Input
              type="radio"
              name="type"
              id="changetype-all"
              defaultChecked
            />
            <Label htmlFor="changetype-all">All</Label>

            <Input type="radio" name="type" id="changetype-establishment" />
            <Label htmlFor="changetype-establishment">Establishment</Label>

            <Input type="radio" name="type" id="changetype-address" />
            <Label htmlFor="changetype-address">Address</Label>

            <Input type="radio" name="type" id="changetype-geocode" />
            <Label htmlFor="changetype-geocode">Geocode</Label>

            <Input type="radio" name="type" id="changetype-cities" />
            <Label htmlFor="changetype-cities">(Cities)</Label>

            <Input type="radio" name="type" id="changetype-regions" />
            <Label htmlFor="changetype-regions">(Regions)</Label>
          </Card>
          <br />
          <div id="strict-bounds-selector" className="pac-controls">
            <Input type="checkbox" id="use-location-bias" defaultChecked />
            <Label htmlFor="use-location-bias">Bias to map viewport</Label>

            <Input type="checkbox" id="use-strict-bounds" />
            <Label htmlFor="use-strict-bounds">Strict bounds</Label>
          </div>
        </Card>
        <div id="pac-container">
          <Input
            ref={pacInputRef}
            id="pac-Input"
            type="text"
            placeholder="Enter a location"
          />
        </div>
      </div>
      <Card
        ref={mapRef}
        id="map"
        style={{ width: "100%", height: "500px" }}
      ></Card>
      <Card id="infowindow-content">
        <span id="place-name" className="title">
          {placeName}
        </span>
        <br />
        <span id="place-address">{placeAddress}</span>
      </Card>
    </div>
  )
}

export default GoogleMapAutocomplete
