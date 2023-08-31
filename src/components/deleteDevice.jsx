import { useDispatch, useSelector } from "react-redux";
import { deleteDevice } from "src/store/actions/devices";
import { Delete } from "@mui/icons-material"
import { Avatar, Modal, Backdrop, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react'

export const DeleteDevice = ({ devUuid }) => {
	const dispatch = useDispatch()
	function handleDeleteDevice(){
          dispatch(deleteDevice(devUuid))
    }

	return(
		<>
			<Avatar onClick={() => {
              handleDeleteDevice()
        }}>
        	<Delete />
        </Avatar>
		</>
	)
}