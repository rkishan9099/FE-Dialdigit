import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { RootState } from "@/store";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ActionText = styled(Typography)(({ theme }) => ({
  color: "white",
  marginTop: "7px",
  fontSize: "12px",
}));
const CallActionButton = () => {
  const { isHolded, hold, unhold, mute, unmute, isMuted } = useSipClient();
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
        {isMuted() ? (
          <CustomActionButton onClick={() => unmute()}>
            <IconifyIcon icon={"mdi:microphone"} width={"25px"} />
            <ActionText>UnMute</ActionText>
          </CustomActionButton>
        ) : (
          <CustomActionButton onClick={() => mute()}>
            <IconifyIcon icon={"vaadin:mute"} width={"25px"} />
            <ActionText>Mute</ActionText>
          </CustomActionButton>
        )}

        {isHolded() ? (
          <CustomActionButton onClick={() => unhold()}>
            <IconifyIcon icon={"solar:play-bold"} width={"25px"} />
            <ActionText>UnHold</ActionText>
          </CustomActionButton>
        ) : (
          <CustomActionButton onClick={() => hold()}>
            <IconifyIcon icon={"solar:pause-bold"} width={"25px"} />
            <ActionText>Hold</ActionText>
          </CustomActionButton>
        )}

        <CustomActionButton>
          <IconifyIcon icon={"eva:keypad-fill"} width={"25px"} />
          <ActionText>Keypad</ActionText>
        </CustomActionButton>
      </Stack>
    </Stack>
  );
};

export default CallActionButton;
