import { LocationOn } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";

import { Card, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export const LocationUsins = () => {
  return (
    <MapContainer
      center={[-19.912998, -43.940933]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
