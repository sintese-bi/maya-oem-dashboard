import { Home } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { AlertsDefineComponent } from "src/components/sidebar/side-components/alerts/AlertsDefineComponent";
import { DefineAlertEmail } from "src/components/sidebar/side-components/alerts/DefineAlertEmail";
import { MobileTestCustomIndicators } from "../mobile-test-custom-indicators/mobile-test-custom-indicators";

export const MobileTestAlerts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [secondaryAction, setSecondaryAction] = useState("");

  useEffect(() => {
    switch (secondaryAction) {
      case "DefineAlertEmail":
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        break;
    }
  }, [secondaryAction]);

  useEffect(() => {
    switch (currentPage) {
      case 0:
        setTitle("Definição de frequência dos alertas");
        setDescription(`Prezado usuário, definir a frequência e o limite mínimo de produtividade
          das suas plantas. Essa definição controla o envio de alerta das plantas
          para seu email.`);
        break;
      case 1:
        setTitle("Definição do email para alertas");
        setDescription(
          "Por favor, define o email em que deseja receber os alertas!"
        );
        break;
    }
  }, [currentPage]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%", mb: 6 }}>
        <Button
          component={Link}
          to={"/mobile-test"}
          variant="outlined"
          startIcon={<Home />}
        >
          Voltar
        </Button>
      </Box>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Carousel
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        indicatorIconButtonProps={{
          style: {
            color: "#14B8A6",
          },
        }}
        index={currentPage}
        autoPlay={false}
      >
        <Box>
          <AlertsDefineComponent
            setTitle={setTitle}
            setDescription={setDescription}
            setSecondaryAction={setSecondaryAction}
          />
        </Box>
        <Box sx={{ maxWidth: "90vw" }}>
          <DefineAlertEmail
            setTitle={setTitle}
            setDescription={setDescription}
          />
        </Box>
      </Carousel>
      <MobileTestCustomIndicators
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};
