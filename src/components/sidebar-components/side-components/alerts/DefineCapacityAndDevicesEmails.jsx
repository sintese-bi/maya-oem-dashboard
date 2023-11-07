import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SaveAs } from "@mui/icons-material";
import { setUserCookie, getUserCookie } from "src/services/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDevicesFromUser } from "src/store/actions/users";

const validateSchema = Yup.object().shape({
  email: Yup.string().required("Campo é obrigatório."),
  capacity: Yup.number()
    .min(1, "Por favor insira um valor acima de 0")
    .required("Campo é obrigatório."),
});

export function DefineCapacityAndDevicesEmails({ setOpen }) {
  const dispatch = useDispatch();
  const { allDevicesFromUser } = useSelector((state) => state.users);
  const [data, setData] = useState(Array(20).fill(10));
  const { useUuid } = getUserCookie();
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
    alert("Inputando email e potência...");
    setUserCookie({
      ...getUserCookie(),
      firstTime: false,
    });
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getAllDevicesFromUser({ use_uuid: useUuid }));
  }, []);

  useEffect(() => {
    setData(allDevicesFromUser);
  }, [allDevicesFromUser]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "20px", mb: 8 }}>
        Por favor, define o email e a potência de cada planta!
      </Typography>
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "repeat(4, 340px)",
          gap: 2,
          width: "100%",
          height: 362,
          overflow: "auto",
          mb: 6,
        }}
      >
        {data?.map((data, index) => (
          <Box key={index}>
            <Typography variant="body2">Plant name</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                sx={{ width: "100%" }}
                margin="normal"
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                defaultValue={0}
                sx={{ width: "26%" }}
                margin="normal"
                label="Potência"
                type="number"
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
              />
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        startIcon={<SaveAs fontSize="small" />}
        type="submit"
        variant="contained"
        sx={{ color: "primary", variant: "contained", mb: 4, width: 200 }}
      >
        Salvar
      </Button>
    </Box>
  );
}
