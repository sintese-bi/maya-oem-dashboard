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
      center={[-19.9678, -44.1983]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 1, borderRadius: "10px" }}
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
                  src={
                    data.dev_image != null
                      ? data.dev_image
                      : `data:image/jpeg;base64,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`
                  }
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
