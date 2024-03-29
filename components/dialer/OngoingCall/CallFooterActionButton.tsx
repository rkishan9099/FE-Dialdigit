'use client'
import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { OngoingSessionState } from "@/lib/Sip/sip-type";
import { AppDispatch, RootState } from "@/store";
import {
  Button,
  Card,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CallTransferButton from "./CallTransferButton";
import { updateSipState } from "@/store/dialer/sip";

const ActionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "black" : "white",
  marginTop: "7px",
  fontSize: "12px",
}));

const CallFooterActionButton = () => {
  const theme = useTheme();
  const { getActiveSession, sessionCount } = useSipSessionManager();
  const { sessionState, isAttendedTransfer ,isMergeCall} = useSelector(
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
      sx={{
        background: theme.palette.customColors.bodyBg,
        margin: "20px 0",
        padding: "24px 0",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        sx={{
          padding:
            sessionState !== OngoingSessionState.RINGING ? "0 6px" : "6px",
          borderRadius: "20px !important",
          background: theme.palette.background.paper,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
          sx={{
            color: "white",
            padding:
              sessionState !== OngoingSessionState.RINGING ? "10px" : "0px",
          }}
        >
          {!isAttendedTransfer &&
            sessionCount() > 0 &&
            sessionState &&
            ![OngoingSessionState.INIT, OngoingSessionState.RINGING].includes(
              sessionState
            ) && (
              <CustomActionButton
                sx={ButtonStyle}
                disabled={sessionCount() > 0 ? false : true}
                onClick={addCallHandler}
              >
                <IconifyIcon icon={"mingcute:user-add-fill"} width={"25px"} />
                <ActionText>Add Call</ActionText>
              </CustomActionButton>
            )}
          <CustomActionButton
            onClick={hangupHandler}
            sx={{
              background: "red",
              "&:hover": {
                background: "white",
                color: "red",
              },
            }}
            disabled={sessionCount() > 0 ? false : true}
          >
            <IconifyIcon icon={"material-symbols:call-end"} width={"40px"} />
          </CustomActionButton>
          {!isAttendedTransfer &&
            sessionCount() > 0 &&
            sessionCount() < 2 &&
            sessionState &&
            ![OngoingSessionState.INIT, OngoingSessionState.RINGING].includes(
              sessionState
            ) && <CallTransferButton />}

          {sessionCount() >= 2 &&
            sessionState &&
            ![OngoingSessionState.INIT, OngoingSessionState.RINGING].includes(
              sessionState
            ) &&
            !isAttendedTransfer && !isMergeCall && (
              <CustomActionButton
                sx={ButtonStyle}
                disabled={buttonDisabledCondition}
                onClick={mergeCallHandler}
              >
                <IconifyIcon icon={"mdi:call-merge"} width={"25px"} />
                <ActionText>Merge</ActionText>
              </CustomActionButton>
            )}
        </Stack>
      </Card>
    </Stack>
  );
};

export default CallFooterActionButton;
