import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SaveAs } from "@mui/icons-material";
import { setUserCookie, getUserCookie } from "src/services/session";

const validateSchema = Yup.object().shape({
    email: Yup.string()
        .required("Campo é obrigatório."),
    capacity: Yup.number()
        .min(1, "Por favor insira um valor acima de 0")
        .required("Campo é obrigatório."),
});

export function DefineCapacityAndDevicesEmails({setOpen}){

    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors },
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(validateSchema),
      });

      async function onSubmit(values) {
        alert("Inputando email e potência...")
        setUserCookie({
            ...getUserCookie(),
            firstTime: false,
          });
        setOpen(false)
      }

    return (
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Por favor, define o email e a potência de cada planta!</Typography>
        <Box sx={{width: '100%'}}>
          <TextField 
            {...register("email")}
            sx={{width: '100%'}}
            margin="normal"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField 
            defaultValue={0}
            {...register("capacity")}
            sx={{width: '26%'}}
            margin="normal"
            label="Potência"
            type="number"
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
          />
        </Box>
        <Button
              startIcon={<SaveAs fontSize="small" />}
              type="submit"
              variant="contained"
              sx={{ color: "primary", variant: "contained" }}
            >
              Salvar
            </Button>
      </Box>
    )
  }