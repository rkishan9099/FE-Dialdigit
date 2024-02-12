"use client";
import { getUser } from "@/actions/userActions";
import CallDialpad from "@/components/dialer/Dialpad/CallDialpad";
import OngoingCall from "@/components/dialer/OngoingCall/OngoingCall";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { useAuth } from "@/hooks/useAuth";
import { AppDispatch } from "@/store";
import { Button, Grid, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const { sessionCount } = useSipSessionManager();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sm={6}>
          {sessionCount() > 0 ? <OngoingCall /> : <CallDialpad />}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
