import { useEffect } from 'react'
import { listBrand } from "src/utils/list-brand.js";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUserCookie } from "src/services/session";

import { createDevice } from "src/store/actions/devices"
import { getDashboard } from "src/store/actions/users";
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
	bl_login: Yup.string().required("Campo é obrigatório."),
	bl_password: Yup.string().required("Campo é obrigatório.")
})

export const CreateDevice = () => {  
	const {
    deviceCreated
  } = useSelector((state) => state.devices);
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
  		const { bl_login, bl_password, bl_name } = values;
  		try {
  			dispatch(createDevice({ bl_login, bl_password, bl_name, use_uuid: useUuid }))
  			dispatch(getDashboard(useUuid))
  			setValue("bl_login", "")
  			setValue("bl_password", "")
  		}
  		catch(error) {
  			alert(error)
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
					width: 364
				}}
			>
				<Box>
					<Typography sx={{fontWeight: 'bold'}} variant="h5">
						Adicionar portal
					</Typography>
				</Box>
				<Box sx={{display:'flex', flexDirection: 'column', py: 4}}>
          <TextField
            sx={{ width: 200, backgroundColor: 'transparent', px: 1}}
            label="Brands"
            {...register("bl_name")}
            select
            defaultValue="Aurora"
            variant="standard"
          >
            {listBrand.map((data) => (
              <MenuItem key={data.title} value={data.title} sx={{display: 'flex', justifyContent:'space-between'}}>{data.title}</MenuItem>
            ))}
          </TextField>              
					<TextField 
						margin="normal"
						label="Login da planta"
						{...register("bl_login")}
						error={!!errors.deviceLogin}
						helperText={errors.deviceLogin?.message}
					/>
					<TextField 
						margin="normal"
						label="Senha"
						type="password"
						{...register("bl_password")}
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
					Confirmar
				</Button>
			</Box>
		</FormProvider>
	)
}