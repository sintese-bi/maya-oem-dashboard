import { Route, Routes } from "react-router-dom";

//LAYOUTS
import LayoutDashboard from "./layouts/LayoutDashboard";
import PrivateRoute from "./PrivateRoute";

// PAGINAS
import PasswordRecovery from "./pages/passwordRecovery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import Generation from "./pages/dashboard/generation";
import Investment from "./pages/dashboard/investment";
import Alerts from "./pages/dashboard/alerts";
import AlertDevices from "src/components/alerts/AlertDevices";
import Plants from "src/components/dashboard/total-month/total-month-components/total-month-devices";

import PrivateAdminRoute from "./PrivateAdminRoute";
import ListUsers from "./pages/dashboard/admin/ListUsers";
import {
  HomePage,
  AdminCalculator,
  ClientCalculator,
} from "./components/calculator";
import { FaturaModulo } from "./components/modules/faturaModule";
import { ClientReport } from "./components/reports/ClientReport";
import { MobileTest } from "./components/mobile-test/mobile-test";
import { MobileTestAlerts } from "./components/mobile-test/mobile-test-alerts/mobile-test-alerts";
import { MobileTestReports } from "./components/mobile-test/mobile-test-reports/mobile-test-reports";
import { MobileTestDados } from "./components/mobile-test/mobile-test-dados/mobile-test-dados";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordaRecovery" element={<PasswordRecovery />} />

      <Route element={<PrivateRoute />}>
        <Route path="/mobile-test">
          <Route index element={<MobileTest />} />
          <Route path="alerts" element={<MobileTestAlerts />} />
          <Route path="reports" element={<MobileTestReports />} />
          <Route path="data" element={<MobileTestDados />} />
        </Route>
        <Route path="dashboard" element={<LayoutDashboard />}>
          <Route index element={<Dashboard />} />
          {/* <Route index path="devices" element={<Devices />} /> */}
          <Route path="generation/:brand" element={<Generation />} />
          <Route path="alerts/:brand" element={<Alerts />} />
          <Route index path="devices" element={<Plants />} />

          <Route element={<PrivateAdminRoute />}>
            <Route path="report" element={<ClientReport />} />
            <Route path="alertDevices" element={<AlertDevices />} />
            <Route path="manager" element={<FaturaModulo />} />
            <Route path="investment/:brand" element={<Investment />} />
            <Route path="calculator" element={<HomePage />} />
            <Route path="calculator/client" element={<ClientCalculator />} />
            <Route path="calculator/admin" element={<AdminCalculator />} />
            <Route path="users" element={<ListUsers />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
