import {
  Link,
  useLocation,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./side.css";
import {
  getUserCookie,
  removeUserCookie,
  setUserCookie,
} from "src/services/session";

import AlertPercentageForm from "src/components/sidebar/side-components/AlertPercentageForm";
import { PaymentWarn } from "src/components/shared/PaymentWarn";
import { Portal } from "src/components/portals/Portal";
import { MayaWatchPro } from "src/components/shared/MayaWatchPro";

// COMPONENTS
import {
  Drawer,
  Box,
  Button,
  Toolbar,
  Typography,
  Modal,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { theme } from "src/theme";
import {
  AccountCircle,
  BrandingWatermark,
  Dashboard,
  ExitToApp,
  House,
  Inbox,
  DownloadForOffline,
  CheckCircle,
  AddCircle,
  Error,
  Info,
  Cancel,
  Settings,
  Delete,
  Person,
  ShoppingCart,
  Money,
  MoneyOffCsredOutlined,
  AttachMoney,
  SolarPower,
  FileCopy,
  HelpCenter,
  SettingsApplications,
} from "@mui/icons-material";
import { UserInfo } from "./side-components/UserInfo";
import { DefineCapacityAndDevicesEmails } from "./side-components/alerts/DefineCapacityAndDevicesEmails";
import { ModuleOM } from "../modules/moduleO&M";
import { FaturaModulo } from "../modules/faturaModule";
import { Reports } from "../reports/Reports";
import { Help } from "../help/help";
import { ConfigPortals } from "../configPortals/configPortal";
import {
  bottomItems,
  mainItems,
  topItems,
} from "src/modal-actions/modal-actions";
import { DeletedDevicesModal } from "../deleted-devices-modal/deletedDevicesModal";
import { useSelector } from "react-redux";
import { deleteDevice } from "src/store/actions/devices";
import { DashboardContext } from "src/contexts/dashboard-context";
import { AlertsModal } from "../alerts-modal/alerts-modal";

export const Side = ({ sideState, setSideState }) => {
  const {
    useName,
    useTypeMember,
    useEmail,
    firstTime,
    useUuid,
    useCityState,
    useTelephone,
  } = getUserCookie();

  const { deletedDevices } = useContext(DashboardContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState(
    firstTime ? "alertFrequency" : "deletedPlants"
  );
  const [secondaryAction, setSecondaryAction] = useState(
    "AlertsDefineComponent"
  );
  const [welcome, setWelcome] = useState(true);
  const [open, setOpen] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideState(open);
  };

  useEffect(() => {
    setWelcome(firstTime);
  }, [firstTime]);

  const ModalContent = () => {
    switch (action) {
      case "deletedPlants":
        return (
          <Box>
            <DeletedDevicesModal
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
              welcome={welcome}
              setOpen={setOpen}
              open={open}
              setTitle={setTitle}
              setDescription={setDescription}
              setAction={setAction}
              deletedDevices={deletedDevices}
            />
          </Box>
        );
        break;
      case "devicesWithAlert":
        return (
          <Box>
            <AlertsModal
              secondaryAction={secondaryAction}
              setSecondaryAction={setSecondaryAction}
              welcome={welcome}
              setOpen={setOpen}
              open={open}
              setTitle={setTitle}
              setDescription={setDescription}
              setAction={setAction}
            />
          </Box>
        );
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
          <Box>
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

  return (
    <Drawer variant="permanent" anchor="left" id="sidebar">
      <Box
        id="sidebar"
        sx={{
          bgcolor: "background.paper",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.4)",
          height: "100%",
        }}
      >
        <Box
          className="sidebar-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            overflow: "auto",
            height: "100%",
            width: sideState ? 236 : 100,
          }}
        >
          <Toolbar />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {topItems.map((data, index) => (
              <ListItem key={data?.label}>
                {sideState ? (
                  <Button
                    startIcon={data?.icon}
                    variant="outlined"
                    onClick={() => {
                      setAction(data?.action);
                      handleModalState(data?.action);
                    }}
                  >
                    {data?.label}
                  </Button>
                ) : (
                  <Button
                    sx={{
                      color: "neutral.700",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setAction(data?.action);
                      handleModalState(data?.action);
                    }}
                  >
                    {data?.icon}
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      {data?.label}
                    </Typography>
                  </Button>
                )}
              </ListItem>
            ))}
            {mainItems.map((data, index) => (
              <ListItem key={data?.label}>
                {sideState ? (
                  <Button
                    startIcon={data?.icon}
                    variant="contained"
                    onClick={() => {
                      if (data?.action == "deletePlants") {
                        window.scrollTo(0, 2000);
                      } else {
                        setAction(data?.action);
                        handleModalState(data?.action);
                      }
                    }}
                  >
                    {data?.label}
                  </Button>
                ) : (
                  <Button
                    sx={{
                      color: "neutral.700",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      if (data?.action == "deletePlants") {
                        window.scrollTo(0, 2000);
                      } else {
                        setAction(data?.action);
                        handleModalState(data?.action);
                      }
                    }}
                  >
                    {data?.icon}
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      {data?.label}
                    </Typography>
                  </Button>
                )}
              </ListItem>
            ))}
            {bottomItems.map((data, index) => (
              <ListItem key={data?.label}>
                {sideState ? (
                  <Button
                    startIcon={data?.icon}
                    variant="contained"
                    onClick={() => {
                      if (data?.action == "deletePlants") {
                        window.scrollTo(0, 2000);
                      } else {
                        setAction(data?.action);
                        handleModalState(data?.action);
                      }
                    }}
                  >
                    {data?.label}
                  </Button>
                ) : (
                  <Button
                    sx={{
                      color: "neutral.700",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      if (data?.action == "deletePlants") {
                        window.scrollTo(0, 2000);
                      } else {
                        setAction(data?.action);
                        handleModalState(data?.action);
                      }
                    }}
                  >
                    {data?.icon}
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      {data?.label}
                    </Typography>
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        <Modal
          open={open}
          onClose={handleModalState}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
          }}
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
              <Box sx={{ width: "620px" }} id="labelingModals">
                <Typography variant="h4">{title}</Typography>
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
    </Drawer>
  );
};
