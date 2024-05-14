import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import citiesData from "src/services/municipios";

export const Address = ({ value, setValues }) => {
  const [selectedCity, setSelectedCity] = useState({
    ic_states: value?.split("-")[1],
    ic_city: value?.split("-")[0],
  });

  useEffect(() => {
    setSelectedCity({
      ic_states: value.split("-")[1],
      ic_city: value.split("-")[0],
    });
  }, [value]);

  useEffect(() => {
    console.log(selectedCity);
    setValues(selectedCity);
  }, [selectedCity]);

  return (
    <Box sx={{ width: 300, height: 40 }}>
      <Autocomplete
        name="address"
        options={citiesData}
        getOptionLabel={(city) => {
          return `${city.ic_city}-${city.ic_states}`;
        }} // Exibir nome do município e estado
        isOptionEqualToValue={(option, value) => {
          if (option.ic_states == value.ic_states || value.ic_states == "")
            return true;
        }}
        value={selectedCity}
        onChange={(event, newValue) => setSelectedCity(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Endereço de instalação"
            variant="outlined"
            sx={{ width: 300 }}
          />
        )}
      />
    </Box>
  );
};
