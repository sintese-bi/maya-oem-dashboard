import { WhatsApp } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const ModuleOM = ({ setTitle, setDescription, setOpen, open }) => {
  useEffect(() => {
    setTitle("Módulo O&M");
    setDescription(
      `A operação e manutenção (O&M) de sistemas solares envolve procedimentos técnicos avançados para assegurar a eficiência e a durabilidade
       dos painéis fotovoltaicos e infraestrutura relacionada. Isso inclui a limpeza automatizada dos painéis, a inspeção e manutenção de
      componentes críticos como inversores, sistemas e a utilização de software de monitoramento remoto para análise de dados e detecção 
      proativa de falhas. Além disso, a O&M solar exige conformidade com normas regulatórias específicas e manutenção de registros digitais 
      para rastreamento de desempenho e performance.`
    );
  }, []);
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        component={Link}
        to={"/dashboard/calculator"}
        variant="contained"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Proposta
      </Button>
      <Button
        startIcon={<WhatsApp />}
        variant="outlined"
        color="success"
        onClick={() => {
          window.open(`https://wa.me/+553175900054`, "_blank");
          setOpen(!open);
        }}
      >
        Entrar em contato
      </Button>
    </Box>
  );
};
