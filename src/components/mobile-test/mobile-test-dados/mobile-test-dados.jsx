import { Home } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const MobileTestDados = () => {
 

 

  return (
    <Box sx={{
      width:"100vw",
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Box sx={{width:"100%" ,mb:10}}>
        <Button 
         component={Link}
        variant="outlined"
        to={"/mobile-test"}
        startIcon={<Home/>}
        >Voltar</Button>
          
          
      <Box sx={{
        
        

      }}>
        <Typography variant="h5">Defina o intervalo de dados:</Typography>
      </Box>











      </Box>
    </Box>
  );
};
