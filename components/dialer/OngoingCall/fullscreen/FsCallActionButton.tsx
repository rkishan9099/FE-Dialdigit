"use client";
import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import { ActionText } from "@/@core/styles/mui/utilstyle";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { OngoingSessionState } from "@/lib/Sip/sip-type";
import { AppDispatch, RootState } from "@/store";
import { updateSipState } from "@/store/dialer/sip";
import { Card, Stack, useTheme } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CallTransferButton from "../CallTransferButton";

const FsCallActionButton = () => {
  const theme = useTheme();
  const { getActiveSession, sessionCount } = useSipSessionManager();
  const { sessionState, isAttendedTransfer, isMergeCall } = useSelector(
    (state: RootState) => state.sip
  );
  const { terminate, conference, unholdAllCall } = useSipClient();
  const activeSession = getActiveSession();
  const dispatch = useDispatch<AppDispatch>();

  const buttonDisabledCondition =
    sessionState &&
    [
      OngoingSessionState.RINGING,
      OngoingSessionState.FAILED,
      OngoingSessionState.COMPLETED,
    ].includes(sessionState)
      ? true
      : false;

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

  const hangupHandler = () => {
    if (activeSession) {
      terminate(480, "Call Finished", undefined);
    } else {
      toast.error("No Call Running to hangup ");
    }
  };

  const addCallHandler = () => {
    dispatch(updateSipState({ key: "isAddCall", value: true }));
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: true }));
  };

  const mergeCallHandler = () => {
    if (sessionCount() > 0) {
      unholdAllCall();
      conference();
      dispatch(updateSipState({ key: "isMergeCall", value: true }));
    }
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ marginBottom: "20px" }}
    >
      <Card
        sx={{
          boxShadow: theme.shadows[12],
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
          sx={{
            color: "white",
          }}
        >
          <CustomActionButton sx={ButtonStyle}>
            <IconifyIcon icon={"mdi:microphone"} width={"25px"} />
          </CustomActionButton>

          <CustomActionButton
            sx={ButtonStyle}
            disabled={buttonDisabledCondition}
          >
            <IconifyIcon icon={"vaadin:mute"} width={"25px"} />
          </CustomActionButton>

          <CustomActionButton
            sx={ButtonStyle}
            disabled={buttonDisabledCondition}
          >
            <IconifyIcon icon={"solar:play-bold"} width={"25px"} />
          </CustomActionButton>

          <CustomActionButton
            sx={ButtonStyle}
            disabled={buttonDisabledCondition}
          >
            <IconifyIcon icon={"solar:pause-bold"} width={"25px"} />
          </CustomActionButton>

          <CustomActionButton
            sx={ButtonStyle}
            disabled={buttonDisabledCondition}
          >
            <IconifyIcon icon={"eva:keypad-fill"} width={"25px"} />
          </CustomActionButton>
          <CustomActionButton
            sx={ButtonStyle}
            disabled={sessionCount() > 0 ? false : true}
            onClick={addCallHandler}
          >
            <IconifyIcon icon={"mingcute:user-add-fill"} width={"25px"} />
          </CustomActionButton>

          <CustomActionButton
            onClick={hangupHandler}
            sx={{ ...ButtonStyle, background: "red", color: "whitesmoke" ,'&:hover':{
              color:'red',
              background:'whitesmoke'
            }}}
            // disabled={sessionCount() > 0 ? false : true}
          >
            <IconifyIcon icon={"material-symbols:call-end"} width={"40px"} />
          </CustomActionButton>

          <CallTransferButton />

          <CustomActionButton
            sx={ButtonStyle}
            disabled={buttonDisabledCondition}
            onClick={mergeCallHandler}
          >
            <IconifyIcon icon={"mdi:call-merge"} width={"25px"} />
          </CustomActionButton>
        </Stack>
      </Card>
    </Stack>
  );
};

export default FsCallActionButton;
