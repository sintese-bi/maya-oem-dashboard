import { useState } from 'react';
import { Multiselect } from 'react-widgets';

// LIBS DE ESTILOS
import {
	Box,
	Button,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Tooltip,
} from '@mui/material';
import { theme } from 'src/theme';

// ASSETS
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const FormField = ({ name, label, helpText, error, fieldProps, fullWidth }) => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
	const checkedIcon = <CheckBoxIcon fontSize="small" />;
	const handleDocumentChange = (evt) => {
		const { files } = evt.currentTarget;
		setSelectedFiles(Array.from(files).map((file) => file.name));
		fieldProps.onChange(evt);
	};

	const handlePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	const renderInput = () => {
		if (fieldProps.type === 'select') {
			return (
				<Multiselect
					error={!!error}
					style={{ borderColor: theme.palette.error.main }}
					{...fieldProps}
				/>
			);
		}

		if (fieldProps.type === 'file') {
			return (
				<>
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
						{name === 'cnh_rg' ? (
							<CameraAltIcon fontSize="inherit" />
						) : (
							<NoteAddIcon fontSize="inherit" />
						)}

						<input
							hidden
							name={name}
							{...fieldProps}
							onChange={handleDocumentChange}
						/>
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
								</ListItem>
							))}
						</List>
					) : null}
				</>
			);
		}

		return (
			<Box sx={{ position: 'relative' }}>
				<TextField
					error={!!error}
					fullWidth
					name={name}
					{...fieldProps}
					type={
						fieldProps.type === 'password' && isPasswordVisible ? 'text' : fieldProps.type || 'text'
					}
				/>

				{fieldProps.type === 'password' && name !== 'confirmPassword' ? (
					<IconButton
						type="button"
						aria-label="Alterar visibilidade"
						onClick={handlePasswordVisibility}
						sx={{ position: 'absolute', top: 8, right: 8 }}>
						{isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
					</IconButton>
				) : null}
			</Box>
		);
	};

	return (
		<Grid
			item
			xs={12}
			sm={fullWidth ? 12 : 6}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
				<FormLabel
					htmlFor={name}
					error={!!error}>
					{label}
				</FormLabel>

				{helpText ? (
					<Tooltip
						title={helpText}
						fontSize="small">
						<InfoIcon />
					</Tooltip>
				) : null}
			</Box>

			{renderInput()}

			<FormHelperText sx={{ color: theme.palette.error.main }}>{error}</FormHelperText>
		</Grid>
	);
};
