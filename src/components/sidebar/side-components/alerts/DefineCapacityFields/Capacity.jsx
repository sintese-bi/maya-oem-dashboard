import { Box, TextField, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";

export const Capacity = ({ value, setValuesCapacity }) => {
  const [capacity, setCapacity] = useState(value);

  useEffect(() => {
    setCapacity(value);
  }, [value]);

  return (
    <Box sx={{ width: 140, height: 40 }}>
      <TextField
        type="number"
        value={capacity}
        label="Potência"
        sx={{ width: "100%" }}
        onChange={(e) => {
          setCapacity(e.target.value);
          setValuesCapacity(e.target.value);
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">kWp</InputAdornment>,
        }}
      />
    </Box>
  );
};
