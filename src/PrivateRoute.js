import { Navigate, Outlet } from "react-router-dom";
import { getUserCookie } from "./services/session";

export default function PrivateRoute() {
  // SE O USUARIO NAO ESTIVER LOGADO, REDIRECIONA PARA TELA DE LOGIN
  if (!getUserCookie()) {
    return <Navigate to="/" />;
  } else {
    const { profileLevel } = getUserCookie() || null;
    // SE O USUARIO NÃO FOR ADMIN, REDIRECIONA PARA DASHBOARD
    if (profileLevel !== "admin") {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
}
