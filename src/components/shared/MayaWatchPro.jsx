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
import { InsertDriveFile, Info } from "@mui/icons-material";
import { getUserCookie } from "src/services/session";

export const MayaWatchPro = () => {
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
      <Box sx={{ width: "90%", mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Maya Watch PRO
        </Typography>
        <Typography variant="body2" sx={{ width: "70%" }}>
          A um passo de liberar todas as funcionalidades PRO do nosso software.
          Tenha relatorios personalizaveis a qualquer hora, configure alertas e
          tenha suporte continuo do nosso time de monitoramento. Veja os planos
          disponiveis abaixo.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "96%",
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
            Plano Watt
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
            <Typography sx={{ fontWeight: "bold", fontSize: "26px", mb: 1 }}>
              R$ 99,00
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>por mês</Typography>
          </Box>
          <List sx={{ py: 2, width: "100%" }}>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>até 50 usinas</Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Alertas de geracao personalizados
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Receba alertas no seu Telegram
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios de todas as usinas
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios usina a usina
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Envio de relatorios automaticos
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Suporte exclusivo Maya
              </Typography>
            </ListItem>
          </List>
          <Button
            to={`https://buy.stripe.com/aEU5nX0l90mw5Fe00n?prefilled_email=${useEmail}`}
            target="_blank"
            component={Link}
            sx={{ mb: 2 }}
            variant="contained"
            disableRipple
            color="primary"
          >
            Assinar plano
          </Button>
        </Card>
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
            Plano kilowatt
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
            <Typography sx={{ fontWeight: "bold", fontSize: "26px", mb: 1 }}>
              R$ 239,00
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>por mês</Typography>
          </Box>
          <List sx={{ py: 2, width: "100%" }}>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>até 100 usinas</Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Alertas de geracao personalizados
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Receba alertas no seu Telegram
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios de todas as usinas
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios usina a usina
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Envio de relatorios automaticos
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Suporte exclusivo Maya
              </Typography>
            </ListItem>
          </List>
          <Button
            to={`https://buy.stripe.com/fZecQp2th4CMc3C4gx?prefilled_email=${useEmail}`}
            target="_blank"
            component={Link}
            sx={{ mb: 2 }}
            variant="contained"
            disableRipple
            color="primary"
          >
            Assinar plano
          </Button>
        </Card>
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
            Plano Megawatt
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
            <Typography sx={{ fontWeight: "bold", fontSize: "26px", mb: 1 }}>
              R$ 459,00
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>por mês</Typography>
          </Box>
          <List sx={{ py: 2, width: "100%" }}>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>até 200 usinas</Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Alertas de geracao personalizados
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Receba alertas no seu Telegram
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios de todas as usinas
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios usina a usina
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Envio de relatorios automaticos
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Suporte exclusivo Maya
              </Typography>
            </ListItem>
          </List>
          <Button
            to={`https://buy.stripe.com/eVa17H7NB8T2gjS14m?prefilled_email=${useEmail}`}
            target="_blank"
            component={Link}
            sx={{ mb: 2 }}
            variant="contained"
            disableRipple
            color="primary"
          >
            Assinar plano
          </Button>
        </Card>
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
            Plano Gigawatt
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
            <Typography sx={{ fontWeight: "bold", fontSize: "26px", mb: 1 }}>
              R$ 629,00
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>por mês</Typography>
          </Box>
          <List sx={{ pb: 2, width: "100%" }}>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>até 300 usinas</Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <Info />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Alertas de geracao personalizados
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Receba alertas no seu Telegram
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios de todas as usinas
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Relatorios usina a usina
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Envio de relatorios automaticos
              </Typography>
            </ListItem>
            <ListItem sx={{ height: "32px" }}>
              <ListItemAvatar>
                <InsertDriveFile />
              </ListItemAvatar>
              <Typography sx={{ fontSize: "14px" }}>
                Suporte exclusivo Maya
              </Typography>
            </ListItem>
          </List>
          <Button
            to={`https://buy.stripe.com/7sI5nX7NB0mwaZydR9?prefilled_email=${useEmail}`}
            target="_blank"
            component={Link}
            sx={{ mb: 2 }}
            variant="contained"
            disableRipple
            color="primary"
          >
            Assinar plano
          </Button>
        </Card>
      </Box>
    </Box>
  );
};
