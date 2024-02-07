import React, { useState } from "react";
import CallDetails from "./CallDetails";
import {
  Button,
  Card,
  ClickAwayListener,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import CallFooterActionButton from "./CallFooterActionButton";
import CallDialPadDrawer from "./CallDialPadDrawer";
import ConferenceCallList from "./ConferenceCallList";


const OngoingCall = () => {
  const theme = useTheme();
  return (
    <>
      <Stack sx={{ width: "100%",maxWidth:'320px',minHeight:'450px' ,borderRadius: "15px",position:"relative" }}>
        <Card sx={{ borderRadius: "15px", boxShadow: theme.shadows[8] }}>
          <CallDetails />
          <Stack sx={{ background: theme.palette.customColors.bodyBg }}>
            <CallFooterActionButton />
          </Stack>
        </Card>
        <CallDialPadDrawer />
      </Stack>
    </>
  );
};

export default OngoingCall;
