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
  Radio,
} from "@mui/material";

import {
  InsertDriveFile,
  Info,
  OfflinePinOutlined,
  OfflinePinRounded,
  CancelSharpIcon ,
  
} from "@mui/icons-material";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';




 import CardComponent from "./CardComponent";


import { getUserCookie } from "src/services/session";
import { useEffect, useState } from "react";
import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import AcceptTerm from "src/assets/accept-term.pdf";
import { CancelOutlined, CancelPresentation } from "@material-ui/icons";


export const MayaWatchPro = ({ setTitle, setDescription }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [action, setAction] = useState("assignAction");
  useEffect(() => {
    setTitle("Maya Watch PRO");
  }, []);

const basic = [{
  basico:{
    title:"Maya watch"
  }
}
]


const handleAction = () => { setAction("acceptTerm")};
 
const cardContents = {
  basic: {
    title: "Maya Watch",
    description: "Nesse plano você contará com:",
    items: [
      { icon: <CheckCircleIcon color="success" />, text: "Alertas de geração personalizados" },
      { icon: <CheckCircleIcon color="success" />, text: "Receba alertas no seu WhatsApp" },
      { icon: <CheckCircleIcon color="success" />, text: "Relatórios de todas as usinas" },
      { icon: <CheckCircleIcon color="success" />, text: "Gestão de desempenho " },
      { icon: <CheckCircleIcon color="success" />, text: "Envio de relatórios automáticos" },
      { icon: <CheckCircleIcon color="success" />, text: "Faturas de energia" },
      { icon: <CancelIcon color="error" />, text: "Suporte exclusivo Maya" },
      { icon: <CancelIcon color="error" />, text: "Faturas e cenários de geração via IA " },

    ],
    buttonText: "Assinar plano",
    price:"R$ 1,00 por usinas/mês",
    action: handleAction
  },
  advanced: {
    title: "Maya Watch Pro",
    description: "Nesse plano PRO você contará com:",
    items: [
      { icon: <CheckCircleIcon color="success" />, text: "Alertas de geração personalizados" },
      { icon: <CheckCircleIcon color="success" />, text: "Receba alertas no seu WhatsApp" },
      { icon: <CheckCircleIcon color="success" />, text: "Relatórios de todas as usinas" },
      { icon: <CheckCircleIcon color="success" />, text: "Gestão de desempenho " },
      { icon: <CheckCircleIcon color="success" />, text: "Envio de relatórios automáticos" },
      { icon: <CheckCircleIcon color="success" />, text: "Faturas de energia" },
      { icon: <CheckCircleIcon color="success" />, text: "Suporte exclusivo Maya" },
      { icon: <CancelIcon color="error" />, text: "Faturas e cenários de geração via IA " },

      
    ],
    buttonText: "Assinar plano",
    price:"R$ 5,00 por usinas/mês",
    action: handleAction

  },
  premium: {
    title: "Maya Watch Pro Max",
    description: "Nesse plano premium você contará com:",
    items: [
      { icon: <CheckCircleIcon color="success" />, text: "Alertas de geração personalizados" },
      { icon: <CheckCircleIcon color="success" />, text: "Receba alertas no seu WhatsApp" },
      { icon: <CheckCircleIcon color="success" />, text: "Relatórios de todas as usinas" },
      { icon: <CheckCircleIcon color="success" />, text: "Gestão de desempenho " },
      { icon: <CheckCircleIcon color="success" />, text: "Envio de relatórios automáticos" },
      { icon: <CheckCircleIcon color="success" />, text: "Faturas de energia" },
      { icon: <CheckCircleIcon color="success" />, text: "Suporte exclusivo Maya" },
      { icon: <CheckCircleIcon color="success" />, text: "Faturas e cenários de geração via IA " },
    ],
    price:"R$ 7,00 por usinas/mês",
    buttonText: "Assinar plano",
    action: handleAction
  }
};



  const ModalContent = () => {
    switch (action) {
      case "assignAction":
        return (
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width:1000,
            bgcolor: "background.paper",
          }}> 
          <Box sx={{boxShadow:10}}>
            <CardComponent{...cardContents.basic}/>
          </Box>
              <Box sx={{boxShadow:10}}>
                    <CardComponent{...cardContents.advanced}/>
              </Box>
              <Box sx={{boxShadow:10}}>
                <CardComponent{...cardContents.premium}/>
              </Box>
              
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                my: 2,
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                Você está de acordo com nossos termos?
              </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Radio
                  checked={acceptedTerms}
                  value="true"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Button
              to={`https://buy.stripe.com/7sIeYxc3R8T21oYcNz?prefilled_email=${useEmail}`}
              target="_blank"
              component={Link}
              sx={{ mb: 2, width: "90%" }}
              variant="contained"
              disableRipple
              color="success"
              disabled={!acceptedTerms}
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
