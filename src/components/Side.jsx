import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {useState}from 'react'
import { getUserCookie, removeUserCookie } from "src/services/session";

import AlertPercentageForm from "src/components/AlertPercentageForm";
import { PaymentWarn } from "src/components/PaymentWarn";
import { CreateDevice } from "src/components/CreateDevice";
import{ MayaWatchPro } from "src/components/MayaWatchPro";

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
  Info,
  Cancel
} from "@mui/icons-material";

export const Side = () => {
	const [action, setAction] = useState("alertFrequency")
	const [welcome, setWelcome] = useState(true)
	const [open, setOpen] = useState(true)

	const { useUuid, useName } = getUserCookie();
  const useCodePagarMe = (useName == "Maya Energy" || useName == "darcio") ? true : false

  const ModalContent = () => {
  	switch (action) {
      case 'alertFrequency':
        return (
        	<Box>
    				{useCodePagarMe ? <AlertPercentageForm welcome={welcome} /> : <PaymentWarn welcome={welcome} handleModalState={handleModalState} />}
    			</Box>
        )
        break;
      case 'createDevice':
      	return (
      		<Box>
    				<CreateDevice />
    			</Box>
      	)
      	break;
      case 'assignPlan':
      	return (
      		<Box>
    				<MayaWatchPro />
    			</Box>
      	)
      	break;
      default:
        break;
    }
  }

  const topItems = [
  	{
  		label: "Usuário",
  		icon: <Info  fontSize="small" />,
  		action: 'userAccount'
  	}
  ]

	const mainItems = [
	 {
	 			label: "Adicionar portal",
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
			label: "MAYA WATCH PRO",
      icon: <CheckCircle fontSize="small" />,
      disabled: true,
      action: 'assignPlan'
		}
	]


	function handleModalState(actionType){
		if(action == 'alertFrequency' && actionType == 'assignPlan'){
			setAction(actionType)			
			setOpen(true)
		} else {
			setAction(actionType)
			setWelcome(false)
			setOpen(!open)
		}
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
	 	<Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'start', overflow: 'auto', height: '100%', width: '240px'}}>
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
              		setAction(data?.action)
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
	 			<List>
	 			{
	 				bottomItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="outlined"
              	onClick={() => {
              		handleModalState(data?.action)
              		setAction(data?.action)
              	}}
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
			<Box sx={{
					bgcolor: 'background.paper',
					pb: 6, 
					px:4, 
					bgcolor:"background.paper",
					borderRadius: 1,
					border: 0
				}}>
				<Box sx={{display: 'flex', justifyContent: 'end', width: '100%', py: 4}}>
		  		<Cancel fontSize="large" onClick={() => setOpen(!open)} sx={{cursor: 'pointer'}} />
		  	</Box>
		  	
		  		<ModalContent />
				
			</Box>
		</Modal>
	 </Drawer>

	)
}
