import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { getUserCookie, removeUserCookie } from "src/services/session";

// COMPONENTS
import { Drawer, Box, Button, Toolbar, Typography, Divider, List, ListItem, ListItemText,ListItemButton, ListItemIcon } from "@mui/material";
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
  Error
} from "@mui/icons-material";

export const Side = () => {
	const mainItems = [
	 {
	 			label: "Assinar Plano",
      	icon: <CheckCircle fontSize="small" />,
      	disabled: true,
      	color: "success.main"
	 },
	 {
	 			label: "Criar nova planta",
      	icon: <AddCircle fontSize="small" />,
      	disabled: true,
      	color: "primary.main"
	 },
	]

	const secondItems = [
		{
			label: "Cancelar Plano",
     	icon: <Error fontSize="small" />,
     	disabled: true,
     	color: "error.dark"
		}
	]

	return(
	 <Drawer
	 	variant="permanent"
	 	sx={{
          	backgroundColor: theme.palette.background.paper,
          	boxShadow: theme.shadows[3],
          	flexShrink: 0,
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
              	sx={{ color: "primary" }}
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
	 				secondItems.map((data, index) => (
	 					<ListItem key={data?.label} >
	 						<Button
              	startIcon={data?.icon}
              	variant="contained"
              	sx={{ color: "primary" }}
            	>
            		{data?.label}
            	</Button>
	 					</ListItem>
	 				))
	 			}
	 			</List>
	 		</Box>
	 	</Box>
	 </Drawer>
	)
}