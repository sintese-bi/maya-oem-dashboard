// IMPORTS
import { Link } from "react-router-dom";

// LIBS DE ESTILOS
import { Box, Button, ListItem } from "@mui/material";

export const NavItem = (props) => {
  const { icon, href, title, active, state } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
        px: 2,
      }}
    >
      <Button
        component={Link}
        to={href}
        state={state}
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && {
            xs: "rgba(255,255,255, 0.08)",
            lg: "none",
          },
          borderRadius: 1,
          color: active
            ? "secondary.main"
            : { xs: "neutral.300", lg: "neutral.500" },
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: {
              xs: "rgba(255,255,255, 0.08)",
              lg: "neutral.100",
            },
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};
