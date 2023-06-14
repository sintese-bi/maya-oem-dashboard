import { Navigate, Outlet } from "react-router-dom";
import { getUserCookie } from "./services/session";

export default function PrivateRoute() {

  if (!getUserCookie()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
