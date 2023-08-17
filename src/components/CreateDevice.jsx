import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

export const CreateDevice = () => {
	const methods = useForm();

	const {
   		register,
    	handleSubmit,
    	formState: { errors },
  	} = useForm({
    	mode: "onChange",
  	});

  	async function onSubmit(values) {
  		const { deviceLogin, devicePassword } = values;
  		try {
  			alert("função não implementada")
  		}
  		catch(error) {
  			alert("função não implementada")
  		}
  	}

	return (
		<FormProvider {...methods}>
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					py: 6, 
					px:4, 
					bgcolor:"background.paper",
					borderRadius: 1,
					width: '40%'
				}}
			>
				<Box>
					<Typography sx={{fontWeight: 'bold'}} variant="h5">
						Criação de planta
					</Typography>
				</Box>
				<Box sx={{display:'flex', flexDirection: 'column', py: 4}}>
					<TextField 
						margin="normal"
						label="Login da planta"
						{...register("deviceLogin")}
						error={!!errors.deviceLogin}
						helperText={errors.deviceLogin?.message}
					/>
					<TextField 
						margin=""
						label="Senha"
						{...register("devicePassword")}
						error={!!errors.devicePassword}
						helperText={errors.devicePassword?.message}
					/>
				</Box>
				<Button
					sx={{
						width: '162px'
					}}
					type="submit"
					variant="contained"
				>
					Criar planta
				</Button>
			</Box>
		</FormProvider>
	)
}