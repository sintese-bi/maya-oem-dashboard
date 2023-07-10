// IMPORTS ----------------------------------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// LIBS DE ESTILOS ----------------------------------------
import {
	Button,
	CssBaseline,
	Box,
	Grid,
	Typography,
	Divider,
	CircularProgress,
	MobileStepper,
	CardMedia,
	TextField,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	FormLabel,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// ACTIONS ----------------------------------------
import { checkBrnad, show } from '../store/actions/users';

// ASSETS ----------------------------------------
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';

// HELP's, UTILS & VARIAVEIS ---------------------
import { listBrand } from 'src/utils/list-brand';

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = createTheme();

	const { useEmail, useName, loadingShow, loadingRegister } = useSelector((state) => state.users);

	const useUuid = 'a7ed2d10-4340-43df-824d-63ca16979114';
	const [brand, setBrand] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isSearchable, setIsSearchable] = useState(true);
	const [password, setPassword] = useState('');
	const animatedComponentsMultiselect = makeAnimated();

	// LISTAGEM DAS BRAND PARA O MULTI SELECT
	const brands = listBrand.map((item) => {
		return {
			params: item.params,
			title: item.title,
			url: item.url,
			label: item.title,
			value: item.params,
		};
	});

	// VALIDATIONS SCHEMAS
	const brandsSchema = yup.object().shape({
		login: yup.string().required('O login é obrigatório'),
		password: yup
			.string()
			.min(2, 'A senha deve ter pelo menos 2 caracteres')
			.required('Senha obrigatória'),
	});

	const userValidationSchema = yup.object().shape({
		name: yup.string(),
		email: yup.string().email(),
		password: yup
			.string()
			.trim()
			.required('Senha obrigatória')
			.min(6, 'A senha deve ter pelo menos 6 caracteres'),
		confirmPassword: yup
			.string()
			.trim()
			.required('Confirmação de senha obrigatória')
			.oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
		cnh_rg: yup.mixed().required('É necessário adicionar o comprovante para validação'),
		address_proof: yup.mixed().required('É necessário adicionar documentos para validação'),
		photo: yup.mixed().required('É necessário adicionar uma foto para validação'),
		brands: yup.array().of(brandsSchema).min(1, 'Selecionar a marca dos inversores é obrigatório.'),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		register,
	} = useForm({ resolver: yupResolver(userValidationSchema) });

	// SUBEMETER DADOS PARA A ACTION
	// const oldhandleSubmit = async (event) => {
	// 	event.preventDefault();

	// 	//	LIBERANDO ACESSO PARA SUBMETER OS DADOS
	// 	// 		if (
	// 	// 			!validatePassword &&
	// 	// 			!validateConfirmPassword &&
	// 	// 			!validateInverterNumbers &&
	// 	// 			validateBrandLogin.length === 0 &&
	// 	// 			validateBrandPassword.length === 0
	// 	// 		) {
	// 	// 			dispatch(checkBrnad({ ...requestForm, use_uuid: useUuid })); // ACTION DE CHECK LOGIN DAS BRAND

	// 	try {
	// 		await userValidationSchema.validate(requestForm, { abortEarly: false });
	// 		dispatch(checkBrnad({ ...requestForm, use_uuid: useUuid }));
	// 	} catch (error) {}
	// };
	const onSubmit = (data) => {
		console.log(data);
	};
	// SETAR VALORES DO OBJETO brand_login
	// const handleSetBrandLogin = (e, index) => {
	// 	const { name } = e.target;
	// 	const { value } = e.target;

	// 	requestForm.brand_login[index][name] = value;
	// 	setRequestForm(requestForm);
	// };

	// SETAR VALORES DOs INPUTS
	// const handleSetForm = (e) => {
	// 	const { name, value } = e.target;

	// 	requestForm[name] = value;
	// 	setRequestForm(requestForm);
	// };

	// const handleDocument = (evt) => {
	// 	const { name, files } = evt.target;

	// 	requestForm[name] = files[0];
	// 	setRequestForm(requestForm);
	// };

	// CONTROLE DO SELECT
	const handleSelect = (brandsArray) => {
		const brandsForLogin = brandsArray.map((item) => ({
			bl_title: item.title,
			bl_name: item.params,
			bl_login: '',
			bl_password: '',
			bl_url: item.url,
		}));
		// setRequestForm((prevForm) => ({ ...prevForm, brand_login: brandsForLogin }));
		// console.log(requestForm, 'log do request form');
		setActiveStep(0); // VOLTANDO PARA O PRIMEIRO SLIDE
	};

	// ----------------------------------------
	// useEffect's

	useEffect(() => {
		if (useUuid) dispatch(show(useUuid)); // BUSCAR email e nome do USUARIO
	}, [useUuid, dispatch]);

	// VISIBILIDADE DA SENHA

	const handlePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	// DOCUMENTOS
	const [selectedFiles, setSelectedFiles] = useState([]);
	const handleFileChange = (files) => {
		setSelectedFiles(Array.from(files).map((file) => file.name));
	};

	const handleRemoveFile = (index) => {
		setSelectedFiles((prevFiles) => {
			const newFiles = [...prevFiles];
			newFiles.splice(index, 1);
			return newFiles;
		});
	};

	// ----------------------------------------
	// CONTROLE DO SETP DOS INPUTS DE LOPGIN DAS BRANDS
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = brand.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
		console.log(step, 'step change');
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid
				container
				component="main"
				sx={{ height: '100vh', fontSize: '16px' }}>
				<CssBaseline />

				<Grid
					item
					sm={4}
					md={7}
					alignItems="center"
					display="flex"
					flexDirection="column">
					<CardMedia
						item
						component="img"
						src="https://raw.githubusercontent.com/sintese-bi/assets-public/master/maya-oem/logo-maya-oem.png"
						style={{ objectFit: 'fill', height: '190px', width: '334px', marginTop: '56px' }}
					/>
					<Typography
						item
						variant="h6"
						component="h2"
						fontWeight="700"
						marginTop={'44px'}>
						Falta pouco para você ter acesso ao Dashboard!
					</Typography>
					<CardMedia
						item
						component="img"
						src="https://raw.githubusercontent.com/sintese-bi/assets-public/master/maya-oem/registerScreenDashboard.png"
						style={{ height: '492px', width: '569px' }}
					/>
				</Grid>

				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					sx={{
						backgroundColor: '#106CC4',
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
					}}>
					{/* CARREGANDO REQUISIÇÃO DE REGISTRO */}
					{loadingRegister && (
						<div
							style={{
								position: 'absolute',
								height: '100vh',
								width: '100vh',
								background: 'rgb(206, 206, 206, 0.5)',
							}}>
							<Box
								sx={{
									position: 'relative',
									top: '50%',
									left: '45%',
									zIndex: 5,
								}}>
								<CircularProgress color="inherit" />
							</Box>
						</div>
					)}

					<Box
						sx={{
							backgroundColor: 'rgba(255, 255, 255)',
						}}
						display={'flex'}
						borderRadius={'20px'}
						alignItems={'center'}
						flexDirection={'column'}
						marginX={'26px'}
						height={'854px'}
						style={{ overflow: 'auto' }}
						justifyContent={'space-around'}>
						<Typography
							component="h1"
							variant="h5"
							color={theme.palette.info.main}>
							Registro para acesso ao Dashboard
						</Typography>
						{/* CARREGANDO REQUISIÇÃO DE SHOW */}
						{loadingShow ? (
							<Grid
								item
								xs={12}>
								<CircularProgress color="success" />
							</Grid>
						) : (
							<Box
								component="form"
								onSubmit={handleSubmit(onSubmit)}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										gap: 2,
										mb: 2,
										flexWrap: 'wrap',
									}}>
									<Grid
										item
										xs={12}>
										<Divider variant="middle">
											<Typography
												component="p"
												variant="p"
												color={theme.palette.info.main}>
												Dados Pessoais
											</Typography>
										</Divider>
									</Grid>
									<Controller
										name="name"
										control={control}
										render={({ field }) => (
											<TextField
												id="name-outlined-disable"
												{...register('name')}
												label="Nome completo"
												{...field}
												type="text"
												sx={{ width: '15.6875rem' }}
												disabled
												defaultValue={useName}
											/>
										)}
									/>

									{/* <FormField
											name="name"
											label="Nome completo"
											fieldProps={{ defaultValue: useName, disabled: true }}
										/> */}
									<Controller
										name="email"
										control={control}
										render={({ field }) => (
											<TextField
												id="email-outlined-disable"
												label="E-mail"
												{...register('email')}
												{...field}
												type="email"
												disabled
												defaultValue={useEmail}
												sx={{ width: '15.6875rem' }}
											/>
										)}
									/>
									{/* <FormField
											name="email"
											label="E-mail"
											fieldProps={{
												defaultValue: useEmail,
												type: 'email',
												disabled: true,
											}}
										/> */}
									<Controller
										name="password"
										control={control}
										render={({ field }) => (
											<Box position={'relative'}>
												<TextField
													id="senha-outlined"
													type={isPasswordVisible ? 'text' : 'password'}
													label="Senha"
													{...register('password')}
													{...field}
													sx={{ width: '15.6875rem' }}
												/>

												<IconButton
													type="button"
													sx={{ position: 'absolute', top: 8, right: 8 }}
													aria-label="Alterar visibilidade"
													onClick={handlePasswordVisibility}>
													{isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
												</IconButton>
											</Box>
										)}
									/>
									{/* <FormField
											name="use_password"
											helpText="Crie sua senha de acesso ao Dashboard"
											label="Senha"
											fieldProps={{
												required: true,
												type: 'password',
											}}
										/> */}
									{/* <FormField
											name="confirmPassword"
											label="Confirmação de senha"
											fieldProps={{
												required: true,
												type: 'password',
											}}
										/> */}
									<Controller
										name="confirmPassword"
										control={control}
										render={({ field }) => (
											<TextField
												id="confirmacaoSenha-outlined"
												type="password"
												label="Confirmação de Senha"
												{...register('confirmPassword')}
												{...field}
												sx={{ width: '15.6875rem' }}
											/>
										)}
									/>
									<Controller
										name="address_proof"
										control={control}
										defaultValue={[]}
										render={({ field }) => (
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													gap: 0.5,
													width: '15.6875rem',
												}}>
												<FormLabel> Comprovante de Residência </FormLabel>
												<Button
													variant="contained"
													component="label"
													size="large"
													sx={{
														fontSize: 50,
														backgroundColor: '#FFFFFF',
														color: '#C8C5C5',
														'&:hover': {
															backgroundColor: '#F5F5F5',
														},
													}}>
													<input
														type="file"
														style={{ display: 'none' }}
														{...field}
														{...register('address_proof')}
														multiple
													/>
													<NoteAddIcon fontSize="50" />
												</Button>
												{selectedFiles.length ? (
													<List
														dense
														sx={{ mt: 1, p: 0 }}>
														{selectedFiles.map((file, index) => (
															<ListItem
																sx={{ px: 0 }}
																key={index}>
																<ListItemIcon sx={{ minWidth: 'auto' }}>
																	<AttachFileIcon fontSize="small" />
																</ListItemIcon>
																<ListItemText primary={file} />
																<IconButton
																	edge="end"
																	onClick={() => handleRemoveFile(index)}>
																	<DeleteIcon />
																</IconButton>
															</ListItem>
														))}
													</List>
												) : null}
											</Box>
										)}
									/>
									{/* <FormField
											name="proof"
											helpText="Envie um comprovante de endereço atualizado para a validação do registro."
											label="Comprovante Endereço"
											fieldProps={{
												type: 'file',
												multiple: true,
												required: true,
											}}
										/> */}
									<Controller
										name="cnh_rg"
										control={control}
										defaultValue={[]}
										render={({ field }) => (
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													gap: 0.5,
													width: '15.6875rem',
												}}>
												<FormLabel> CNH/RG </FormLabel>
												<Button
													variant="contained"
													component="label"
													fullWidth
													size="large"
													sx={{
														fontSize: 50,
														backgroundColor: '#FFFFFF',
														color: '#C8C5C5',
														'&:hover': {
															backgroundColor: '#F5F5F5',
														},
													}}>
													<input
														type="file"
														{...register('cnh_rg')}
														{...field}
														style={{ display: 'none' }}
														multiple
													/>
													<CameraAltIcon fontSize="50" />
												</Button>
												{selectedFiles.length ? (
													<List
														dense
														sx={{ mt: 1, p: 0 }}>
														{selectedFiles.map((file, index) => (
															<ListItem
																sx={{ px: 0 }}
																key={index}>
																<ListItemIcon sx={{ minWidth: 'auto' }}>
																	<AttachFileIcon fontSize="small" />
																</ListItemIcon>
																<ListItemText primary={file} />
																<IconButton
																	edge="end"
																	onClick={() => handleRemoveFile(index)}>
																	<DeleteIcon />
																</IconButton>
															</ListItem>
														))}
													</List>
												) : null}
											</Box>
										)}
									/>
									{/* <FormField
											name="cnh_rg"
											label="CNH / RG"
											helpText="Envie uma foto de sua CNH ou Carteira de Identidade para a validação do registro."
											fieldProps={{
												type: 'file',
												multiple: true,
												required: true,
											}}
										/> */}
									{/* <FormField
											name="foto_pessoal"
											label="Foto"
											helpText="Envie uma foto de rosto para a validação do registro."
											fieldProps={{
												type: 'file',
												multiple: true,
												required: true,
											}}
										/> */}
									<Controller
										name="photo"
										control={control}
										defaultValue={[]}
										render={({ field }) => (
											<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
												<FormLabel> Foto </FormLabel>
												<Button
													variant="contained"
													component="label"
													fullWidth
													size="large"
													sx={{
														fontSize: 50,
														backgroundColor: '#FFFFFF',
														color: '#C8C5C5',
														'&:hover': {
															backgroundColor: '#F5F5F5',
														},
														width: '15.6875rem',
													}}>
													<input
														type="file"
														style={{ display: 'none' }}
														{...register('photo')}
														{...field}
														multiple
													/>
													<CameraAltIcon fontSize="50" />
												</Button>
												{selectedFiles.length ? (
													<List
														dense
														sx={{ mt: 1, p: 0 }}>
														{selectedFiles.map((file, index) => (
															<ListItem
																sx={{ px: 0 }}
																key={index}>
																<ListItemIcon sx={{ minWidth: 'auto' }}>
																	<AttachFileIcon fontSize="small" />
																</ListItemIcon>
																<ListItemText primary={file} />
																<IconButton
																	edge="end"
																	onClick={() => handleRemoveFile(index)}>
																	<DeleteIcon />
																</IconButton>
															</ListItem>
														))}
													</List>
												) : null}
											</Box>
										)}
									/>

									<Grid
										item
										xs={12}>
										<Divider variant="middle">
											<Typography
												component="p"
												variant="p"
												color={theme.palette.info.main}>
												Informações Técnicas
											</Typography>
										</Divider>
									</Grid>

									{/* <FormField
										name="proof"
										helpText="Insira no local abaixo as marcas de inversores que você possui."
										label="Selecione a(s) marca(s) do(s) inversor(es)"
										fieldProps={{
											type: 'select',
											dataKey: 'params',
											textField: 'title',
											labelid: 'brand',
											data: brands,
											handleSelect: handleSelect,
											setSelectedBrands: setSelectedBrands,
										}}
										fullWidth
									/> */}

									<Controller
										name="brands"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												{...register('brands')}
												options={brands}
												isSearchable={isSearchable}
												components={animatedComponentsMultiselect}
												onChange={(item) => {
													handleSelect(item);
													setSelectedBrands(item);
													console.log(item, 'log do select');
												}}
												closeMenuOnSelect={false}
												className="basic-multi-select"
												classNamePrefix="select"
												isMulti
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														width: '32rem',
														height: '3.62rem',
													}),
												}}
											/>
										)}
									/>

									{selectedBrands.length !== 0 && (
										<Box sx={{ mx: 2 }}>
											<Grid
												item
												xs={12}>
												<Divider variant="middle">
													<Typography
														component="p"
														variant="p"
														color={theme.palette.info.main}>
														Informe o login e senha das marcas
													</Typography>
												</Divider>
											</Grid>

											<SwipeableViews
												index={activeStep}
												onChangeIndex={handleStepChange}
												enableMouseEvents>
												{selectedBrands.map((item, index) => (
													<Grid
														container
														gap={2}
														sx={{ width: '100%', marginLeft: '0' }}
														key={index}>
														<Grid
															item
															xs={12}>
															<Typography
																component="b"
																variant="b">
																{item.title}
															</Typography>
														</Grid>
														{/* <FormField
															name={'bl_login'}
															label="Login"
														/> */}
														<Controller
															name="bl_login"
															control={control}
															render={({ field }) => (
																<TextField
																	id="name-outlined-disable"
																	name="bl_login"
																	label="login"
																	{...field}
																	sx={{ width: '15.4875rem' }}
																	type="text"
																/>
															)}
														/>
														{/* <FormField
															name={'bl_password'}
															label="Senha"
															fieldProps={{
																type: 'password',
															}}
														/> */}
														<Controller
															name="bl_password"
															control={control}
															render={({ field }) => (
																<TextField
																	id="bl_password-outlined"
																	name="bl_password"
																	type="password"
																	label="Senha"
																	sx={{ width: '15.6875rem' }}
																	{...field}
																/>
															)}
														/>
													</Grid>
												))}
											</SwipeableViews>

											<MobileStepper
												steps={maxSteps}
												position="static"
												activeStep={activeStep}
												nextButton={
													<Button
														size="small"
														onClick={handleNext}
														disabled={activeStep === maxSteps - 1}>
														Próximo
														<KeyboardArrowRight />
													</Button>
												}
												backButton={
													<Button
														size="small"
														onClick={handleBack}
														disabled={activeStep === 0}>
														<KeyboardArrowLeft />
														Voltar
													</Button>
												}
											/>
										</Box>
									)}
								</Box>
								<Box
									sx={{ m: 1 }}
									justifyContent={'center'}
									display={'flex'}>
									<Button
										type="submit"
										variant="contained"
										sx={{ mt: 1, px: 5, fontSize: '1rem', fontWeight: '800' }}>
										Confirmar
									</Button>
								</Box>
							</Box>
						)}
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
