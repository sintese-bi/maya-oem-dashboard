import { Box, Button, TextField, Typography } from "@mui/material";
import location from "src/services/municipios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ArrowDownward, JoinFull, SaveAs } from "@mui/icons-material";
import { setUserCookie, getUserCookie } from "src/services/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDevicesFromUser,
  updateEmailAndCapacity,
} from "src/store/actions/users";
import { DeviceItem } from "./DeviceItem";
import toast from "react-hot-toast";

export function DefineCapacityAndDevicesEmails({ setOpen, open }) {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(50);
  const { useUuid } = getUserCookie();
  const [data, setData] = useState([]);
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
  const { allDevicesFromUser } = useSelector((state) => state.users);

  function autoComplete(value, index) {
    const locationFiltered = location.filter((data) =>
      data.ic_city.includes(value)
    );

    if (locationFiltered.length == 1) {
      setValue(
        `dev_address_${index}`,
        `${locationFiltered[0].ic_city}-${locationFiltered[0].ic_states}`
      );
    }
  }

  async function saveSetupData(values) {
    let arraydevices = [];
    data.map((_, index) => {
      arraydevices.push({
        dev_name: values[`dev_name_${index}`],
        dev_uuid: values[`dev_uuid_${index}`],
        dev_email: values[`dev_email_${index}`],
        dev_capacity: values[`dev_capacity_${index}`],
        dev_address: values[`dev_address_${index}`],
        gen_estimated: values[`gen_estimated_${index}`],
      });
    });

    localStorage.setItem("setupData", JSON.stringify(arraydevices));
    setUserCookie({ ...getUserCookie(), firstTime: false });
    setOpen(false);

    toast.success(
      "Dados salvos com sucesso, caso queria prosseguir, vá até a opção de configurar plantas, preencha os campos e atualize os dados.",
      {
        duration: 5000,
      }
    );
  }

  function handleFirstAndLastIndex() {
    setFirstIndex(50 + 1);
    setLastIndex(50 + 1);
  }

  async function onSubmit(values) {
    let arraydevices = [];
    data.map((_, index) => {
      arraydevices.push({
        dev_uuid: values[`dev_uuid_${index}`],
        dev_email: values[`dev_email_${index}`],
        dev_capacity: values[`dev_capacity_${index}`],
        dev_address: values[`dev_address_${index}`],
        gen_estimated: values[`gen_estimated_${index}`],
      });
    });

    localStorage.setItem("setupData", JSON.stringify(arraydevices));
    dispatch(updateEmailAndCapacity(arraydevices));
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getAllDevicesFromUser({ use_uuid: useUuid }));
  }, []);

  useEffect(() => {
    const setupData = JSON.parse(localStorage.getItem("setupData"));
    if (setupData !== null) {
      setData(setupData);
    } else {
      setData(allDevicesFromUser.slice(0, 50));
      handleFirstAndLastIndex();
    }
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
          gridTemplateColumns: "repeat(3, 380px)",
          gap: 3,
          width: "100%",
          height: 362,
          overflow: "auto",
          mb: 6,
          borderBottom: "1px",
        }}
      >
        {data.map((data, index) => (
          <DeviceItem
            key={index}
            data={data}
            index={index}
            register={register}
            autoComplete={autoComplete}
            setValue={setValue}
          />
        ))}
      </Box>
      <Box sx={{ width: "100%", textAlign: "center", py: 1 }}></Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          startIcon={<SaveAs fontSize="small" />}
          type="submit"
          variant="contained"
          sx={{ color: "primary", variant: "contained", width: 200 }}
        >
          Atualizar dados
        </Button>
        <Button
          onClick={handleSubmit(saveSetupData)}
          startIcon={<SaveAs fontSize="small" />}
          variant="outlined"
          color="success"
        >
          Salvar dados inputados
        </Button>
      </Box>
    </Box>
  );
}
