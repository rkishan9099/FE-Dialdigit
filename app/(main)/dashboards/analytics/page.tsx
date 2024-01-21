"use client";
import IconifyIcon from "@/@core/components/icon";
import DialPad from "@/components/dialer/Dialpad/DialPad";
import OngoingCall from "@/components/dialer/OngoingCall/OngoingCall";
import useSipClient from "@/hooks/dialer/useSipClient";
import { useAuth } from "@/hooks/useAuth";
import useSipFunctionality from "@/hooks/useSipFunctionality";
import { SipUA } from "@/lib/Sip";
import { Button, Divider, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const DashboardPage = () => {
  const { user } = useAuth();
  const { hangUp, createUA, call, disConnect } = useSipClient();
  const [number, setNumber] = useState<string>("");

  const connectHandler = async () => {
    await createUA();
  };
  const callHandler = () => {
    call(number);
  };

  const disconnectHandler = () => {
    disConnect();
  };

  return (
    <>
      <div>Welcome {user?.name}</div>
       <Stack sx={{marginTop:'30px'}}>
<OngoingCall />
     </Stack>


      <Stack sx={{ margin: "20px 0", width: "400px" }}>
        <h4>Dial Number :{number}</h4>
        <TextField
          size="small"
          label="Enter Number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNumber(e.target.value);
          }}
          value={number}
        />
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
        <Button variant={"contained"} onClick={() => hangUp()}>
          Call hangUp
        </Button>
        <Button variant={"contained"} onClick={() => hangUp()}>
          Call Hold
        </Button>
      </Stack>
    
    </>
  );
};

export default DashboardPage;
