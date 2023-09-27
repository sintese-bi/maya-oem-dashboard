import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Modal,
  Backdrop,
  CircularProgress,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Cancel, Email } from "@mui/icons-material";
export const SendEmail = ({ devUuid, data }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function handleDeleteDeviceModal() {
    setOpen(!open);
  }

  function handleDeleteDevice() {
    console.log({
      devUuid: devUuid,
      capacity: data[4],
      generationEstimatedDay: data[6],
      generationRealDay: data[7],
      generationEstimatedWeek: data[8],
      generationRealWeek: data[9],
      generationEstimatedMonth: data[10],
      generationRealMonth: data[11],
    });
    setOpen(!open);
  }

  return (
    <>
      <Avatar
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Email />
      </Avatar>
      <Modal
        open={open}
        onClose={handleDeleteDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{ bgcolor: "background.paper", px: 4, pb: 4, borderRadius: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              py: 4,
            }}
          >
            <Cancel
              fontSize="large"
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Typography sx={{ width: "100%", mb: 4 }}>
            Caro usuário, confirme que deseja realizar o envio do relatório por
            email !
          </Typography>
          <Button variant="contained" onClick={handleDeleteDevice}>
            Enviar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
