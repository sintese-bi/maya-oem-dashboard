import { Box, Button, Typography } from "@mui/material";
import location from "src/services/municipios";

import { SaveAs } from "@mui/icons-material";
import { setUserCookie, getUserCookie } from "src/services/session";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDevicesFromUser,
  updateEmailAndCapacity,
} from "src/store/actions/users";
import { DeviceItem } from "./DeviceItem";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function DefineCapacityAndDevicesEmails({ setOpen }) {
  var scrolled = false;
  const containerRef = useRef(null);
  const allDevicesFromUserRef = useRef([]);
  const dataRef = useRef([]);
  const firstIndexRef = useRef(0);
  const lastIndexRef = useRef(10);
  const { useUuid } = getUserCookie();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const { allDevicesFromUser, selectedUser } = useSelector(
    (state) => state.users
  );

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
      let adress = values[`dev_address_${index}`].split("-");
      arraydevices.push({
        dev_name: values[`dev_name_${index}`],
        dev_uuid: values[`dev_uuid_${index}`],
        dev_email: values[`dev_email_${index}`],
        dev_capacity: values[`dev_capacity_${index}`],
        ic_city: adress[0],
        ic_states: adress[1],
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

  function handleScroll() {
    const container = containerRef.current;
    if (scrolled != container.scrollTop) {
      scrolled = container.scrollTop;
      const scrollPercent = (
        (container.scrollTop /
          (container.scrollHeight - container.clientHeight)) *
        100
      ).toFixed(2);

      if (parseFloat(scrollPercent) > 99) {
        if (dataRef.current.length != allDevicesFromUserRef.current.length) {
          firstIndexRef.current = firstIndexRef.current + 10;
          lastIndexRef.current = lastIndexRef.current + 10;
          setData(
            dataRef.current.concat(
              allDevicesFromUserRef.current.slice(
                firstIndexRef.current,
                lastIndexRef.current
              )
            )
          );
        }
      }
    }
  }

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  async function onSubmit(values) {
    let arrayplants = [];

    data.map((_, index) => {
      let adress =
        values[`dev_address_${index}`] != ""
          ? values[`dev_address_${index}`].split("-")
          : "-".split("-");
      arrayplants.push({
        dev_uuid: values[`dev_uuid_${index}`],
        dev_email: values[`dev_email_${index}`],
        dev_capacity: values[`dev_capacity_${index}`],
        ic_city: adress[0],
        ic_states: adress[1],
        gen_estimated: values[`gen_estimated_${index}`],
      });
    });

    localStorage.setItem("setupData", JSON.stringify(arrayplants));
    dispatch(updateEmailAndCapacity({ arrayplants }));
    //setOpen(false);
  }

  useEffect(() => {
    if (selectedUser.length != 0) {
      dispatch(
        getAllDevicesFromUser({ use_uuid: selectedUser[0]?.useUuidState })
      );
    } else {
      dispatch(getAllDevicesFromUser({ use_uuid: useUuid }));
    }
  }, [useUuid]);

  useEffect(() => {
    allDevicesFromUserRef.current = allDevicesFromUser;
    const setupData = JSON.parse(localStorage.getItem("setupData"));
    if (setupData !== null) {
      setData(setupData);
    } else {
      setData(
        allDevicesFromUser.slice(firstIndexRef.current, lastIndexRef.current)
      );
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
      <Typography
        variant="h4"
        sx={{ position: "absolute", marginTop: "-80px" }}
      >
        Geração estimada das usinas.
      </Typography>
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
        ref={containerRef}
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
