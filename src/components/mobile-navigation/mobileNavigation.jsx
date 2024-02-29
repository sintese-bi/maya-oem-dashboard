import { Cancel, Close, Menu, OpenInBrowser } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import {
  bottomItems,
  mainItems,
  topItems,
} from "src/modal-actions/modal-actions";
import { routes } from "src/redirection-actions/redirection-actions";
import "./mobileNavigation.css";
import { useState } from "react";
import { Help } from "../help/help";
import { FaturaModulo } from "../modules/faturaModule";
import { ModuleOM } from "../modules/moduleO&M";
import { ConfigPortals } from "../configPortals/configPortal";
import { DefineCapacityAndDevicesEmails } from "../sidebar/side-components/alerts/DefineCapacityAndDevicesEmails";
import { UserInfo } from "../sidebar/side-components/UserInfo";
import { MayaWatchPro } from "../shared/MayaWatchPro";
import { Reports } from "../reports/Reports";
import { Portal } from "../portals/Portal";
import { PaymentWarn } from "../shared/PaymentWarn";
import AlertPercentageForm from "../sidebar/side-components/AlertPercentageForm";
import { getUserCookie, setUserCookie } from "src/services/session";

export const MobileNavigation = () => {
  const {
    useName,
    useTypeMember,
    useEmail,
    firstTime,
    useUuid,
    useCityState,
    useTelephone,
  } = getUserCookie();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState("alertFrequency");
  const [secondaryAction, setSecondaryAction] = useState(
    "AlertsDefineComponent"
  );
  const [welcome, setWelcome] = useState(true);
  const [open, setOpen] = useState(firstTime ? true : false);

  const [mobileNavigationIsOpen, setMobileNavigationIsOpen] = useState(false);

  const handleMobileNavigationState = () => {
    setMobileNavigationIsOpen(!mobileNavigationIsOpen);
  };

  function handleModalState(actionType) {
    setSecondaryAction("AlertsDefineComponent");
    if (action == "alertFrequency" && actionType == "assignPlan") {
      setAction(actionType);
      setOpen(true);
    } else {
      setUserCookie({ ...getUserCookie(), firstTime: false });
      setAction(actionType);
      setOpen(!open);
    }
  }

  const ModalContent = () => {
    switch (action) {
      case "alertFrequency":
        return (
          <Box>
            {useTypeMember ? (
              <AlertPercentageForm
                secondaryAction={secondaryAction}
                setSecondaryAction={setSecondaryAction}
                welcome={welcome}
                setOpen={setOpen}
                open={open}
                setTitle={setTitle}
                setDescription={setDescription}
              />
            ) : (
              <PaymentWarn
                welcome={welcome}
                handleModalState={handleModalState}
                setTitle={setTitle}
                setDescription={setDescription}
              />
            )}
          </Box>
        );
        break;
      case "device":
        return (
          <Box>
            <Portal
              setTitle={setTitle}
              setDescription={setDescription}
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
            />
          </Box>
        );
        break;
      case "reports":
        return (
          <Box>
            <Reports
              setTitle={setTitle}
              setDescription={setDescription}
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
            />
          </Box>
        );
        break;
      case "assignPlan":
        return (
          <Box>
            <MayaWatchPro
              setTitle={setTitle}
              setDescription={setDescription}
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
            />
          </Box>
        );
        break;
      case "userAccount":
        return (
          <Box>
            <UserInfo
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
              setTitle={setTitle}
              setDescription={setDescription}
              useName={useName}
              useEmail={useEmail}
              useUuid={useUuid}
              useCityState={useCityState}
              useTelephone={useTelephone}
              setOpen={setOpen}
            />
          </Box>
        );
        break;
      case "configSetup":
        return (
          <Box sx={{ width: "92vw" }}>
            <DefineCapacityAndDevicesEmails
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
              setOpen={setOpen}
              open={open}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          </Box>
        );
        break;
      case "configPortals":
        return (
          <Box sx={{ p: 4 }}>
            <ConfigPortals
              setTitle={setTitle}
              setDescription={setDescription}
            />
          </Box>
        );
      case "module-orm":
        return (
          <Box>
            <ModuleOM
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
              setOpen={setOpen}
              open={open}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          </Box>
        );
        break;
      case "module-fatura":
        return (
          <Box sx={{ p: 4 }}>
            <FaturaModulo
              setTitle={setTitle}
              setDescription={setDescription}
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
            />
          </Box>
        );
      case "help":
        return (
          <Box sx={{ p: 4 }}>
            <Help
              setTitle={setTitle}
              setOpen={setOpen}
              setDescription={setDescription}
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
            />
          </Box>
        );
      default:
        break;
    }
  };

  const Routes = () => (
    <Grid
      container
      gap={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {routes.map((route, index) => {
        return (
          <Button
            sx={{ width: 200 }}
            variant="contained"
            color="inherit"
            component={Link}
            to={route.to}
            key={index}
            onClick={() => {
              handleMobileNavigationState();
            }}
          >
            {route.label}
          </Button>
        );
      })}
    </Grid>
  );

  const ModalActions = () => {
    const modalActions = topItems.concat(mainItems, bottomItems);
    return (
      <Grid
        id="modal-actions"
        container
        gap={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {modalActions.map((action, index) => (
          <Button
            key={index}
            startIcon={action?.icon}
            variant="contained"
            sx={{ width: 200 }}
            onClick={() => {
              if (action?.action == "deletePlants") {
                window.scrollTo(0, 2000);
              } else {
                setAction(action?.action);
                handleModalState(action?.action);
              }
            }}
          >
            {action?.label}
          </Button>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bgcolor: "rgba(0,0,0,0.7)",
          width: 34,
          height: 34,
          right: 10,
          top: 10,
          zIndex: 20,
          borderRadius: "50px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
        }}
        onClick={() => {
          handleMobileNavigationState();
        }}
      >
        {mobileNavigationIsOpen ? (
          <Close sx={{ color: "white" }} />
        ) : (
          <Menu sx={{ color: "white" }} />
        )}
      </Box>

      <Box
        id="mobileNavigation"
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          display: mobileNavigationIsOpen ? "flex" : "none",
          bgcolor: "background.paper",
          zIndex: 10,
          boxShadow: "1px 5px 25px rgba(0, 0, 0, 0.2)",
          pt: 10,
        }}
      >
        <Routes />

        <ModalActions />
      </Box>
      <Outlet />
      <Modal
        open={open}
        onClose={handleModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
            px: 4,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
            borderRadius: 1,
            border: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              py: 2,
            }}
          >
            <Box>
              <Typography variant="h2">{title}</Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
            <Cancel
              fontSize="large"
              onClick={() => {
                setOpen(false);
              }}
              sx={{ cursor: "pointer" }}
            />
          </Box>

          <Box
            sx={{
              P: 4,
              width: "100%",
              height: "100%",
            }}
          >
            <ModalContent />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
