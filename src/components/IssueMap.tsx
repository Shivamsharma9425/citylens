"use client";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function IssueMap({ issues }: { issues: any[] }) {
  return (
    
    <MapContainer
      center={[28.4506, 77.5842]}
      zoom={15}
      style={{
        height: "80vh",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {issues
        .filter((issue) => issue.latitude && issue.longitude)
        .map((issue) => (
          <Marker key={issue._id} position={[issue.latitude, issue.longitude]}>
            
            <Popup>
              <h3>{issue.title}</h3>

              <p>{issue.location}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
