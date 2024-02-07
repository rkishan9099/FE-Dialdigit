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
  const { sessionState, isAttendedTransfer } = useSelector(
    (state: RootState) => state.sip
  );
  const { terminate, conference } = useSipClient();
  const activeSession = getActiveSession();
  const dispatch = useDispatch<AppDispatch>();

  const ButtonStyle = {
    color: theme.palette.mode === "light" ? "black" : "white",
    "&:hover": {
      background: theme.palette.customColors.bodyBg,
    },
    "&:disabled": {
      color: "white",
      background: "rgba(0,0,0,0.3)",
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
      conference();
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
          {sessionState !== OngoingSessionState.RINGING &&
            !isAttendedTransfer &&
            sessionCount() > 0 && (
              <CustomActionButton
                sx={ButtonStyle}
                disabled={
                  sessionState === OngoingSessionState.ANSWERED ? false : true
                }
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
          >
            <IconifyIcon icon={"material-symbols:call-end"} width={"40px"} />
          </CustomActionButton>
          {sessionState !== OngoingSessionState.RINGING &&
            !isAttendedTransfer &&
            sessionCount() > 0 && <CallTransferButton />}

          {sessionCount() > 2 && (
            <CustomActionButton
              sx={ButtonStyle}
              disabled={
                sessionState === OngoingSessionState.ANSWERED ? false : true
              }
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
