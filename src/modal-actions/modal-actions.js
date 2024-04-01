import {
  AddCircle,
  AttachMoney,
  Delete,
  FileCopy,
  HelpCenter,
  Info,
  Person,
  Settings,
  ShoppingCart,
  SolarPower,
} from "@mui/icons-material";

export const topItems = [
  {
    label: "Usuário",
    icon: <Person fontSize="small" />,
    action: "userAccount",
  },
];

export const mainItems = [
  {
    label: "Portal",
    icon: <AddCircle fontSize="small" />,
    disabled: true,
    action: "device",
  },
  {
    label: "Relatórios",
    icon: <FileCopy fontSize="small" />,
    disabled: true,
    action: "reports",
  },
  {
    label: "Configurar alertas",
    icon: <Info fontSize="small" />,
    disabled: true,
    action: "alertFrequency",
  },
  {
    label: "Configurar plantas",
    icon: <Settings fontSize="small" />,
    action: "configSetup",
  },
  //{
  //  label: "Configurar portais",
  //  icon: <SettingsApplications fontSize="small" />,
  //  action: "configPortals",
  //},
  //{
  //  label: "Deletar plantas",
  //  icon: <Delete fontSize="small" />,
  //  action: "deletePlants",
  //},
  //{
  //  label: "Módulo de fatura",
  //  icon: <AttachMoney fontSize="small" />,
  //  action: "module-fatura",
  //},
  {
    label: "Plantas deletadas",
    icon: <SolarPower fontSize="small" />,
    action: "deletedPlants",
  },
  {
    label: "Módulo de O&M",
    icon: <SolarPower fontSize="small" />,
    action: "module-orm",
  },
  {
    label: "Central de ajuda",
    icon: <HelpCenter fontSize="small" />,
    action: "help",
  },
];

export const bottomItems = [
  {
    label: "MAYA WATCH PRO",
    icon: <ShoppingCart fontSize="small" />,
    disabled: true,
    action: "assignPlan",
  },
];
