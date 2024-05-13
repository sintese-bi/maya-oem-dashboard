import React from 'react';
import { Card, Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SolarPowerIcon from '@mui/icons-material/SolarPower';

const CardComponent = ({ title, description, items, buttonText, action }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        boxShadow:'5',
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center"
        }}
      >
        <Typography
          sx={{
            height: "100%",
            py: 2,
            ml: 2,
            width: "100%",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
        <SolarPowerIcon sx={{ width: 40, height: 40 }}></SolarPowerIcon>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          {description}
        </Typography>
      </Box>
      <List sx={{ pb: 2, width: "100%" }}>
        {items.map((item, index) => (
          <ListItem key={index} sx={{ height: "32px", alignItems: "center" }}>
            <ListItemAvatar>
              {item.icon}
            </ListItemAvatar>
            <ListItemText>
              <Typography sx={{ fontSize: "14px" }}>{item.text}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button
        onClick={() => action()}
        sx={{ mb: 2, width: "90%" }}
        variant="contained"
        disableRipple
        color="success"
      >
        <Typography sx={{ fontWeight: "700", fontSize: "30" }}>{buttonText}</Typography>
      </Button>
    </Card>
  );
};

export default CardComponent;
