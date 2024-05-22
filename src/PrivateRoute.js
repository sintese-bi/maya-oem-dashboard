import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserCookie } from "./services/session";
import { DashboardProvider } from "./contexts/dashboard-context";
import { WebSocketProvider } from "./contexts/web-scoket";
import { useEffect } from "react";

export default function PrivateRoute() {
  // SE O USUARIO NAO ESTIVER LOGADO, REDIRECIONA PARA TELA DE LOGIN
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUserCookie()) {
      navigate("/");
    } else {
      if (window.innerWidth <= 425 && window.innerHeight <= 690) {
        navigate("/mobile");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

  return (
    <DashboardProvider>
      <WebSocketProvider>
        <Outlet />
      </WebSocketProvider>
    </DashboardProvider>
  );
}
