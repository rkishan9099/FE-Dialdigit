'use client'
import React from "react";
import CallDetails from "./CallDetails";
import {
  Card,
  Stack,
  useTheme,
} from "@mui/material";
import CallFooterActionButton from "./CallFooterActionButton";
import CallDialPadDrawer from "./CallDialPadDrawer";


const OngoingCall = () => {
  const theme = useTheme();
  return (
    <>
      <Stack sx={{ width: "100%",borderRadius: "12px",position:"relative",height:'100%',overflow:'hidden' }}>
        <Card sx={{ borderRadius: "15px", boxShadow: theme.shadows[8] ,height:'100%'}}>
          <CallDetails />
          <Stack sx={{ background: theme.palette.customColors.bodyBg,height:'100%' }}>
            <CallFooterActionButton />
          </Stack>
        </Card>
        <CallDialPadDrawer />
      </Stack>
    </>
  );
};

export default OngoingCall;
