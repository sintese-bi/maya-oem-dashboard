import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {useState}from 'react'
import { getUserCookie, removeUserCookie } from "src/services/session";

import AlertPercentageForm from "src/components/AlertPercentageForm";

// COMPONENTS
import { Drawer, Box, Button, Toolbar, Typography, Modal, Divider, List, ListItem, ListItemText,ListItemButton, ListItemIcon } from "@mui/material";
import { theme } from "src/theme";
import {
  AccountCircle,
  BrandingWatermark,
  Dashboard,
  ExitToApp,
  House,
  Inbox,
  DownloadForOffline,
  CheckCircle,
  AddCircle,
  Error,
  Info
} from "@mui/icons-material";

export const Side = () => {
	const mainItems = [
	 {
	 			label: "Assinar Plano",
      	icon: <CheckCircle fontSize="small" />,
      	disabled: true,
	 },
	 {
	 			label: "Criar nova planta",
      	icon: <AddCircle fontSize="small" />,
      	disabled: true,
	 },
	]

	const secondItems = [
		{
			label: "Cancelar Plano",
     	icon: <Error fontSize="small" />,
     	disabled: true,
     	color: "error"
		}
	]

	const [open, setOpen] = useState(false)

	function handleModalState(){
		setOpen(!open)
	}

	return(
	 <Drawer
	 	variant="permanent"
	 	sx={{
          	backgroundColor: theme.palette.background.paper,
          	boxShadow: theme.shadows[3],
	 	}}
	 > 
	 	<Toolbar />
	 	<Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', overflow: 'auto', pt: 6, height: '100%', width: '240px'}}>
	 		<List>
	 			{
	 				mainItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="contained"
            	>
            		{data?.label}
            	</Button>
	 					</ListItem>
	 				))
	 			}
	 			<ListItem >
	 					<Button
              startIcon={<Info fontSize="small" />}
              variant="contained"
              onClick={handleModalState}
            >
            	Frequência de alertas
           </Button>
	 			</ListItem>
	 		</List>
	 		<Box>
	 			<Divider />
	 			<List>
	 			{
	 				secondItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="outlined"
              	color={data?.color}
            	>
            		{data?.label}
            	</Button>
	 					</ListItem>
	 				))
	 			}
	 			</List>
	 		</Box>
	 	</Box>
	 	<Modal
  		open={open}
  		onClose={handleModalState}
  		aria-labelledby="modal-modal-title"
  		aria-describedby="modal-modal-description"
  		sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
		>
  		<AlertPercentageForm />
		</Modal>
	 </Drawer>

	)
}