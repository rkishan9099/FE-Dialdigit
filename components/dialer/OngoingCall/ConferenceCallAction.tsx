import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import { ActionText } from "@/@core/styles/mui/utilstyle";
import useSipClient from "@/hooks/dialer/useSipClient";
import { Stack } from "@mui/material";
import React from "react";

const ConferenceCallAction = () => {
  const {
    isHoldedAllCall,
    isMutedAllCall,
    holdAllCall,
    unholdAllCall,
    muteAllCall,
    unmuteAllCall,
  } = useSipClient();

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
      sx={{ margin: "20px" }}
    >
    
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
        sx={{ color: "white", padding: "10px" }}
      >
        {isMutedAllCall() ? (
          <CustomActionButton onClick={() => unmuteAllCall()}>
            <IconifyIcon icon={"mdi:microphone"} width={"25px"} />
            <ActionText>UnMute</ActionText>
          </CustomActionButton>
        ) : (
          <CustomActionButton onClick={() => muteAllCall()}>
            <IconifyIcon icon={"vaadin:mute"} width={"25px"} />
            <ActionText>Mute</ActionText>
          </CustomActionButton>
        )}

        {isHoldedAllCall() ? (
          <CustomActionButton onClick={() => unholdAllCall()}>
            <IconifyIcon icon={"solar:play-bold"} width={"25px"} />
            <ActionText>UnHold</ActionText>
          </CustomActionButton>
        ) : (
          <CustomActionButton onClick={() => holdAllCall()}>
            <IconifyIcon icon={"solar:pause-bold"} width={"25px"} />
            <ActionText>Hold</ActionText>
          </CustomActionButton>
        )}
      </Stack>
    </Stack>
  );
};

export default ConferenceCallAction;
