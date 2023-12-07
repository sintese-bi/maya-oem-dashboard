import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ModuleOM = ({ setOpen, open }) => {
  return (
    <Box onClick={() => {}}>
      <Button
        component={Link}
        to={"/dashboard/calculator"}
        variant="contained"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Proposta
      </Button>
    </Box>
  );
};
