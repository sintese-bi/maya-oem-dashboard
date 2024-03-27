import { Cancel, Close, Menu, OpenInBrowser } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import {
  bottomItems,
  mainItems,
  topItems,
} from "src/modal-actions/modal-actions";
import {
  handleRoutes,
  routes,
} from "src/redirection-actions/redirection-actions";
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

import "./mobileNavigation.css";

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

  const handleMobileOpenNavigationState = () => {
    document.querySelector("#openMenuNavigation").style.display = "none";
    document.querySelector("#closeMenuNavigation").style.display = "flex";
    document.querySelector("#mobileNavigation").style.display = "flex";
  };

  const handleMobileCloseNavigationState = () => {
    document.querySelector("#closeMenuNavigation").style.display = "none";
    document.querySelector("#openMenuNavigation").style.display = "flex";
    document.querySelector("#mobileNavigation").style.display = "none";
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
      {handleRoutes().map((route, index) => {
        return (
          <Button
            sx={{ width: 200 }}
            variant="contained"
            color="inherit"
            component={Link}
            to={route.to}
            key={index}
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
    <Box id="mobile">
      <Box id="outlet">
        <Outlet />
      </Box>
    </Box>
  );
};
