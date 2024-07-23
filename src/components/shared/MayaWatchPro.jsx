import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Radio,
} from "@mui/material";

import { getUserCookie } from "src/services/session";
import { useEffect, useState } from "react";
import AcceptTerm from "src/assets/accept-term.pdf";

export const MayaWatchPro = ({ setTitle }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  useEffect(() => {
    setTitle("Maya Watch PRO");
  }, []);

  const handleAcceptTerm = () => setAcceptedTerms(true);

  const { useEmail } = getUserCookie();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        bgcolor: "background.paper",
        width: "90vw",
      }}
    >
      <>
        <iframe
            title="PDF Viewer"
            src={AcceptTerm} 
            width="100%"
            height="600px"
            frameborder="0"
            style={{ margintop: "10px", marginBottom: "10px" }}
          >
            O seu navegador não suporta PDFs. Recomendamos que atualize ou troque de navegador.
          </iframe>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
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
                onChange={handleAcceptTerm}
              />
            </Box>
            <p style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
              Estou de acordo com o termo de uso.
            </p>
          </Box>
          <Button
            to={`https://buy.stripe.com/7sIeYxc3R8T21oYcNz?prefilled_email=${useEmail}`}
            target="_blank"
            component={Link}
            sx={{ mb: 2, width: "100%" }}
            variant="contained"
            disableRipple
            color="success"
            disabled={!acceptedTerms}
          >
            Prosseguir
          </Button>
        </Box>
        </>
    </Box>
  );
};
