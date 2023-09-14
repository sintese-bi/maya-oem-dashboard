import { Box, Button, Typography } from "@mui/material";

export const UserInfo = ({ useName }) => {
  return (
    <Box sx={{}}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3">{useName}</Typography>
      </Box>
      <Button variant="outlined" color="error">
        Cancelar MAYA WATCH PRO
      </Button>
    </Box>
  );
};
