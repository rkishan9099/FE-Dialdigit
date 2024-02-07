import IconifyIcon from "@/@core/components/icon";
import { IconButton, Stack, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import CallActionButton from "./CallActionButton";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { OngoingSessionState } from "@/lib/Sip/sip-type";
import { useCallDurationTimer } from "@/hooks/dialer/useCallDurationTimer";
import ConferenceCallList from "./ConferenceCallList";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "20px",
  border: `2px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const CallDetails = () => {
  const theme = useTheme();
  const { getDialNumber, sessionCount } = useSipSessionManager();
  const { sessionState ,isAttendedTransfer} = useSelector((state: RootState) => state.sip);
  const dialNumber = getDialNumber();
  const { callTimer } = useCallDurationTimer();
  return (
    <>
      <Stack
        sx={{
          background: "rgb(103,120,240)",
          borderRadius: "10px",
          minHeight: "250px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: "5px 20px",
          }}
        >
          <IconButton
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            <IconifyIcon icon={"lucide:fullscreen"} />
          </IconButton>
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            {sessionState === OngoingSessionState.RINGING
              ? "Connecting"
              : callTimer}
          </Typography>
        </Stack>

        <Stack justifyContent={"center"} alignItems={"center"}>
          {sessionCount() >1 ? (
            <ConferenceCallList />
          ) : (
            <ProfilePicture
              src={"/images/avatars/1.png"}
              alt="profile-picture"
            />
          )}

          {/* <Typography
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Kishan Ramani
          </Typography> */}
          <Typography
            sx={{
              marginTop: "5px",
              fontWeight: "bold",
              color: theme.palette.primary.contrastText,
            }}
          >
            {dialNumber}
          </Typography>
        </Stack>
        <CallActionButton />
        {/* {sessionState !== OngoingSessionState.RINGING && sessionCount() > 0 && (
        )} */}
      </Stack>
    </>
  );
};

export default CallDetails;
