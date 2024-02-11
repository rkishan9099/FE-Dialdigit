"use client";
import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { OngoingSessionState } from "@/lib/Sip/sip-type";
import { AppDispatch, RootState } from "@/store";
import { Stack, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSipState } from "@/store/dialer/sip";
import { ActionText } from "@/@core/styles/mui/utilstyle";

const CallActionButton = () => {
  const theme = useTheme();
  const { isHolded, hold, unhold, mute, unmute, isMuted } = useSipClient();
  const { sessionCount } = useSipSessionManager();
  const { sessionState, isAttendedTransfer, isAddCall } = useSelector(
    (state: RootState) => state.sip
  );

  const ButtonStyle = {
    color: theme.palette.mode === "light" ? "black" : "white",
    "&:hover": {
      background: theme.palette.customColors.bodyBg,
    },
    "&:disabled": {
      background:
        theme.palette.mode === "light" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.2)",
      color: "rgba(255,255,255,0.5)",
    },
  };

  const buttonDisabledCondition =
    sessionState &&
    [
      OngoingSessionState.RINGING,
      OngoingSessionState.FAILED,
      OngoingSessionState.COMPLETED,
    ].includes(sessionState)
      ? true
      : false;

  const dispatch = useDispatch<AppDispatch>();
  const toggleDtmf = () => {
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: true }));
    dispatch(updateSipState({ key: "toggleDTMF", value: true }));
    dispatch(updateSipState({ key: "isAttendedTransfer", value: false }));
    dispatch(updateSipState({ key: "isBlindTransfer", value: false }));
    dispatch(updateSipState({ key: "isAddCall", value: false }));
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
            <Tooltip title={"UnMute"}>
              <CustomActionButton
                onClick={() => unmute()}
                disabled={buttonDisabledCondition}
                sx={ButtonStyle}
              >
                <IconifyIcon icon={"mdi:microphone"} width={"25px"} />
              </CustomActionButton>
            </Tooltip>
          ) : (
            <Tooltip title={"Mute"}>
              <CustomActionButton
                onClick={() => mute()}
                disabled={buttonDisabledCondition}
                sx={ButtonStyle}
              >
                <IconifyIcon icon={"vaadin:mute"} width={"25px"} />
              </CustomActionButton>
            </Tooltip>
          )}

          {isHolded() ? (
            <Tooltip title={"UnHold"}>
              <CustomActionButton
                onClick={() => unhold()}
                disabled={buttonDisabledCondition}
                sx={ButtonStyle}
              >
                <IconifyIcon icon={"solar:play-bold"} width={"25px"} />
              </CustomActionButton>
            </Tooltip>
          ) : (
            <Tooltip title={"Hold"}>
              <CustomActionButton
                onClick={() => hold()}
                disabled={buttonDisabledCondition}
                sx={ButtonStyle}
              >
                <IconifyIcon icon={"solar:pause-bold"} width={"25px"} />
              </CustomActionButton>
            </Tooltip>
          )}

          {sessionCount() <= 1 && (
            <Tooltip title={"DTMF"}>
              <CustomActionButton
                onClick={toggleDtmf}
                // disabled={buttonDisabledCondition}
                sx={ButtonStyle}
              >
                <IconifyIcon icon={"eva:keypad-fill"} width={"25px"} />
              </CustomActionButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
      {/* <DtmfDialog /> */}
    </>
  );
};

export default CallActionButton;
