import { Box, Button, TextField, Typography } from "@mui/material";
import location from "src/services/municipios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { JoinFull, SaveAs } from "@mui/icons-material";
import { setUserCookie, getUserCookie } from "src/services/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDevicesFromUser,
  updateEmailAndCapacity,
} from "src/store/actions/users";

export function DefineCapacityAndDevicesEmails({ setOpen, data }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function autoComplete(value, index) {}

  async function onSubmit(values) {
    let arraydevices = [];
    data.map((_, index) => {
      arraydevices.push({
        dev_uuid: values[`dev_uuid_${index}`],
        dev_email: values[`dev_email_${index}`],
        dev_capacity: values[`dev_capacity_${index}`],
        dev_address: values[`dev_address_${index}`],
      });
    });

    dispatch(updateEmailAndCapacity(arraydevices));
    setOpen(false);
  }

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
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Por favor, define o email e a potência de cada planta!
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, opacity: 0.7 }}>
        Precisamos desses dados para o envio de alertas <strong>MAYA</strong>, e
        para cálcularmos valores como a geração estimada da sua usina. Seus
        dados estão seguros conosco!
      </Typography>
      <Box
        sx={{
          display: "grid",
          justifyContent: "space-around",
          gridTemplateColumns: "repeat(3, 340px)",
          gap: 3,
          width: "100%",
          height: 362,
          overflow: "auto",
          mb: 6,
          borderBottom: "1px",
        }}
      >
        {data.map((data, index) => (
          <Box key={index}>
            <Typography variant="body2">{data.dev_name}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                value={data.dev_uuid}
                {...register(`dev_uuid_${index}`)}
                sx={{ display: "none" }}
                margin="normal"
                label="ID"
                type="text"
              />
              <Box sx={{ mr: 2 }}>
                <TextField
                  value={data.dev_email || null}
                  {...register(`dev_email_${index}`)}
                  sx={{ width: "100%" }}
                  margin="normal"
                  label="Email"
                  type="email"
                />
                <TextField
                  value={data.dev_address || null}
                  sx={{ width: "90%" }}
                  {...register(`dev_address_${index}`)}
                  onChange={(e) => {
                    autoComplete(e.currentTarget.value, index);
                  }}
                  margin="normal"
                  label="End. de instalação"
                  type="email"
                />
              </Box>
              <TextField
                value={data.dev_capacity || 0}
                {...register(`dev_capacity_${index}`)}
                sx={{ width: "26%" }}
                margin="normal"
                label="Potência"
                type="number"
              />
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        startIcon={<SaveAs fontSize="small" />}
        type="submit"
        variant="contained"
        sx={{ color: "primary", variant: "contained", width: 200 }}
      >
        Salvar
      </Button>
    </Box>
  );
}
