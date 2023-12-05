import { useDispatch, useSelector } from "react-redux";
import { deleteDevice } from "src/store/actions/devices";
import { Delete } from "@mui/icons-material"
import { Avatar, Modal, Backdrop, CircularProgress, Box, Button, Typography} from "@mui/material";
import { useState, useEffect } from 'react'
import {
  Cancel
} from "@mui/icons-material";
export const DeleteDevice = ({ devUuid }) => {
	const [open ,setOpen] = useState(false)
	const dispatch = useDispatch()

	function handleDeleteDeviceModal(){
    	setOpen(!open)
    }

    function handleDeleteDevice(){
    	dispatch(deleteDevice(devUuid))
    	setOpen(!open)
    }

	return(
		<>
			<Avatar onClick={() => {
              setOpen(!open)
        	}}>
        		<Delete />
       		</Avatar>
        	<Modal
        		open={open}
        		onClose={handleDeleteDeviceModal}
        		aria-labelledby="modal-modal-title"
        		aria-describedby="modal-modal-description"
        		sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      		>
        		<Box sx={{bgcolor: 'background.paper', px: 4, pb: 4, borderRadius: 1}}>
        		   	<Box sx={{display: 'flex', justifyContent: 'end', width: '100%', py: 4}}>
          				<Cancel fontSize="large" onClick={() => setOpen(!open)} sx={{cursor: 'pointer'}} />
        			</Box>
        			<Typography sx={{width: '100%', mb: 4}}>Caro usuário, deseja realmente deletar a planta em questão?</Typography>
        			<Button variant="contained" onClick={handleDeleteDevice}>Deletar</Button>
        		</Box>
      		</Modal>
		</>
	)
}