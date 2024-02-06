"use client";
import IconifyIcon from "@/@core/components/icon";
import { getUser } from "@/actions/userActions";
import DialPad from "@/components/dialer/Dialpad/DialPad";
import OngoingCall from "@/components/dialer/OngoingCall/OngoingCall";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { useAuth } from "@/hooks/useAuth";
import useSipFunctionality from "@/hooks/useSipFunctionality";
import { SipUA } from "@/lib/Sip";
import { RootState, store } from "@/store";
import { sendMissedCallEmail } from "@/store/dialer/sip";
import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <div>Welcome {user?.name}</div>
      <Stack>
<OngoingCall />
      </Stack>
      <Grid container>
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
