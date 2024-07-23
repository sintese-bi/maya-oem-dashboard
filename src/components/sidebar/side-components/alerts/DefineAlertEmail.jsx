import {
  Button,
  TextField,
  Box,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Delete, Save, SaveAs } from '@mui/icons-material';
import { getUserCookie } from 'src/services/session';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { DashboardContext } from 'src/contexts/dashboard-context';
import toast from 'react-hot-toast';
import InputMask from 'react-input-mask';

const validateSchema = yup.object().shape({
  email: yup.string(),
  telephone: yup.string(),
  userOptions: yup.array({
    email: yup.string(),
    telephone: yup.string(),
  }),
});

export function DefineAlertEmail({
  welcome,
  setCurrentPage,
  currentPage,
  setTitle,
  setDescription,
  setSecondaryAction,
}) {
  // const { useUuid } = getUserCookie();
  // const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    resetField,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      email: '',
      telephone: '',
      userOptions: [],
    },
  });

  const watchUserOptions = watch('userOptions');

  const { handlePortalEmailLogin } = useContext(DashboardContext);

  const handleAddPreference = () => {
    const email = getValues('email');
    const telephone = getValues('telephone');

    if (!email || !telephone) {
      toast.error('Por favor, insira um email e um telefone');
      return;
    }

    setValue('userOptions', [...watchUserOptions, { email, telephone }]);
    resetField('email');
    resetField('telephone');
  };

  const handleRemovePreference = (index) => {
    const newOptions = watchUserOptions.filter((_, i) => i !== index);
    setValue('userOptions', newOptions);
  };

  function onSubmit(values) {
    console.log(values);

    if (welcome) {
      setSecondaryAction('Portal');
    } else {
      setSecondaryAction('AlertsDefineComponent');
    }
    // handlePortalEmailLogin(email);
  }

  useEffect(() => {
    setTitle('Definição do email para alertas');
    setDescription(
      'Por favor, define o email em que deseja receber os alertas!',
    );
  }, [currentPage]);

  return (
    <Box>
      <TableContainer sx={{ marginBottom: '32px' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchUserOptions.length > 0 ? (
              watchUserOptions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell component="th" scope="row">
                    {item.telephone}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<Delete />}
                      onClick={() => handleRemovePreference(index)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Nenhum alerta adicionado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <TextField
          {...register('email')}
          margin="normal"
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Controller
          name="telephone"
          control={control}
          rules={{ required: 'Telefone é obrigatório' }}
          render={({ field }) => (
            <InputMask
              mask="(99) 99999-9999"
              value={field.value}
              onChange={field.onChange}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  margin="normal"
                  label="Telefone"
                  type="text"
                  error={!!errors.telephone}
                  helperText={errors.telephone?.message}
                />
              )}
            </InputMask>
          )}
        />
        <Button
          startIcon={<Save fontSize="small" />}
          type="button"
          variant="outlined"
          sx={{ alignSelf: 'center' }}
          onClick={handleAddPreference}
        >
          Adicionar
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', margin: '16px 8px' }}>
        <input type="checkbox" />
        <Box sx={{ marginLeft: '8px' }}>Activar alertas</Box>
      </Box>

      <Button
        startIcon={<SaveAs fontSize="small" />}
        variant="contained"
        sx={{ color: 'primary', variant: 'contained', width: '100%' }}
        onClick={handleSubmit(onSubmit)}
      >
        Salvar e continuar
      </Button>
    </Box>
  );
}
