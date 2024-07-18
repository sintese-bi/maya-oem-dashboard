import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const Email = ({ value, setValuesEmailNumber }) => {
  const [email, setEmail] = useState(value);

  useEffect(() => {
    setEmail(value);
  }, [value]);

  return (
    <Box sx={{ width: 180, height: 40 }}>
      <TextField
        type="text"
        value={email}
        label="Email"
        sx={{ width: "100%" }}
        onChange={(e) => {
          setEmail(e.target.value);
          setValuesEmailNumber(e.target.value);
        }}
      />
    </Box>
  );
};
