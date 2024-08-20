import { AccountCircle, AttachMoney } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { getUserCookie } from "src/services/session";

export function handleRoutes() {
  const { profileLevel, useName } = getUserCookie();

  const routes = [
    {
      label: "Home",
      to: "/dashboard",
      icon: <AccountCircle fontSize="small" />,
      disabled: profileLevel === "admin" ? true : false,
    },
    {
      label: "Clientes",
      to: "/dashboard/users",
      icon: <AccountCircle fontSize="small" />,
      disabled:
        profileLevel === "admin" && useName == "Maya Energy" ? true : false,
    },
    //{
    //  label: "Manager",
    //  to: "/dashboard/manager",
    //  icon: <AttachMoney fontSize="small" />,
    //  disabled:
    //    profileLevel === "admin" && useName == "Maya Energy" ? true : false,
    //},
    //{
    //  label: "Plantas",
    //  to: "/dashboard/devices",
    //  icon: <AccountCircle fontSize="small" />,
    //  disabled: true,
    //  active: location.pathname === "/dashboard/devices" ? true : false,
    //},
  ];

  return routes;
}
