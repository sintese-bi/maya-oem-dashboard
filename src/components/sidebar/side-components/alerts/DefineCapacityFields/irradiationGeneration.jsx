import { Box, TextField, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";

export const IrradiationGeneration = ({value}) => {
  const [irradiationGeneration, setIrradiationGeneration] = useState(0);

  useEffect(() => {
    setIrradiationGeneration(value);
  }, [value]);

  return (
    <Box sx={{width: 140, height: 40}}>
      <TextField
        type="text"
        value={irradiationGeneration}
        id="irradiationGeneration"
        label="Geração Estimada por Irradiação"
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
        }}
      />
    </Box>
  );
};
