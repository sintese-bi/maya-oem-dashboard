import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { InsertDriveFile, Info } from "@mui/icons-material";
import { getUserCookie, setUserCookie } from "src/services/session";

export const PaymentWarn = ({
  welcome,
  handleModalState,
  handleReportGeneration,
}) => {
  const { useUuid, useName, profileLevel, useTypeMember } = getUserCookie();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        px: 4,
        borderRadius: 1,
        width: "100%",
      }}
    >
      {welcome ? (
        <Typography variant="h2" sx={{ pb: 4 }}>
          Bem vindo
        </Typography>
      ) : null}
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", pb: 1 }}>
        Assine nosso plano
      </Typography>
      <Typography sx={{ width: "100%" }}>
        Assine nosso plano para ter acesso as seguintes funcionalidades:
      </Typography>
      <List sx={{ py: 4 }}>
        <ListItem>
          <ListItemAvatar>
            <Info />
          </ListItemAvatar>
          <ListItemText>Frequência de alertas</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <InsertDriveFile />
          </ListItemAvatar>
          <ListItemText>Geração de relatórios</ListItemText>
        </ListItem>
      </List>
      <Button
        variant="contained"
        onClick={() => {
          handleModalState
            ? handleModalState("assignPlan")
            : handleReportGeneration("assignPlan");
        }}
      >
        Assinar Plano
      </Button>
    </Box>
  );
};
