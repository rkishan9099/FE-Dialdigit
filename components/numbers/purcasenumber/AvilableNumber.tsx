import FormProvider from "@/hooks/hook-form/FormProvider";
import { RHFCustomAutocomplete } from "@/hooks/hook-form/RHFAutocomplete";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import countries from "@/data/contries.json";
import states from "@/data/state.json";
import * as yup from "yup";
import { RHFCustomSelect, RHFCustomTextFiled } from "@/hooks/hook-form";
import { RHFCheckbox } from "@/hooks/hook-form/RHFCheckbox";
import NumberSelection from "./NumberSelection";
import { useAppDispatch } from "@/lib/redux/store";
import { getAvailableNumber } from "@/store/dialer/number/number";
import SelectedNumber from "./SelectedNumber";
import CustomTextField from "@/@core/components/mui/text-field";

const defaultValues = {
  countryCode: "US",
  voiceEnabled: true,
  smsEnabled: true,
  faxEnabled: true,
  contains: "",
  type: "local",
  areaCode: "",
};
const schema = yup.object().shape({
  countryCode: yup.string().required("Country Code is required"),
  voiceEnabled: yup.boolean(),
  smsEnabled: yup.boolean(),
  faxEnabled: yup.boolean(),
  contains: yup.string(),
  type: yup.string().required("Type is required"),
  areaCode: yup.string(),
});

type PropsType = {
  setSelectedNumber: (number: any) => void;
  selectedNumber: any;
};

function AvilableNumber(props: PropsType) {
  const { selectedNumber, setSelectedNumber } = props;
  const dispatch = useAppDispatch();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const breakpointMD = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("sm", "lg")
  );
  const { handleSubmit, watch, reset, setValue } = methods;
  const onSubmit = (data: any) => {
    console.debug("data", data);
    dispatch(getAvailableNumber(data));
  };

  const resetHandle = () => {
    reset(defaultValues);
    dispatch(getAvailableNumber({ type: "local", countryCode: "US" }));
    setSelectedNumber(null);
  };
  return (
    <Stack sx={{ width: "100%", padding: "15px" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} mb={2}>
            <RHFCustomAutocomplete
              fullWidth
              size="small"
              name="countryCode"
              options={countries}
              getOptionLabel={(option: any) =>
                `+${option.number} ${option.name} (${option.code})`
              }
              onChange={(event, newVal: any) => {
                setValue("countryCode", newVal?.code || "US");
              }}
              label="Select country"
              placeholder={"Select country"}
            />
          </Grid>
          <Grid item xs={12} sm={4} mb={2}>
            <RHFCustomAutocomplete
              fullWidth
              size="small"
              name="areaCode"
              options={states}
              getOptionLabel={(option: any) =>
                `${option.name} (${option.areaCode})`
              }
              onChange={(event, newVal: any) => {
                setValue("areaCode", newVal?.areaCode || "");
              }}
              label="Select Area"
              placeholder="Select Area"
            />
          </Grid>
          <Grid item xs={12} sm={4} mb={2}>
            <RHFCustomSelect
              name="type"
              size="small"
              fullWidth
              native
              label="Number Type"
            >
              <option value="local">Local</option>
              <option value="toll-free">Toll Free</option>
            </RHFCustomSelect>
          </Grid>
          <Grid item xs={12} sm={4} mb={2}>
            <RHFCustomTextFiled
              name="contains"
              label="Search By Digit"
              placeholder="Search By Digit"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4} mb={2}>
            <Stack>
              <Typography>Capabiliites</Typography>
              <Stack direction="row" spacing={1}>
                <RHFCheckbox name="voiceEnabled" label={"Voice"} />
                <RHFCheckbox name="smsEnabled" label={"SMS"} />
                <RHFCheckbox name="faxEnabled" label={"Fax"} />
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} mb={2}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={3}
              sx={{ height: "100%" }}
            >
              <Button variant="contained" type="submit">
                Search
              </Button>
              <Button variant="tonal" color="secondary" onClick={resetHandle}>
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
      {selectedNumber && (
        <Stack
          sx={{
            padding: "10px",
            margin: "15px",
            border: "2px dotted",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h5">Selected Number</Typography>
          <SelectedNumber number={selectedNumber} />
        </Stack>
      )}
      <NumberSelection
        setSelectedNumber={setSelectedNumber}
        selectedNumber={selectedNumber}
      />
    </Stack>
  );
}

export default AvilableNumber;
