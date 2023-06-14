// IMPORTS
import { useEffect, useState } from "react";
import moment from "moment-timezone";

// COMPONENTS
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { formatarMoeda } from "src/helpers/utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// QUERIES
import {
  useGetProjectionQuery,
  usePatchProjectionMutation,
} from "src/services/generation";
import { useLazyGetInvestmentQuery } from "src/services/investment";

// ASSETS
import AddIcon from "@mui/icons-material/Add";

// MODAL PARA DEFINIR VALOR DE INVESTIMENTO
export const InvestmentModal = (props) => {
  const { date, devUuid } = props;

  const [open, setOpen] = useState(false);
  const [valueInvestment, setValueInvestment] = useState(0);

  const [getInvestment] = useLazyGetInvestmentQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem(devUuid, formatarMoeda(valueInvestment));
    getInvestment({ date, devUuid });
    handleClose();
  }

  // ----- useEffect ----- //
  useEffect(() => {
    if (localStorage.getItem(devUuid))
      setValueInvestment(localStorage.getItem(devUuid));
  }, [devUuid]);
  useEffect(() => {
    if (devUuid) getInvestment({ date, devUuid });
  }, [date, devUuid]);

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddIcon fontSize="small" />}
        sx={{ ml: 2 }}
        size="large"
        onClick={handleOpen}
      >
        Definir valor de Investimento
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Valor de Investimento</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe o valor de investimneto para o caculo de geração real.
              <br />
              Valor de investimento * geração real
            </DialogContentText>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              autoFocus
              label="Valor de investimento"
              value={formatarMoeda(valueInvestment)}
              onChange={(evt) => setValueInvestment(evt.target.value)}
              name="valueInvestment"
              // InputProps={{
              //   inputComponent: NumberFormatReal,
              // }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Definir</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const PROJECTION_MIN_PERCENTAGE = 0;
const PROJECTION_MAX_PERCENTAGE = 5;

// MODAL PARA DEFINIR A GERAÇÃO ESTIMADA DO MÊS
// componente descutinuado
export const EstimatedGenerationModal = (props) => {
  const { devUuid } = props;

  const [open, setOpen] = useState(false);
  const [dateEstimatedGeneration, setDateEstimatedGeneration] = useState(
    moment().format()
  );
  const [percentMaxMin, setPercentMaxMin] = useState(0);

  const { data: projection } = useGetProjectionQuery(
    {
      date: dateEstimatedGeneration,
      devUuid,
    },
    { skip: !devUuid }
  );
  const [patchProjection] = usePatchProjectionMutation();

  const projectionMonth = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    gen_date: moment().set("month", i).set("date", 1).format("YYYY-MM-DD"),
    gen_projection: 0,
  }));

  const [valueProjection, setValueProjection] = useState(projectionMonth);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleProjectionChange = (event) => {
    const value = +event.target.value;

    setPercentMaxMin(
      Math.max(
        Math.min(value, PROJECTION_MAX_PERCENTAGE),
        PROJECTION_MIN_PERCENTAGE
      )
    );
  };

  function handleSubmit(event) {
    event.preventDefault();
    patchProjection({
      value: valueProjection,
      percentMaxMin,
      dateEstimatedGeneration,
      devUuid,
    });
    handleClose();
  }

  function handleProjection(index, item) {
    let newArr = [...valueProjection];
    newArr[index].gen_projection = item;
    setValueProjection(newArr);
  }

  useEffect(() => {
    setValueProjection(projectionMonth);
    if (projection?.length) {
      const result = valueProjection.map((item) => {
        let auxIf = projection.filter(
          (value) =>
            moment(value.gen_date).get("month") + 1 ===
            moment(item.gen_date).get("month") + 1
        );
        if (auxIf.length !== 0)
          return {
            ...item,
            percentMaxMin,
            gen_projection: auxIf[0].gen_projection,
          };
        return { ...item, percentMaxMin };
      });
      setValueProjection(result);
      setPercentMaxMin(
        Math.min(projection[0].gen_percentage, PROJECTION_MAX_PERCENTAGE)
      );
    }
  }, [projection]);

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddIcon fontSize="small" />}
        sx={{ ml: 2 }}
        size="large"
        onClick={handleOpen}
      >
        Definir projeção
      </Button>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Informe porcentagem do valor da projeção:</DialogTitle>

          <DialogContent sx={{ mt: 2 }}>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <DialogContentText sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TextField
                    sx={{ mr: 3 }}
                    autoFocus
                    label="Porcentagem Max/Min"
                    type="number"
                    value={percentMaxMin}
                    onChange={handleProjectionChange}
                    name="percentMaxMin"
                    // InputProps={{
                    //   inputComponent: NumberFormatReal,
                    // }}
                  />
                  <DatePicker
                    openTo="year"
                    label="Ano da projeção"
                    value={dateEstimatedGeneration}
                    views={["year"]}
                    disabled
                    onChange={(date) =>
                      setDateEstimatedGeneration(moment(date._d).format())
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </DialogContentText>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {valueProjection.map((item, index) => (
                  <Grid item md={3} key={index}>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      autoFocus
                      type="number"
                      label={
                        "Valor da projeção de " +
                        moment(item.gen_date).format("MMMM")
                      }
                      value={item.gen_projection}
                      onChange={(evt) =>
                        handleProjection(index, evt.target.value)
                      }
                      variant="standard"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Definir
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
