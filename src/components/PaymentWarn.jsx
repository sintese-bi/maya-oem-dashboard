import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";

import {
  InsertDriveFile,
  Info,
} from "@mui/icons-material";

export const PaymentWarn = () => {
	return(
		<Box sx={{bgcolor: 'background.paper', px: 4, py: 4, borderRadius: 1, width: '30%'}}>
			<Typography sx={{fontSize: '24px', fontWeight: 'bold', pb: 1}}>Assine nosso plano</Typography>
			<Typography sx={{width: '100%'}}>Assine nosso plano para ter acesso as seguintes funcionalidades:</Typography>
			<List sx={{py: 4}}>
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
			<Button variant="contained"> 
				Assinar Plano
			</Button>
		</Box>
	)
}