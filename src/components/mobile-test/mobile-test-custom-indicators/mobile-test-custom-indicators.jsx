import { Box, Button } from "@mui/material";

export const MobileTestCustomIndicators = ({ currentPage, setCurrentPage }) => {
  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}
    >
      <Button
        variant="contained"
        sx={{ width: 90 }}
        onClick={() => {
          if (currentPage != 0)
            setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
        }}
      >
        Voltar
      </Button>
      <Button
        variant="contained"
        sx={{ width: 90 }}
        onClick={() => {
          if (currentPage != 1)
            setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        }}
      >
        Próximo
      </Button>
    </Box>
  );
};
