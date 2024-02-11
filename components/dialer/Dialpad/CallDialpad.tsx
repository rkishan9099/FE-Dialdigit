"use client";
import React, { useState } from "react";
import DialPad from "./DialPad";
import { IconButton } from "@mui/material";
import IconifyIcon from "@/@core/components/icon";
import useSipClient from "@/hooks/dialer/useSipClient";
import toast from "react-hot-toast";

const CallDialpad = () => {
  const [number, setNumber] = useState<string>("");
  const { call } = useSipClient();
  const callHandler = () => {
    if (number) {
      call(number);
    } else {
      toast.error("Enter Number");
    }
  };

  return (
    <DialPad number={number} setNumber={setNumber}>
      <IconButton
        sx={{
          width: "56px",
          height: "56px",
          background: "#44b700",
          color: "white",
        }}
        onClick={callHandler}
      >
        <IconifyIcon icon={"material-symbols:call"} fontSize={"29px"} />
      </IconButton>
    </DialPad>
  );
};

export default CallDialpad;
