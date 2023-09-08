import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button
} from "@mui/material";
import {
  InsertDriveFile,
  Info,
} from "@mui/icons-material";

export const MayaWatchPro = () => {
	return (
		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' ,bgcolor: 'background.paper', width: '90vw'}}>
			<Box sx={{width: '90%', mb: 12}}>
				<Typography variant="h2" sx={{mb: 4}}>Maya Watch PRO</Typography>
				<Typography variant="body2" sx={{width: '70%'}}>
					Querido usuário, agradeçemos o interesse pelo nosso serviço Maya Watch PRO. Relátorios globais de cada planta
					, relátorios específicos, geração de gráficos para análise de produção e muito mais. Verifique os planos disponíveis abaixo.
				</Typography>
			</Box>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>
				<Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Typography variant="h4" sx={{height: '100%', bgcolor: 'error.light', py: 2, width: 260, textAlign: 'center'}}>
						Plano básico
					</Typography>
					<List sx={{py: 4, width: '100%'}}>
						<ListItem>
							<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>100 usinas</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>Frequência de alertas</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<InsertDriveFile />
							</ListItemAvatar>
							<ListItemText>Geração de relatórios</ListItemText>
						</ListItem>
					</List>
					<Button 
						to="https://buy.stripe.com/fZecQp2th4CMc3C4gx"
                      	target="_blank"
						component={Link}
						sx={{mb: 2}} 
						variant="contained" 
						disableRipple
						color="primary">
						Assinar plano
					</Button>
				</Card>
				<Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Typography variant="h4" sx={{height: '100%', bgcolor: 'primary.light', py: 2, width: 260, textAlign: 'center'}}>
						Plano médio
					</Typography>
					<List sx={{py: 4, width: '100%'}}>
						<ListItem>
							<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>200 usinas</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>Frequência de alertas</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<InsertDriveFile />
							</ListItemAvatar>
							<ListItemText>Geração de relatórios</ListItemText>
						</ListItem>
					</List>
					<Button 
						to="https://buy.stripe.com/eVa17H7NB8T2gjS14m"
                      	target="_blank"
						component={Link}
						sx={{mb: 2}} 
						variant="contained" 
						disableRipple
						color="primary">
						Assinar plano
					</Button>
				</Card>
				<Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Typography variant="h4" sx={{height: '100%', bgcolor: 'success.light', py:2, width: 260, textAlign: 'center'}}>
						Plano PRO
					</Typography>
					<List sx={{py: 4, width: '100%'}}>
						<ListItem>
							<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>300 usinas</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Info />
							</ListItemAvatar>
							<ListItemText>Frequência de alertas</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<InsertDriveFile />
							</ListItemAvatar>
							<ListItemText>Geração de relatórios</ListItemText>
						</ListItem>
					</List>
					<Button 
						to="https://buy.stripe.com/7sI5nX7NB0mwaZydR9"
                      	target="_blank"
						component={Link}
						sx={{mb: 2}} 
						variant="contained" 
						disableRipple
						color="primary">
						Assinar plano
					</Button>
				</Card>
			</Box>
		</Box>
	)
}