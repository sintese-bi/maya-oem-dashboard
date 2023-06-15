// IMPORTS
import { Link } from "react-router-dom";
import { listBrand } from "src/utils/list-brand";

// LIBS DE ESTILOS
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";

// COMPONENTS
import { NavItem } from "./NavItem";

// ASSETS
import Logo from "../assets/img/logo/maya-energy-logo.png";

export const DashboardSidebar = (props) => {
  const { children, open, onClose } = props;

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link
            // to="/dashboard"
            >
              <img
                alt="Maya Energy"
                src={Logo}
                style={{
                  maxWidth: "80%",
                }}
              />
            </Link>
          </Box>
        </div>

        {children ? (
          <>
            <Divider
              sx={{
                borderColor: "#2D3748",
                my: 3,
              }}
            />
            {children}
          </>
        ) : null}

        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {listBrand.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              href={item.href}
              title={item.title}
              params={item.params}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return null;
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
