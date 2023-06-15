// IMPORTS
import { Link, useLocation, useParams } from "react-router-dom";

// LIBS DE ESTILOS
import { Box, Button } from "@mui/material";

// ASSETS
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import PaidIcon from "@mui/icons-material/Paid";
import WarningIcon from "@mui/icons-material/Warning";

const Tabs = () => {
  const { brand } = useParams();
  const location = useLocation();
  const { blUuidState } = location.state || {};

  const DASHBOARD_TABS = [
    {
      label: "Geração",
      path: "generation",
      IconComponent: EnergySavingsLeafIcon,
    },
    {
      label: "Alertas",
      path: "alerts",
      IconComponent: WarningIcon,
    },
    {
      label: "Investimento",
      path: "investment",
      IconComponent: PaidIcon,
    },
  ];

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexFlow: { xs: "column", lg: "row" },
        gap: 1,
      }}
    >
      {DASHBOARD_TABS.map(({ label, path, IconComponent }) => {
        const pathname = `/dashboard/${path}/${brand}`;
        const isActive = pathname === location.pathname;

        return (
          <Button
            key={path}
            startIcon={<IconComponent fontSize="small" />}
            component={Link}
            to={{ pathname }}
            state={{ blUuidState }}
            {...(isActive ? { color: "primary", variant: "contained" } : {})}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
};

export default Tabs;
