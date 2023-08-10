import { Route, Routes } from "react-router-dom";

//LAYOUTS
import LayoutDashboard from "./layouts/LayoutDashboard";
import PrivateRoute from "./PrivateRoute";

// PAGINAS
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import Devices from "./pages/dashboard/devices";
import Generation from "./pages/dashboard/generation";
import Investment from "./pages/dashboard/investment";
import Alerts from "./pages/dashboard/alerts";

import PrivateAdminRoute from "./PrivateAdminRoute";
import ListUsers from "./pages/dashboard/admin/ListUsers";
import { HomePage, AdminCalculator, ClientCalculator } from "./components/calculator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/calculator" element={<HomePage />} />
      <Route path="/calculator/client" element={<ClientCalculator />} />
      <Route path="/calculator/admin" element={<AdminCalculator />} />

      <Route path="dashboard" element={<LayoutDashboard />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          {/* <Route index path="devices" element={<Devices />} /> */}
          <Route path="generation/:brand" element={<Generation />} />
          <Route path="investment/:brand" element={<Investment />} />
          <Route path="alerts/:brand" element={<Alerts />} />
        </Route>

        <Route element={<PrivateAdminRoute />}>
          <Route path="users" element={<ListUsers />} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}