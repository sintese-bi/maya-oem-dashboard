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
                  src={data.dev_image}
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
