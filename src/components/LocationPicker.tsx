"use client";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
};

function MapClickHandler({ onLocationSelect }: Props) {
  const [position, setPosition] = useState<any>(null);

  useMapEvents({
    click(e) {
      const location = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setPosition(location);

      onLocationSelect(location);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPicker({ onLocationSelect }: Props) {
  return (
    <MapContainer
      center={[28.4506, 77.5842]}
      zoom={15}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapClickHandler onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
