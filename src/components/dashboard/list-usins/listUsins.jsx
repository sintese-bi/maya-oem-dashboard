import { Box, Button, Card, Modal } from "@mui/material";
import Plants from "../total-month/total-month-components/total-month-devices";
import { TopUsins } from "../top-usins/topUsins";
import { useSelector } from "react-redux";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";

export const ListUsins = ({ data, devicesTableRef, type }) => {
  const [open, setOpen] = useState(false);
  const { allDevices } = useSelector((state) => state.users);
  return (
    <Card sx={{ p: 1, width: "100%" }}>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ my: 2 }}>
        Principais usinas.
      </Button>
      <Plants
        title={"Listagem de usinas"}
        data={data}
        devicesTableRef={devicesTableRef}
        type={type}
      />
      <Modal
        keepMounted
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card
          sx={{
            width: "90%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ width: "94%", display: "flex", justifyContent: "end", my: 2 }}
          >
            <Cancel onClick={() => setOpen(false)} sx={{ cursor: "pointer" }} />
          </Box>
          <TopUsins dataDevices={allDevices} />
        </Card>
      </Modal>
    </Card>
  );
};
