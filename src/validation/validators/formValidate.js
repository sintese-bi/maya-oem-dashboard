import * as yup from 'yup';

const formValidate = () => {
	const brandsSchema = yup.object().shape({
		login: yup.string().required('O login é obrigatório'),
		password: yup.min(2, 'A senha deve ter pelo menos 2 caracteres').required('Senha obrigatória'),
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
};

export default formValidate;
