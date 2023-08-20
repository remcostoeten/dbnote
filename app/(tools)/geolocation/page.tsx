"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { BorderButton } from "@/components/buttons/CustomButtons"

import GooglePlacesAutocomplete from "./components/GooglePlacesAutocomplete"

const AddressConverter: React.FC = () => {
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  const convertToLatLong = () => {
    const apiKey = "AIzaSyDj4mkVMrmeVHKohAW9ulDpc9dUvABwGgM"
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const location = data.results[0].geometry.location
          setLatitude(location.lat.toString())
          setLongitude(location.lng.toString())
        } else {
          alert("Kon de locatie niet vinden.")
        }
      })
      .catch((error) => {
        alert("Er is een fout opgetreden.")
      })
  }

  const copyToClipboard = (type: "latitude" | "longitude") => {
    const value = type === "latitude" ? latitude : longitude
    if (value) {
      navigator.clipboard.writeText(value)
      alert("Gekopieerd naar klembord!")
    }
  }

  return (
    <>
      <div className="flex gap-4 ">
        <Card className="p-4 flex flex-col gap-4">
          <Label htmlFor="adres">Adres:</Label>
          <Input
            type="text"
            id="adres"
            placeholder="Vul het adres in"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={convertToLatLong} text={""}>
            Converteren
          </Button>
        </Card>

        <Card className="p-4 flex flex-col gap-4">
          <Label>Latitude:</Label>
          <Input type="text" id="latitude" readOnly value={latitude} />
          <Button onClick={() => copyToClipboard("latitude")} text={""}>
            Kopiëren
          </Button>
        </Card>

        <Card className="p-4 flex flex-col gap-4">
          <Label>Longitude:</Label>
          <Input type="text" id="longitude" readOnly value={longitude} />
          <Button onClick={() => copyToClipboard("longitude")} text={""}>
            Kopiëren
          </Button>
        </Card>
      </div>
      <GooglePlacesAutocomplete />
    </>
  )
}

export default AddressConverter
