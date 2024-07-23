import {
  Autocomplete,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import location from "src/services/municipios";
import UsinIcon from "src/assets/usinIcon.png";

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
import citiesData from "src/services/municipios";
import { getDevices } from "src/store/actions/devices";
import { Address } from "./DefineCapacityFields/Address";
import { Capacity } from "./DefineCapacityFields/Capacity";
import { InstallNumber } from "./DefineCapacityFields/InstallNumber";
import { EstimatedGeneration } from "./DefineCapacityFields/estimatedGeneration";
import { WhatsAppNumber } from "./DefineCapacityFields/WhatsAppNumber";
import { Email } from "./DefineCapacityFields/Email";

export function DefineCapacityAndDevicesEmails({
  setOpen,
  setTitle,
  setDescription,
  setSecondaryAction,
}) {
  const { blUuidState, devUuidState, useNameState, capacity } =
    location.state || {};
  const { usersAPIData, handleGetDashboardRequest } =
    useContext(DashboardContext);
  const { updatingEmailAndCapacity } = useSelector((state) => state.users);
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

  function autoCompleteState(cityValue, stateValue) {
    if (stateValue === undefined) {
      const locationFiltered = location.filter(
        (data) => data.ic_city == cityValue
      );

      if (locationFiltered.length == 1) {
        return locationFiltered[0].ic_states;
      } else {
        return "";
      }
    } else {
      return stateValue;
    }
  }

  async function saveSetupData(values) {
    let arraydevices = [...data, devices];

    setTitle("");
    setDescription("");
    setSecondaryAction("AlertsDefineComponent");

    let arrayplantsWithNoBase64 = JSON.parse(JSON.stringify(arraydevices)).map(
      (data) => {
        return {
          dev_uuid: data.uuid,
          capacity: data.capacity,
          address: data.address,
          dev_install: data.dev_install,
          gen_estimated: data.gen_estimated,
          whatsapp_number: data.whatsapp_number,
          email: data.email,
        };
      }
    );
    localStorage.setItem("setupData", JSON.stringify(arrayplantsWithNoBase64));
    setUserCookie({ ...getUserCookie(), firstTime: false });
    setOpen(false);

    toast.success(
      "Dados salvos com sucesso, caso queria prosseguir, vá até a opção de configurar plantas, preencha os campos e atualize os dados.",
      {
        duration: 5000,
      }
    );
  }
  useEffect(() => {
    setTitle("Geração estimada das usinas");
    setDescription(`Defina o email e a potência das plantas. Esses dados são necessários para os alertas, e
    para cálcularmos valores como a geração estimada. Para pesquisar uma planta utilize a 'lupa', no campo superior direito da tabela.`);
  }, []);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  async function onSubmit(values) {
    let arrayplants = [...data, devices];

    setTitle("");
    setDescription("");
    setSecondaryAction("AlertsDefineComponent");

    let arrayplantsWithNoBase64 = JSON.parse(JSON.stringify(arrayplants)).map(
      (data) => {
        return {
          dev_uuid: data.uuid,
          address: data.address,
          capacity: data.capacity,
          dev_install: data.dev_install,
          gen_estimated: data.gen_estimated,
          whatsapp_number: data.whatsapp_number,
          email: data.email,
        };
      }
    );
    localStorage.setItem("setupData", JSON.stringify(arrayplantsWithNoBase64));
    console.log(devices);
    dispatch(
      updateEmailAndCapacity(
        { arrayplants: devices },
        handleGetDashboardRequest,
        getDevices
      )
    );
  }

  useEffect(() => {
    allDevicesFromUserRef.current = usersAPIData.devices;
    const setupData = JSON.parse(localStorage.getItem("setupData"));
    if (setupData !== null) {
      let setupDataWithAddressData = usersAPIData.devices.map(
        (allDevicesFromUserItem) => {
          const temp = setupData.filter(
            (setupDataItem) =>
              setupDataItem.dev_uuid == allDevicesFromUserItem.uuid
          );
          return {
            ...allDevicesFromUserItem,
            address: temp[0]?.address,
            capacity: temp[0]?.capacity,
            dev_install: temp[0]?.dev_install,
            gen_estimated: temp[0]?.gen_estimated,
            whatsapp_number: temp[0]?.whatsapp_number,
            email: temp[0]?.email,
          };
        }
      );
      setData(setupDataWithAddressData);
    } else {
      setData(usersAPIData.devices);
    }
  }, [usersAPIData.devices]);

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
      name: "uuid",
      label: "ID do Dispositivos/usuário",
      options: {
        display: "false",
        viewColumn: "false",
      },
    },
    {
      name: "name",
      label: "Planta",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Cidade",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          function setValues(value) {
            let selectedCity = value;

            let deviceInfo = devices.filter(
              (item) => item.uuid === dataTable.rowData[0]
            );

            if (deviceInfo.length != 0) {
              deviceInfo[0].address = `${selectedCity?.ic_city}-${selectedCity?.ic_states}`;

              const indiceObjetoExistente = devices.findIndex(
                (item) => item.uuid === deviceInfo[0].dev_uuid
              );

              devices[indiceObjetoExistente] = deviceInfo[0];
            } else {
              let newDeviceToAdd = data.filter(
                (item) => item.uuid === dataTable.rowData[0]
              );
              newDeviceToAdd[0].address = `${selectedCity.ic_city}-${selectedCity.ic_states}`;

              devices.push(newDeviceToAdd[0]);
            }
          }

          return <Address value={dataTable.rowData[2]} setValues={setValues} />;
        },
      },
    },
    {
      name: "capacity",
      label: "Potência",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          function setValuesCapacity(capacityValue) {
            let capacity = capacityValue;

            let deviceInfo = devices.filter(
              (item) => item.uuid === dataTable.rowData[0]
            );

            if (deviceInfo.length != 0) {
              deviceInfo[0].capacity = capacity;

              const indiceObjetoExistente = devices.findIndex(
                (item) => item.uuid === deviceInfo[0].dev_uuid
              );

              devices[indiceObjetoExistente] = deviceInfo[0];
            } else {
              let newDeviceToAdd = data.filter(
                (item) => item.uuid === dataTable.rowData[0]
              );
              newDeviceToAdd[0].capacity = capacity;

              devices.push(newDeviceToAdd[0]);
            }
          }
          return (
            <Capacity
              value={dataTable.rowData[3]}
              setValuesCapacity={setValuesCapacity}
            />
          );
        },
      },
    },
    {
      name: "dev_image",
      label: "Foto da usina",
      options: {
        filter: true,
        sort: true,
        display: false,
        viewColumn: false,
        customBodyRender: (name, dataTable) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ width: 224, mr: 2 }}
              >
                Upload foto
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length != 0) {
                      var reader = new FileReader();
                      reader.addEventListener("loadend", () => {
                        let deviceInfo = devices.filter(
                          (item) => item.dev_uuid === dataTable.rowData[0]
                        );

                        if (deviceInfo.length != 0) {
                          deviceInfo[0].dev_image = reader.result;

                          const indiceObjetoExistente = devices.findIndex(
                            (item) => item.dev_uuid === deviceInfo[0].dev_uuid
                          );

                          devices[indiceObjetoExistente] = deviceInfo[0];
                        } else {
                          let newDeviceToAdd = data.filter(
                            (item) => item.dev_uuid === dataTable.rowData[0]
                          );
                          newDeviceToAdd[0].dev_image = reader.result;

                          devices.push(newDeviceToAdd[0]);
                        }

                        document.getElementById(
                          `logo-${dataTable.rowData[0]}`
                        ).src = reader.result;
                      });
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  sx={{ visibility: "hidden", overflow: "hidden", width: 0 }}
                />
              </Button>
              <img
                src={
                  dataTable.rowData[5] !== null
                    ? dataTable.rowData[5]
                    : UsinIcon
                }
                alt="logo"
                id={`logo-${dataTable.rowData[0]}`}
                style={{ width: "80px", height: "40px", borderRadius: "50%" }}
              />
            </Box>
          );
        },
      },
    },
    {
      name: "dev_install",
      label: "Número de Instalação",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          function setValuesInstallNumber(install_number) {
            let dev_install = install_number;

            let deviceInfo = devices.filter(
              (item) => item.uuid === dataTable.rowData[0]
            );

            if (deviceInfo.length != 0) {
              deviceInfo[0].dev_install = dev_install;

              const indiceObjetoExistente = devices.findIndex(
                (item) => item.uuid === deviceInfo[0].dev_uuid
              );

              devices[indiceObjetoExistente] = deviceInfo[0];
            } else {
              let newDeviceToAdd = data.filter(
                (item) => item.uuid === dataTable.rowData[0]
              );
              newDeviceToAdd[0].dev_install = dev_install;

              devices.push(newDeviceToAdd[0]);
            }
          }
          return (
            <InstallNumber
              value={dataTable.rowData[5]}
              setValuesInstallNumber={setValuesInstallNumber}
            />
          );
        },
      },
    },
    {
      name: "gen_estimated",
      label: "Geração estimada",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          function setValuesEstimatedGeneration(estimated_generation) {
            let gen_estimated = estimated_generation;

            let deviceInfo = devices.filter(
              (item) => item.uuid === dataTable.rowData[0]
            );

            if (deviceInfo.length != 0) {
              deviceInfo[0].gen_estimated = gen_estimated;

              const indiceObjetoExistente = devices.findIndex(
                (item) => item.uuid === deviceInfo[0].dev_uuid
              );

              devices[indiceObjetoExistente] = deviceInfo[0];
            } else {
              let newDeviceToAdd = data.filter(
                (item) => item.uuid === dataTable.rowData[0]
              );
              newDeviceToAdd[0].gen_estimated = gen_estimated;

              devices.push(newDeviceToAdd[0]);
            }
          }
          return (
            <EstimatedGeneration
              value={dataTable.rowData[6]}
              setValuesEstimatedGeneration={setValuesEstimatedGeneration}
            />
          );
        },
      },
    },
    {
      name: "whatsapp_number",
      label: "Telefone WhatsApp",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          function setValuesWhatsAppNumber(whatsapp_number_new) {
            let whatsapp_number = whatsapp_number_new;

            let deviceInfo = devices.filter(
              (item) => item.uuid === dataTable.rowData[0]
            );

            if (deviceInfo.length != 0) {
              deviceInfo[0].whatsapp_number = whatsapp_number;

              const indiceObjetoExistente = devices.findIndex(
                (item) => item.uuid === deviceInfo[0].dev_uuid
              );

              devices[indiceObjetoExistente] = deviceInfo[0];
            } else {
              let newDeviceToAdd = data.filter(
                (item) => item.uuid === dataTable.rowData[0]
              );
              newDeviceToAdd[0].whatsapp_number = whatsapp_number;

              devices.push(newDeviceToAdd[0]);
            }
          }
          return (
            <WhatsAppNumber
              value={dataTable.rowData[7]}
              setValuesWhatsAppNumber={setValuesWhatsAppNumber}
            />
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (name, dataTable) => {
          function setValuesEmailNumber(email_new) {
            let email = email_new;

            let deviceInfo = devices.filter(
              (item) => item.uuid === dataTable.rowData[0]
            );

            if (deviceInfo.length != 0) {
              deviceInfo[0].email = email;

              const indiceObjetoExistente = devices.findIndex(
                (item) => item.uuid === deviceInfo[0].dev_uuid
              );

              devices[indiceObjetoExistente] = deviceInfo[0];
            } else {
              let newDeviceToAdd = data.filter(
                (item) => item.uuid === dataTable.rowData[0]
              );
              newDeviceToAdd[0].email = email;

              devices.push(newDeviceToAdd[0]);
            }
          }
          return (
            <Email
              value={dataTable.rowData[8]}
              setValuesEmailNumber={setValuesEmailNumber}
            />
          );
        },
      },
    },
  ];

  if (usersAPIData.isDashboardDataLoading) {
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

  if (updatingEmailAndCapacity) {
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
        <Typography>Alteração em andamento</Typography>
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
        width: "90vw",
        height: "60vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "100%",
          overflow: "auto",
          maxWidth: "90vw",
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
