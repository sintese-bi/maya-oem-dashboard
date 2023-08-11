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

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email("Informe um email valido.")
    .required("E-mail é obrigatório."),
});

export const RecoveryPassword = () => {
	const methods = useForm();

	const {
   		register,
    	handleSubmit,
    	formState: { errors },
  	} = useForm({
    	mode: "onChange",
    	resolver: yupResolver(validateSchema),
  	});

  	async function onSubmit(values) {
  		const { email } = values;

  		try {
  			alert("Email enviado")
  		}
  		catch(error) {
  			alert("email não enviado")
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
					borderRadius: 1
				}}
			>
				<Box sx={{
					mb: 2
				}}>
					<Typography sx={{fontWeight: 'bold', mb: 1}} variant="h5">
						Recuperação de senha
					</Typography>
					<Typography sx={{width: '50%', fontSize:'12px'}}>
						Após confirmar o seu email, enviaremos um link de recuperação para você. 
						Por favor insira o código no passo seguinte
					</Typography>
				</Box>
				<TextField 
					margin="normal"
					label="E-mail"
					{...register("email")}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<Button
					sx={{
						width: '162px'
					}}
					type="submit"
					variant="contained"
				>
					Enviar email 
				</Button>
			</Box>
		</FormProvider>
	)
}