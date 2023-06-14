import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";

// COMPONETS
import { LoadingAccordion } from "./Loading";

// ASSETS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import NumbersIcon from '@mui/icons-material/Numbers';
import BoltIcon from '@mui/icons-material/Bolt';

export const DeviceDetail = (props) => {

  const { name, address, contactNumber, kwp, loadingDevices } = props;

  if (loadingDevices) return <LoadingAccordion />

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >

          Informações do usuário
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container>
          <Grid item xs>
            <List
              sx={{
                width: '90%',
                bgcolor: 'background.paper',
              }}
            >
              <ListItem >
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary="Nº de Contrato" primary={name ? name : 'Não informado!'} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem >
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary="Endereço de Instalação" primary={address ? address : 'Não informado!'} />
              </ListItem>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs sx={{ m: 1 }}>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              <ListItem >
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary="Nome" primary={contactNumber ? contactNumber : 'Não informado!'} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem >
                <ListItemAvatar>
                  <Avatar>
                    <BoltIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary="Potência de Inversor (kWp)" primary={kwp ? kwp : 'Não informado!'} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
};

