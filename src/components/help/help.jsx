import { WhatsApp } from "@mui/icons-material";
import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { helpCenter } from "src/store/actions/users";

const validateSchema = Yup.object().shape({
  use_email: Yup.string().required("Campo é obrigatório."),
  text: Yup.string().required("Campo é obrigatório."),
});

export const Help = ({ setTitle, setDescription, setOpen, open }) => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateSchema),
  });

  async function onSubmit(values) {
    dispatch(helpCenter(values));

    setOpen(false);
  }

  useEffect(() => {
    setTitle("Ajuda");
    setDescription(
      "Querido usuário, após o envio do email ou menssagem via WhatsApp, nossa equipe irá entrar responder assim que possível, por favor, aguarde."
    );
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <TextField
            type="email"
            margin="normal"
            placeholder="example@gmail.com"
            label="Email"
            {...register("use_email")}
            error={!!errors.use_email}
            helperText={errors.use_email?.message}
          />
          <Box sx={{ width: "100%", height: 120 }}>
            <TextareaAutosize
              maxRows={4}
              style={{
                width: "100%",
                height: "100%",
                resize: "none",
                padding: "20px 10px 20px 10px",
                borderRadius: "5px",
              }}
              {...register("text")}
              aria-label="maximum height"
              placeholder="Dúvida"
              error={!!errors.text}
              helperText={errors.text?.message}
            />
            <span style={{ fontSize: "10px", color: "red" }}>
              {errors.text?.message}
            </span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start", gap: 2, mt: 4 }}>
            <Button variant="contained" type="submit">
              Enviar dúvida
            </Button>
            <Button
              startIcon={<WhatsApp />}
              variant="outlined"
              color="success"
              onClick={() => {
                window.open(`https://wa.me/+553182341415`, "_blank");
                setOpen(false);
              }}
            >
              Contato whatsapp
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};
