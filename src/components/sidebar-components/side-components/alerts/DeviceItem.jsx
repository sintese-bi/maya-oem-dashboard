import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const DeviceItem = ({
  data,
  index,
  register,
  autoComplete,
  setValue,
}) => {
  const [genEstimatedIsInputed, setGenEstimatedIsInputed] = useState(false);

  function handleEstimatedGeneration(value) {
    if (value != 0) {
      setValue(`dev_address_${index}`, "");
      setValue(`dev_capacity_${index}`, 0);
      setGenEstimatedIsInputed(true);
    } else {
      setGenEstimatedIsInputed(false);
    }
  }

  return (
    <Box key={index}>
      <Typography variant="body2">{data.dev_name}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          value={data.dev_name || null}
          {...register(`dev_name_${index}`)}
          sx={{ display: "none" }}
          margin="normal"
          label="Name"
          type="text"
        />
        <TextField
          value={data.dev_uuid}
          {...register(`dev_uuid_${index}`)}
          sx={{ display: "none" }}
          margin="normal"
          label="ID"
          type="text"
        />
        <Box sx={{ display: "flex", mr: 2, gap: 2 }}>
          <TextField
            defaultValue={data.dev_email || null}
            {...register(`dev_email_${index}`)}
            sx={{ width: "100%" }}
            margin="normal"
            label="Email"
            type="text"
          />
          <TextField
            defaultValue={data.dev_address || null}
            {...register(`dev_address_${index}`)}
            onChange={(e) => {
              autoComplete(e.currentTarget.value, index);
            }}
            placeholder="Cidade-Estado"
            margin="normal"
            label="End. de instalação"
            type="text"
            aria-description="Por favor siga o exemplo Cidade-Estado, para evitar processamento de infomarções."
            disabled={genEstimatedIsInputed}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            mr: 2,
            gap: 2,
            justifyConten: "center",
            alignItems: "center",
          }}
        >
          <TextField
            defaultValue={data.dev_capacity || 0}
            {...register(`dev_capacity_${index}`)}
            sx={{ width: "26%" }}
            margin="normal"
            label="Potência"
            type="number"
            disabled={genEstimatedIsInputed}
          />
          <Typography variant="body2" sx={{ width: 90 }}>
            ou insira
          </Typography>
          <TextField
            defaultValue={data.gen_estimated || 0}
            onInput={(e) => handleEstimatedGeneration(e.target.value)}
            {...register(`gen_estimated_${index}`)}
            sx={{}}
            label="Geração estimada"
            type="number"
          />
        </Box>
      </Box>
    </Box>
  );
};
