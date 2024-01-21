import React from "react";
import CallDetails from "./CallDetails";
import { Card, Stack, useTheme } from "@mui/material";
import CallFooterActionButton from "./CallFooterActionButton";

const OngoingCall = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        sx={{ width:'100%', borderRadius: "15px" }}
      >
        <Card sx={{ borderRadius: "15px",boxShadow:theme.shadows[8] }}>
          <CallDetails />
          <Stack sx={{ background: theme.palette.customColors.bodyBg }}>
            <CallFooterActionButton />
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default OngoingCall;
