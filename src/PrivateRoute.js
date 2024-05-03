import { Navigate, Outlet } from "react-router-dom";
import { getUserCookie } from "./services/session";
import { DashboardProvider } from "./contexts/dashboard-context";
import { WebSocketProvider } from "./contexts/web-scoket";

export default function PrivateRoute() {
  // SE O USUARIO NAO ESTIVER LOGADO, REDIRECIONA PARA TELA DE LOGIN
  if (!getUserCookie()) {
    return <Navigate to="/" />;
  }

  return (
    <DashboardProvider>
      <WebSocketProvider>
        <Outlet />
      </WebSocketProvider>
    </DashboardProvider>
  );
}
