import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import location from "src/services/municipios";

import { SaveAs } from "@mui/icons-material";
import { setUserCookie, getUserCookie } from "src/services/session";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDevicesFromUser,
  updateEmailAndCapacity,
} from "src/store/actions/users";
import { DeviceItem } from "./DeviceItem";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import MUIDataTable from "mui-datatables";
import { DashboardContext } from "src/contexts/dashboard-context";

export function DefineCapacityAndDevicesEmails({
  setOpen,
  setTitle,
  setDescription,
  setSecondaryAction,
}) {
  const { usersAPIData } = useContext(DashboardContext);
  const [deviceChanged, setDeviceChanged] = useState([]);
  let devices = [];
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

  function autoComplete(value) {
    const locationFiltered = location.filter((data) =>
      data.ic_city.includes(value)
    );

    if (locationFiltered.length == 1) {
      return `${locationFiltered[0].ic_city}-${locationFiltered[0].ic_states}`;
    } else {
      return value;
    }
  }

  async function saveSetupData(values) {
    let arraydevices = [...data, devices];

    setTitle("");
    setDescription("");
    setSecondaryAction("AlertsDefineComponent");

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
    setTitle("Geração estimada das usinas");
    setDescription(`Por favor, define o email e a potência de cada planta. Precisamos desses dados para o envio de alertas MAYA, e
    para cálcularmos valores como a geração estimada da sua usina. Seus
    dados estão seguros conosco!`);
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  async function onSubmit(values) {
    let arrayplants = [...data, devices];

    setTitle("");
    setDescription("");
    setSecondaryAction("AlertsDefineComponent");

    localStorage.setItem("setupData", JSON.stringify(arrayplants));
    dispatch(updateEmailAndCapacity({ arrayplants }));
    setOpen(false);
  }

  useEffect(() => {
    allDevicesFromUserRef.current = usersAPIData.allDevicesFromUser;
    const setupData = JSON.parse(localStorage.getItem("setupData"));
    if (setupData !== null) {
      setData(setupData);
    } else {
      setData(usersAPIData.allDevicesFromUser);
    }
  }, [usersAPIData.allDevicesFromUser]);

  useEffect(() => {
    console.log(deviceChanged);
  }, [deviceChanged]);

  const options = {
    filter: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100, 200, 300],
    filterType: "dropdown",
    responsive: "simple",
    selectableRows: "none",
  };

  const columns = [
    {
      name: "dev_uuid",
      label: "ID do Dispositivos/usuário",
      options: {
        display: false,
        viewColumns: false,
        filter: true,
      },
    },
    {
      name: "dev_name",
      label: "Planta",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dev_address",
      label: "Endereço de instalação",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          return (
            <Box sx={{ width: 324 }}>
              <TextField
                type="text"
                defaultValue={dataTable.rowData[2]}
                label="Endereço"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  e.target.value = autoComplete(e.target.value);
                  let fullAddres = autoComplete(e.target.value);

                  let deviceInfo = devices.filter(
                    (item) => item.dev_uuid === dataTable.rowData[0]
                  );

                  if (deviceInfo.length != 0) {
                    deviceInfo[0].dev_address = fullAddres;

                    const indiceObjetoExistente = devices.findIndex(
                      (item) => item.dev_uuid === deviceInfo[0].dev_uuid
                    );

                    devices[indiceObjetoExistente] = deviceInfo[0];
                  } else {
                    let newDeviceToAdd = data.filter(
                      (item) => item.dev_uuid === dataTable.rowData[0]
                    );
                    newDeviceToAdd[0].dev_address = fullAddres;

                    devices.push(newDeviceToAdd[0]);
                  }
                }}
              />
            </Box>
          );
        },
      },
    },
    {
      name: "dev_capacity",
      label: "Potência",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          return (
            <Box sx={{ width: 72 }}>
              <TextField
                type="number"
                defaultValue={dataTable.rowData[3]}
                label="Potência"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  let capacity = e.target.value;

                  let deviceInfo = devices.filter(
                    (item) => item.dev_uuid === dataTable.rowData[0]
                  );

                  if (deviceInfo.length != 0) {
                    deviceInfo[0].dev_capacity = capacity;

                    const indiceObjetoExistente = devices.findIndex(
                      (item) => item.dev_uuid === deviceInfo[0].dev_uuid
                    );

                    devices[indiceObjetoExistente] = deviceInfo[0];
                  } else {
                    let newDeviceToAdd = data.filter(
                      (item) => item.dev_uuid === dataTable.rowData[0]
                    );
                    newDeviceToAdd[0].dev_capacity = capacity;

                    devices.push(newDeviceToAdd[0]);
                  }
                }}
              />
            </Box>
          );
        },
      },
    },
  ];

  if (data.length == 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress color="success" size={80} />
        <Typography>Carregando dados</Typography>
      </Box>
    );
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
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "100%",
          height: 282,
          overflow: "auto",
          mb: 2,
          borderBottom: "1px",
        }}
        ref={containerRef}
      >
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          title="Formulário de geração estimada"
        />
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
