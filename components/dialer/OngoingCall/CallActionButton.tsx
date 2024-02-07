import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { OngoingSessionState } from "@/lib/Sip/sip-type";
import { AppDispatch, RootState } from "@/store";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DtmfDialog from "../Dialpad/Dtmf/DtmfDialog";
import { updateSipState } from "@/store/dialer/sip";

const ActionText = styled(Typography)(({ theme }) => ({
  color: "white",
  marginTop: "7px",
  fontSize: "12px",
}));
const CallActionButton = () => {
  const { isHolded, hold, unhold, mute, unmute, isMuted } = useSipClient();
  const { sessionCount } = useSipSessionManager();
  const { sessionState, isAttendedTransfer, isAddCall } = useSelector(
    (state: RootState) => state.sip
  );
  const dispatch = useDispatch<AppDispatch>();
  const toggleDtmf = () => {
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: true }));
    dispatch(updateSipState({ key: "toggleDTMF", value: true }));
  };
  return (
    <>
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
            <CustomActionButton
              onClick={() => unmute()}
              disabled={
                sessionState === OngoingSessionState.ANSWERED ? false : true
              }
            >
              <IconifyIcon icon={"mdi:microphone"} width={"25px"} />
              <ActionText>UnMute</ActionText>
            </CustomActionButton>
          ) : (
            <CustomActionButton
              onClick={() => mute()}
              disabled={
                sessionState === OngoingSessionState.ANSWERED ? false : true
              }
            >
              <IconifyIcon icon={"vaadin:mute"} width={"25px"} />
              <ActionText>Mute</ActionText>
            </CustomActionButton>
          )}

          {isHolded() ? (
            <CustomActionButton
              onClick={() => unhold()}
              disabled={
                sessionState === OngoingSessionState.ANSWERED ? false : true
              }
            >
              <IconifyIcon icon={"solar:play-bold"} width={"25px"} />
              <ActionText>UnHold</ActionText>
            </CustomActionButton>
          ) : (
            <CustomActionButton
              onClick={() => hold()}
              disabled={
                sessionState === OngoingSessionState.ANSWERED ? false : true
              }
            >
              <IconifyIcon icon={"solar:pause-bold"} width={"25px"} />
              <ActionText>Hold</ActionText>
            </CustomActionButton>
          )}

          {sessionCount() <= 1 && (
            <CustomActionButton onClick={toggleDtmf}>
              <IconifyIcon icon={"eva:keypad-fill"} width={"25px"} />
              <ActionText>DTMF</ActionText>
            </CustomActionButton>
          )}
        </Stack>
      </Stack>
      {/* <DtmfDialog /> */}
    </>
  );
};

export default CallActionButton;
