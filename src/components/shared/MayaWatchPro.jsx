import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import {
  InsertDriveFile,
  Info,
  OfflinePinOutlined,
  OfflinePinRounded,
} from "@mui/icons-material";
import { getUserCookie } from "src/services/session";
import { useEffect, useState } from "react";
import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import AcceptTerm from "src/assets/accept-term.pdf";

export const MayaWatchPro = ({ setTitle, setDescription }) => {
  const [action, setAction] = useState("assignAction");
  useEffect(() => {
    setTitle("Maya Watch PRO");
    setDescription(`A um passo de liberar todas as funcionalidades PRO do nosso software.
    Tenha relatorios personalizaveis a qualquer hora, configure alertas e
    tenha suporte continuo do nosso time de monitoramento. Veja os planos
    disponiveis abaixo.`);
  }, []);

  const ModalContent = () => {
    switch (action) {
      case "assignAction":
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 320,
              }}
            >
              <Typography
                sx={{
                  height: "100%",
                  bgcolor: "secondary.main",
                  py: 2,
                  width: "100%",
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: "700",
                }}
              >
                Plano MAYA WATCH PRO
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "20px" }}>
                    1 real por usinas
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", fontSize: "26px" }}>
                    /mês
                  </Typography>
                </Box>
              </Box>
              <List sx={{ pb: 2, width: "100%" }}>
                <ListItem sx={{ height: "32px" }}>
                  <ListItemAvatar>
                    <OfflinePinRounded color="success" />
                  </ListItemAvatar>
                  <Typography sx={{ fontSize: "14px" }}>
                    Alertas de geracao personalizados
                  </Typography>
                </ListItem>
                <ListItem sx={{ height: "32px" }}>
                  <ListItemAvatar>
                    <OfflinePinRounded color="success" />
                  </ListItemAvatar>
                  <Typography sx={{ fontSize: "14px" }}>
                    Receba alertas no seu Telegram
                  </Typography>
                </ListItem>
                <ListItem sx={{ height: "32px", opacity: "0.9" }}>
                  <ListItemAvatar>
                    <OfflinePinRounded color="success" />
                  </ListItemAvatar>
                  <Typography sx={{ fontSize: "14px" }}>
                    Relatorios de todas as usinas
                  </Typography>
                </ListItem>
                <ListItem sx={{ height: "32px", opacity: "0.8" }}>
                  <ListItemAvatar>
                    <OfflinePinRounded color="success" />
                  </ListItemAvatar>
                  <Typography sx={{ fontSize: "14px" }}>
                    Relatorios usina a usina
                  </Typography>
                </ListItem>
                <ListItem sx={{ height: "32px", opacity: "0.7" }}>
                  <ListItemAvatar>
                    <OfflinePinRounded color="success" />
                  </ListItemAvatar>
                  <Typography sx={{ fontSize: "14px" }}>
                    Envio de relatorios automaticos
                  </Typography>
                </ListItem>
                <ListItem sx={{ height: "32px", opacity: "0.4" }}>
                  <ListItemAvatar>
                    <OfflinePinRounded color="success" />
                  </ListItemAvatar>
                  <Typography sx={{ fontSize: "14px" }}>
                    Suporte exclusivo Maya
                  </Typography>
                </ListItem>
              </List>
              <Button
                onClick={() => setAction("acceptTerm")}
                component={Link}
                sx={{ mb: 2, width: "90%" }}
                variant="contained"
                disableRipple
                color="success"
              >
                Assinar plano
              </Button>
            </Card>
          </Box>
        );
        break;
      case "acceptTerm":
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <iframe
              title="PDF Viewer"
              src={AcceptTerm} // Substitua pelo caminho real do seu PDF
              width="600px"
              height="376px"
              frameborder="0"
              style={{ margintop: "10px", marginBottom: "10px" }}
            >
              This browser does not support PDFs. Please download the PDF to
              view
            </iframe>
            <Button
              to={`https://buy.stripe.com/7sIeYxc3R8T21oYcNz?prefilled_email=${useEmail}`}
              target="_blank"
              component={Link}
              sx={{ mb: 2, width: "90%" }}
              variant="contained"
              disableRipple
              color="success"
            >
              Prosseguir
            </Button>
          </Box>
        );
        break;
      default:
        break;
    }
  };

  const { useEmail } = getUserCookie();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <ModalContent />
    </Box>
  );
};
