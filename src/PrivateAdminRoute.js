import { Navigate, Outlet } from "react-router-dom";
import { getUserCookie } from "./services/session";

export default function PrivateAdminRoute() {
  if (!getUserCookie()) {
    return <Navigate to="/" />;
  } else {
    const { profileLevel } = getUserCookie() || null;
    if (profileLevel !== "admin") {
      return <Navigate to="/dashboard" />;
    }
  }

  return <Outlet />;
}
