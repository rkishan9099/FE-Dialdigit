"use client";
// ** React Imports
import { ChangeEvent, Fragment, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import MenuItem from "@mui/material/MenuItem";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import { Theme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiStep, { StepProps } from "@mui/material/Step";
import { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Custom Components Imports
import CustomAvatar from "@/@core/components/mui/avatar";
import CustomTextField from "@/@core/components/mui/text-field";

// ** Hook Import
import { useSettings } from "@/@core/hooks/useSettings";

// ** Util Import
import { hexToRGBA } from "@/@core/utils/hex-to-rgba";

// ** Styled Component
import StepperWrapper from "@/@core/styles/mui/stepper";
import StepperCustomDot from "@/@core/views/form/form-wizard/StepperCustomDot";
import CustomAutocomplete from "@/@core/components/mui/autocomplete";

import countries from "@/data/contries.json";

import states from "@/data/state.json";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFAutocomplete,
  RHFCustomSelect,
  RHFCustomTextFiled,
  RHFMultiSelect,
  RHFSelect,
} from "@/hooks/hook-form";
import FormProvider from "@/hooks/hook-form/FormProvider";
import label from "@/@core/components/label";
import Autocomplete from "@/@core/theme/overrides/autocomplete";
import * as yup from "yup";
import { RHFCustomAutocomplete } from "@/hooks/hook-form/RHFAutocomplete";
import { Stack } from "@mui/material";
import { RHFCheckbox } from "@/hooks/hook-form/RHFCheckbox";
import NumberSelection from "./purcasenumber/NumberSelection";

interface State {
  password: string;
  password2: string;
  showPassword: boolean;
  showPassword2: boolean;
}

const steps = [
  {
    icon: "carbon:character-whole-number",
    title: "Select Number",
    subtitle: "Select Your Favorite Number",
  },
  {
    icon: "iwwa:assign",
    title: "Assign Eextension",
    subtitle: "Setup Information",
  },
  {
    icon: "fluent-mdl2:waitlist-confirm-mirrored",
    title: "Confirmation",
    subtitle: "Add Social Links",
  },
  {
    icon: "streamline:payment-10",
    title: "Payment",
    subtitle: "Add Social Links",
  },
];

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  "&:first-of-type": {
    paddingLeft: 0,
  },
  "&:last-of-type": {
    paddingRight: 0,
  },
  "& .MuiStepLabel-iconContainer": {
    display: "none",
  },
  "& .step-subtitle": {
    color: `${theme.palette.text.disabled} !important`,
  },
  "& + svg": {
    color: theme.palette.text.disabled,
  },
  "&.Mui-completed .step-title": {
    color: theme.palette.text.disabled,
  },
  "&.Mui-completed + svg": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    padding: 0,
    ":not(:last-of-type)": {
      marginBottom: theme.spacing(6),
    },
  },
}));

const NumberType = [
  {
    label: "Local",
    value: "local",
  },
  {
    label: "Toll Free",
    value: "toll-free",
  },
];

// ** Hooks

const defaultSearchNumbers = {
  countryCode: "US",
  voiceEnabled: true,
  smsEnabled: true,
  faxEnabled: true,
  contains: "",
  type: "local",
  areaCode: "",
};
const serchNumberSchema = yup.object().shape({
  countryCode: yup.string().required("Country Code is required"),
  voiceEnabled: yup.boolean(),
  smsEnabled: yup.boolean(),
  faxEnabled: yup.boolean(),
  contains: yup.string(),
  type: yup.string().required("Type is required"),
  areaCode: yup.string(),
});
const PurchaseNumber = () => {
  // ** States
  const [email, setEmail] = useState<string>("");
  const [google, setGoogle] = useState<string>("");
  const [country, setCountry] = useState<string>("US");
  const [areaCode, setAreaCode] = useState<string>("US");

  const [twitter, setTwitter] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [language, setLanguage] = useState<string[]>([]);

  // ** Hooks & Var
  const { settings } = useSettings();
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { direction } = settings;

  const methods = useForm({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success("Form Submitted");
    }
  };
  const onSubmit = (data: any) => {
    console.debug("data", data);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const serachNumberMethod = useForm({
    defaultValues: defaultSearchNumbers,
    resolver: yupResolver(serchNumberSchema),
  });


  const { handleSubmit, watch, reset } = methods;

  const handleSearch = async (data: any) => {
    console.table(data);
  };
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack
            sx={{
              padding: "15px",
              width: "100%",
              "& form": {
                width: "100%",
              },
            }}
          >
            <FormProvider
              methods={serachNumberMethod}
              onSubmit={serachNumberMethod.handleSubmit(handleSearch)}
            >
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
                    name="contain"
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
                    <Button variant="contained" type="submit">Search</Button>
                    <Button
                      variant="tonal"
                      color="secondary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Reset
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </FormProvider>
            <Divider>Avilable Number</Divider>
            <NumberSelection />
          </Stack>
        );
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="First Name"
                placeholder="Leonard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Last Name"
                placeholder="Carter"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="Country"
                id="stepper-custom-horizontal-personal-select"
                SelectProps={{
                  value: country,
                  onChange: (e) => setCountry(e.target.value as string),
                }}
              >
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="Language"
                SelectProps={{
                  multiple: true,
                  value: language,
                  onChange: (e) => console.log("object"),
                }}
                id="stepper-custom-horizontal-personal-multiple-select"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
              </CustomTextField>
            </Grid>
          </Fragment>
        );
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Google+"
                value={google}
                onChange={(e) => setGoogle(e.target.value)}
                placeholder="https://plus.google.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="LinkedIn"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/carterLeonard"
              />
            </Grid>
          </Fragment>
        );
      default:
        return "Unknown Step";
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      );
    } else {
      return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {steps[activeStep].title}
              </Typography>
              <Typography variant="caption" component="p">
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="tonal"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={
              !smallScreen ? (
                <Icon
                  icon={
                    direction === "ltr"
                      ? "tabler:chevron-right"
                      : "tabler:chevron-left"
                  }
                />
              ) : null
            }
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar;

              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className="step-label">
                      <RenderAvatar
                        variant="rounded"
                        {...(activeStep >= index && { skin: "light" })}
                        {...(activeStep === index && { skin: "filled" })}
                        {...(activeStep >= index && { color: "primary" })}
                        sx={{
                          ...(activeStep === index && {
                            boxShadow: (theme) => theme.shadows[3],
                          }),
                          ...(activeStep > index && {
                            color: (theme) =>
                              hexToRGBA(theme.palette.primary.main, 0.4),
                          }),
                        }}
                      >
                        <Icon icon={step.icon} />
                      </RenderAvatar>
                      <div>
                        <Typography className="step-title">
                          {step.title}
                        </Typography>
                        <Typography className="step-subtitle">
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider sx={{ m: "0 !important" }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default PurchaseNumber;
