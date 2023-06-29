// IMPORTS ----------------------------------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';

// COMPONENTS
import { FormField } from 'src/components/form/FormField';

// ACTIONS ----------------------------------------
import { checkBrnad, show } from '../store/actions/users';

// ASSETS ----------------------------------------
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// HELP's, UTILS & VARIAVEIS ---------------------
import { listBrand } from 'src/utils/list-brand';

export default function Register() {
	const { iregister, handleSubmit } = useForm();
	const theme = createTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { useEmail, useName, loadingShow, loadingRegister, register } = useSelector(
		(state) => state.users
	);

	const useUuid = 'a7ed2d10-4340-43df-824d-63ca16979114';
	const [brand, setBrand] = useState([]);
	const [validateBrand, setValidateBrand] = useState('');
	// LISTAGEM DAS BRAND PARA O MULTI SELECT
	const brands = listBrand.map((item) => {
		return { params: item.params, title: item.title, url: item.url };
	});

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
		brands: yup.array().of(brandsSchema).min(1, 'Selecionar a marca dos inversores é obrigatório.'),
	});

	const [requestForm, setRequestForm] = useState({
		use_password: '',
		confirmPassword: '',
		brand_login: [],
		cnh_rg: '',
		proof: '',
	});

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
	const onSubmit = () => {};
	// SETAR VALORES DO OBJETO brand_login
	const handleSetBrandLogin = (e, index) => {
		const { name } = e.target;
		const { value } = e.target;

		requestForm.brand_login[index][name] = value;
		setRequestForm(requestForm);
	};

	// SETAR VALORES DOs INPUTS
	const handleSetForm = (e) => {
		const { name, value } = e.target;

		requestForm[name] = value;
		setRequestForm(requestForm);
	};

	const handleDocument = (evt) => {
		const { name, files } = evt.target;

		requestForm[name] = files[0];
		setRequestForm(requestForm);
	};

	// CONTROLE DO SELECT
	const handleSelect = (item, evt) => {
		setBrand(item);
		if (evt.action === 'insert') {
			requestForm.brand_login[item.length - 1] = {
				bl_name: evt.dataItem.params,
				bl_login: '',
				bl_password: '',
				bl_url: evt.dataItem.url,
				use_uuid: useUuid,
			};
		} else {
			const position = requestForm.brand_login.findIndex(
				(bl) => bl.bl_name === evt.dataItem.params
			);
			delete requestForm.brand_login[position];
		}

		setRequestForm(requestForm);
		setActiveStep(0); // VOLTANDO PARA O PRIMEIRO SLIDE
	};

	// ----------------------------------------
	// useEffect's

	useEffect(() => {
		if (register) navigate('/');
	}, [register, navigate]);

	useEffect(() => {
		if (useUuid) dispatch(show(useUuid)); // BUSCAR email e nome do USUARIO
	}, [useUuid, dispatch]);

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
								noValidate
								onSubmit={handleSubmit(onSubmit)}
								sx={{ mt: 3, p: 3 }}>
								<Grid
									container
									spacing={2}>
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
									<FormField
										name="name"
										label="Nome completo"
										fieldProps={{ defaultValue: useName, disabled: true }}
									/>
									<FormField
										name="email"
										label="E-mail"
										fieldProps={{
											defaultValue: useEmail,
											type: 'email',
											disabled: true,
										}}
									/>

									<FormField
										name="use_password"
										helpText="Crie sua senha de acesso ao Dashboard"
										label="Senha"
										fieldProps={{
											required: true,
											type: 'password',
											onChange: (evt) => {
												handleSetForm(evt);
											},
										}}
									/>
									<FormField
										name="confirmPassword"
										label="Confirmação de senha"
										fieldProps={{
											required: true,
											type: 'password',
											onChange: (evt) => {
												handleSetForm(evt);
											},
										}}
									/>

									<FormField
										name="proof"
										helpText="Envie um comprovante de endereço atualizado para a validação do registro."
										label="Comprovante Endereço"
										fieldProps={{
											type: 'file',
											multiple: true,
											required: true,
											onChange: handleDocument,
										}}
									/>

									<FormField
										name="cnh_rg"
										label="CNH / RG"
										helpText="Envie uma foto de sua CNH ou Carteira de Identidade para a validação do registro."
										fieldProps={{
											type: 'file',
											multiple: true,
											required: true,
											onChange: handleDocument,
										}}
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

									<FormField
										name="proof"
										helpText="Insira no local abaixo as marcas de inversores que você possui."
										label="Selecione a(s) marca(s) do(s) inversor(es)"
										fieldProps={{
											type: 'select',
											dataKey: 'params',
											textField: 'title',
											labelid: 'brand',
											data: brands,
											name: 'brand',
											onChange: (item, evt) => {
												handleSelect(item, evt);
												setValidateBrand('');
											},
										}}
										fullWidth
									/>

									{brand.length !== 0 && (
										<Box sx={{ p: 3 }}>
											<Grid
												item
												xs={12}></Grid>

											{brand.length !== 0 && (
												<Box sx={{ p: 3 }}>
													<Grid
														item
														xs={12}>
														<Divider variant="middle">
															<Typography
																component="p"
																variant="p">
																Informe o login e senha das marcas
															</Typography>
														</Divider>
													</Grid>

													<SwipeableViews
														index={activeStep}
														onChangeIndex={handleStepChange}
														enableMouseEvents>
														{brand.map((item, index) => (
															<Grid
																container
																spacing={2}
																key={index}>
																<Grid
																	item
																	xs={12}
																	sx={{ mt: 3 }}>
																	<Typography
																		component="b"
																		variant="b">
																		{item.title}
																	</Typography>
																</Grid>

																<FormField
																	name={'bl_login'}
																	label="Login"
																	fieldProps={{
																		onChange: (evt) => {
																			handleSetBrandLogin(evt, index);
																		},
																	}}
																/>
																<FormField
																	name={'bl_password'}
																	label="Senha"
																	fieldProps={{
																		type: 'password',
																		onChange: (evt) => {
																			handleSetBrandLogin(evt, index);
																		},
																	}}
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
									)}
								</Grid>
								<Box
									sx={{ m: 1 }}
									justifyContent={'center'}
									display={'flex'}>
									<Button
										type="submit"
										variant="contained"
										sx={{ mt: 1, px: 5, fontSize: '1rem', fontWeight: '800' }}
										disabled={loadingRegister}
										// onClick={handleValidate}
									>
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
