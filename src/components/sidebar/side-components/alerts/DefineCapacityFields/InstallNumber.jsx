import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const InstallNumber = ({ value, setValuesInstallNumber }) => {
  const [install_number, setInstallNumber] = useState(value);

  useEffect(() => {
    setInstallNumber(value);
  }, [value]);

  return (
    <Box sx={{ width: 82, height: 40 }}>
      <TextField
        type="number"
        defaultValue={install_number}
        label="Número de Instalação"
        sx={{ width: "100%" }}
        onChange={(e) => {
          setInstallNumber(e.target.value);
          setValuesInstallNumber(e.target.value);
        }}
      />
    </Box>
  );
};
