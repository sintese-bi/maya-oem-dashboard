import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import App from "./App";
import { theme } from "./theme";
import { BrandsContextProvider } from "./context/BrandsContext";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

import "./global.css";
import "moment/locale/pt-br";
// import "react-widgets/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrandsContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster />
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </BrandsContextProvider>
  </>
);
