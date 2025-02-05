import { Box, TextField, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";

export const EstimatedGeneration = ({
  value,
  setValuesEstimatedGeneration,
}) => {
  const [estimatedGeneration, setEstimatedGeneration] = useState(0);

  useEffect(() => {
    setEstimatedGeneration(value);
  }, [value]);

  return (
    <Box sx={{ width: 140, height: 40 }}>
      <TextField
        type="number"
        value={estimatedGeneration}
        id="outlined-required"
        label="Geração Estimada"
        sx={{ width: "100%" }}
        onChange={(e) => {
          setEstimatedGeneration(e.target.value);
          setValuesEstimatedGeneration(e.target.value);
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
        }}
      />
    </Box>
  );
};
