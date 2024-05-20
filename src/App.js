import { Route, Routes } from "react-router-dom";

//LAYOUTS
import LayoutDashboard from "./layouts/LayoutDashboard";
import PrivateRoute from "./PrivateRoute";

import energySchema from "src/assets/img/enery-schema.png";
import Tree from "src/assets/img/TREE.png";
import Cloud from "src/assets/img/CLOUD.png";

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

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import {
  ChartGenerationMonthlyClientReport,
  ChartGenrealdaylasthour,
} from "./components/shared/Charts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ClientReport } from "./components/reports/ClientReport";
import { MobileTest } from "./components/mobile-test/mobile-test";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordaRecovery" element={<PasswordRecovery />} />
      <Route path="/mobile-test" element={<MobileTest />} />
      <Route element={<PrivateRoute />}>
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
