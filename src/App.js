import { Route, Routes } from "react-router-dom";

//LAYOUTS 
import LayoutDashboard from "./layouts/LayoutDashboard";
import PrivateRoute from "./PrivateRoute";

// PAGINAS
import PasswordRecovery from './pages/passwordRecovery';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import Generation from "./pages/dashboard/generation";
import Investment from "./pages/dashboard/investment";
import Alerts from "./pages/dashboard/alerts";
import AlertDevices from 'src/components/AlertDevices';
import Plants from "src/components/Plants";

import PrivateAdminRoute from "./PrivateAdminRoute";
import ListUsers from "./pages/dashboard/admin/ListUsers";
import { HomePage, AdminCalculator, ClientCalculator } from "./components/calculator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordaRecovery" element={<PasswordRecovery />} />

      <Route path="dashboard" element={<LayoutDashboard />}>
        <Route element={<PrivateRoute />}>
          {/* <Route index path="devices" element={<Devices />} /> */}
          
          <Route path="generation/:brand" element={<Generation />} />
          <Route path="alerts/:brand" element={<Alerts />} />
          <Route path="devices" element={<Plants />} />

        </Route>

        <Route element={<PrivateAdminRoute />}>
          <Route index element={<Dashboard />} />

          <Route path="users" element={<ListUsers />} />
          
          <Route path="alertDevices" element={<AlertDevices />} />
          <Route path="investment/:brand" element={<Investment />} />
          <Route path="calculator" element={<HomePage />} />
          <Route path="calculator/client" element={<ClientCalculator />} />
          <Route path="calculator/admin" element={<AdminCalculator />} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}