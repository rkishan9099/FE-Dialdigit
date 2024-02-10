"use client";
import { getUser } from "@/actions/userActions";
import OngoingCall from "@/components/dialer/OngoingCall/OngoingCall";
import { useAuth } from "@/hooks/useAuth";
import { AppDispatch } from "@/store";
import {
  Button,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, {  } from "react";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const { user } = useAuth();
  const media = useMediaQuery("sm");
  const dispatch = useDispatch<AppDispatch>();
  // const { u

  const callApi = async () => {
   const res = await getUser({name:"kishan"});
   console.log('res',res)
  //  console.log(await auth())
  };
  return (
    <>
      <div>Welcome {user?.name}</div>
      <Button onClick={callApi}>Call Api</Button>
      <Stack>
        <OngoingCall />
      </Stack>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
