import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {useState}from 'react'
import { getUserCookie, removeUserCookie } from "src/services/session";

import AlertPercentageForm from "src/components/AlertPercentageForm";
import { PaymentWarn } from "src/components/PaymentWarn";
import { CreateDevice } from "src/components/CreateDevice";

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
	const [action, setAction] = useState("alertFrequency")
	const [welcome, setWelcome] = useState(true)
	const [open, setOpen] = useState(true)

	const { useUuid, useName } = getUserCookie();
  const useCodePagarMe = (useName == "Maya Energy" || useName == "darcio") ? true : false

  const topItems = [
  	{
  		label: "Usuário",
  		icon: <Info  fontSize="small" />,
  		action: 'userAccount'
  	}
  ]

	const mainItems = [
	 {
	 			label: "Criar nova planta",
      	icon: <AddCircle fontSize="small" />,
      	disabled: true,
      	action: 'createDevice'
	 },
	 {
	 			label: "Configurar alertas",
      	icon: <Info fontSize="small" />,
      	disabled: true,
      	action: 'alertFrequency'
	 },
	]

	const bottomItems = [
		{
			label: "Assinar Plano",
      icon: <CheckCircle fontSize="small" />,
      disabled: true,
      action: 'assignPlan'
		}
	]

	function handleModalState(actionType){
		actionType == "alertFrequency" ? setAction('alertFrequency') : setAction('createDevice')
		setWelcome(false)
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
	 	<Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', overflow: 'auto', height: '100%', width: '240px'}}>
	 		<Box>
	 			<List>
	 			{
	 				topItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="outlined"
              	onClick={() => alert("função não implementada")}
            	>
            		{data?.label}
            	</Button>
	 					</ListItem>
	 				))
	 			}
	 			</List>
	 			<Divider />
	 		</Box>
	 		<List>
	 			{
	 				mainItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="contained"
              	onClick={() => {
              		handleModalState(data?.action)
              	}}
            	>
            		{data?.label}
            	</Button>
	 					</ListItem>
	 				))
	 			}
	 		</List>
	 		<Box>
	 			<Divider />
	 			<List>
	 			{
	 				bottomItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="outlined"
              	onClick={() => alert("função não implementada")}
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
		{
			useCodePagarMe ? (action == "alertFrequency" ? <AlertPercentageForm welcome={welcome} /> : <CreateDevice />) : <PaymentWarn/>
		}
		</Modal>
	 </Drawer>

	)
}
