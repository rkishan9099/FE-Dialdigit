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
import { Button, Divider, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useAuth();
  const { createUA, call, disConnect } = useSipClient();
  const {sessions,sessionId}=useSelector((state:RootState)=>state.sip)
  const {getSessionState}=useSipSessionManager();
  const [number, setNumber] = useState<string>("");
  

  const connectHandler = async () => {
    await createUA();
  };
  const callHandler = () => {
    call(number,false);
  };

  const disconnectHandler = async () => {
      console.log('sdfghjkl;')
    const storedToken = localStorage.getItem("accessToken");
    // if (storedToken) {
    //   if (config.headers) {
    //     config.headers['Authorization'] = `Bearer ${storedToken}`
    //   }
    // }
    // store.dispatch(sendMissedCallEmail())

  getUser()
// disConnect()
  };

  return (
    <>
      <div>Welcome {user?.name}</div>
       <Stack sx={{marginTop:'30px'}}>
{/* <OngoingCall /> */}
     </Stack>



      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Button variant={"contained"} onClick={connectHandler}>
          Online
        </Button>
        <Button variant={"contained"} onClick={disconnectHandler}>
          Offline
        </Button>
        <Button variant={"contained"} onClick={callHandler}>
          Call
        </Button>
       
      </Stack>
    
    </>
  );
};

export default DashboardPage;
