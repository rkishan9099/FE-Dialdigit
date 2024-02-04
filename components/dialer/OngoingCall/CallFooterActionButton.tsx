import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { OngoingSessionState } from "@/lib/Sip/sip-type";
import { RootState } from "@/store";
import { Card, Stack, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ActionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "black" : "white",
  marginTop: "7px",
  fontSize: "12px",
}));

const CallFooterActionButton = () => {
  const theme = useTheme();
  const { getActiveSession, sessionCount } = useSipSessionManager();
  const { sessionState } = useSelector((state: RootState) => state.sip);
  const { terminate } = useSipClient();

  const activeSession = getActiveSession();

  const ButtonStyle = {
    color: theme.palette.mode === "light" ? "black" : "white",
    "&:hover": {
      background: theme.palette.customColors.bodyBg,
    },
    "&:disabled": {
      color: "lightgray",
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
            sessionState !== OngoingSessionState.RINGING ? "0 6px" : "0px",
          borderRadius: "30px !important",
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
            sessionCount() > 0 && (
              <CustomActionButton
                sx={ButtonStyle}
                disabled={
                  sessionState === OngoingSessionState.ANSWERED ? false : true
                }
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
            sessionCount() > 0 && (
              <CustomActionButton
                sx={ButtonStyle}
                disabled={
                  sessionState === OngoingSessionState.ANSWERED ? false : true
                }
              >
                <IconifyIcon
                  icon={"fluent:call-transfer-16-filled"}
                  width={"25px"}
                />
                <ActionText>Transfer</ActionText>
              </CustomActionButton>
            )}
        </Stack>
      </Card>
    </Stack>
  );
};

export default CallFooterActionButton;
