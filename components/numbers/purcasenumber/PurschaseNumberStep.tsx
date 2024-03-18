"use client";
// ** React Imports
import { ChangeEvent, Fragment, useEffect, useState } from "react";

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
import NumberSelection from "./NumberSelection";
import AssignNumber from "./AssignNumber";
import ConfirmNumber from "./ConfirmNumber";
import NumberPayment from "./NumberPayment";
import AvilableNumber from "./AvilableNumber";
import { createPaymentIntent } from "@/actions/payemt-action";

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

const PurschaseNumberStep = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedNumber, setSelectedNumber] = useState<any>(null);
  const [assignUser, setAssignUser] = useState<string[]>([]);

  // ** Hooks & Var
  const { settings } = useSettings();
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { direction } = settings;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success("Form Submitted");
    }
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AvilableNumber
            setSelectedNumber={setSelectedNumber}
            selectedNumber={selectedNumber}
          />
        );
      case 1:
        return (
          <AssignNumber setAssignUser={setAssignUser} assignUser={assignUser} />
        );
      case 2:
        return <NumberPayment selectedNumber={selectedNumber} assignUser={assignUser} handleBack={handleBack}/>;
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
        <Grid container spacing={5}>
 
          {getStepContent(activeStep)}
          {activeStep < 2&& (
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
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !selectedNumber) ||
                  (activeStep === 1 && assignUser.length === 0)
                    ? true
                    : false
                }
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Grid>
          )}
        </Grid>
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

export default PurschaseNumberStep;
