import { listBrand } from "src/utils/list-brand.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUserCookie } from "src/services/session";
import { passwordRecovery } from "src/store/actions/users"
import BackgroundLogin from "../assets/img/illustrations/background-login.svg";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  MenuItem
} from "@mui/material";

const validateSchema = Yup.object().shape({
	new_password: Yup.string().min(6, "O valor mínimo é 0")
        						.max(20, "O valor máximo é 20"),
	confirm_password: Yup.string().min(6, "O valor mínimo é 0")
        							.max(20, "O valor máximo é 20"),
})

export default function PasswordRecovery(){
	const navigate = useNavigate()
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const use_token = searchParams.get("use_token")
	const use_email = searchParams.get("use_email")
	const methods = useForm();
	const { useUuid, useName } = getUserCookie();
	const dispatch = useDispatch();
	const {
   		register,
    	handleSubmit,
    	control,
    	setValue,
    	watch,
    	formState: { errors },
  	} = useForm({
    	mode: "onChange",
    	resolver: yupResolver(validateSchema)
  	});

  	async function onSubmit(values) {
  		const { new_password, confirm_password } = values;
  		try {
  			if(new_password == confirm_password){
  				dispatch(passwordRecovery({new_password, use_token, use_email, navigate}))
  			}
  			setValue("new_password", "")
  			setValue("confirm_password", "")
  		}
  		catch(error) {
  			alert(error)
  		}
  	}

	return (
		<FormProvider {...methods}>
			<Box sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%', 
						height: '100vh',  
						background: `rgba(0, 0, 0, 0.6) url(${BackgroundLogin})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: 'darken'
          }}
       >
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
					boxShadow: 2,
					width: '40%'
				}}
			>
				<Box>
					<Typography sx={{fontWeight: 'bold'}} variant="h5">
						Recuperação de senha
					</Typography>
				</Box>
				<Box sx={{display:'flex', flexDirection: 'column', py: 4}}>           
					<TextField 
						margin="normal"
						label="Nova senha"
						{...register("new_password")}
						error={!!errors.new_password}
						helperText={errors.new_password?.message}
					/>
					<TextField 
						margin="normal"
						label="Confirme sua senha"
						{...register("confirm_password")}
						error={!!errors.confirm_password}
						helperText={errors.confirm_password?.message}
					/>
				</Box>
				<Button
					sx={{
						width: '162px'
					}}
					type="submit"
					variant="contained"
				>
					Confirmar
				</Button>
			</Box>
			</Box>
		</FormProvider>
	)
}