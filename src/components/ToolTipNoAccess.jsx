import React from "react";
import { Tooltip } from "@mui/material";

export const ToolTipNoAccess = ({ useCodePagarMe, children }) => {
  return (
    <Tooltip
      sx={{ color: "action.active", mr: 1, my: 0.5 }}
      title={
        useCodePagarMe
          ? ""
          : "Acesso bloqueado, por favor assine nosso plano para ter acesso."
      }
    >
      {children}
    </Tooltip>
  );
};
