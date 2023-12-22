import { LocationOn } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";

import UsinIcon from "src/assets/usinIcon.png";

import { Box, Card, Typography } from "@mui/material";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { numbers } from "src/helpers/utils";

export const LocationUsins = ({ allDevices }) => {
  const [data, setData] = useState([]);
  var greenIcon = L.icon({
    iconUrl: UsinIcon,

    iconSize: [38, 35], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    let devicesWithLatAndLong = allDevices.filter(
      (data) => data.dev_lat && data.dev_long != null
    );
    setData(devicesWithLatAndLong);
  }, [allDevices]);

  return (
    <MapContainer
      center={[-19.860098, -43.940933]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((data, index) => {
        return (
          <Marker
            position={[data.dev_lat, data.dev_long]}
            icon={greenIcon}
            key={index}
          >
            <Popup>
              Nome da usina: {data.name}
              <br />
              Endereço: {data.address}
              <br />
              Potência instalada: {data.capacity + " KWp"}
              <br />
              Geração atual: {data.generationRealDay + " KWh"}
              <Box
                sx={{
                  width: "100%",
                  height: "80px",
                  borderRadius: "5px",
                  mt: 2,
                }}
              >
                <img
                  style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                  src="data:image/jpeg;base64,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"
                  alt="usin_image"
                />
              </Box>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
