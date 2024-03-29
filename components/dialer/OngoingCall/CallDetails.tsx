"use client";
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
import ConferenceCallAction from "./ConferenceCallAction";
import { usePathname, useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";

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
  const { getDialNumber, sessionCount, lastDialNumber } =
    useSipSessionManager();
  const router = useRouter();
  const pathName = usePathname();
  const { sessionState, isAttendedTransfer, isMergeCall } = useSelector(
    (state: RootState) => state.sip
  );
  const dialNumber = getDialNumber();

  const { callTimer } = useCallDurationTimer();
  return (
    <>
      <Stack
        sx={{
          background: "rgb(103,120,240)",
          borderRadius: "10px",
          minHeight: "280px",
        }}
        // justifyContent={"center"}
        // alignItems={'center'}
      >
  {
    sessionCount()>0 && 
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
              onClick={() =>
                pathName === PATH_DASHBOARD.call.ongoingCall
                  ? router.back()
                  : router.push(PATH_DASHBOARD.call.ongoingCall)
              }
            >
              <IconifyIcon
                icon={
                  pathName === PATH_DASHBOARD.call.ongoingCall
                    ? "flowbite:minimize-solid"
                    : "lucide:fullscreen"
                }
              />
            </IconButton>
        
          
              {sessionState &&
              [OngoingSessionState.INIT, OngoingSessionState.RINGING].includes(
                sessionState
              ) ? (
                <Typography
                  sx={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "bold",
                    clipPath: " inset(0 1ch 0 0)",
                    animation: "l 1s steps(4) infinite",
                    " @keyframes l": {
                      to: {
                        clipPath: "inset(0 -1ch 0 0)",
                      },
                    },
                  }}
                >
                  Connecting...
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {callTimer}
                </Typography>
              )}
          
        
        </Stack> }
        <Stack justifyContent={"center"} alignItems={'center'} sx={{flex:2}}>
          <Stack alignItems={"center"}  sx={{height:'100%'}}>
            {sessionCount() > 1 &&
            sessionState &&
            ![OngoingSessionState.INIT, OngoingSessionState.RINGING].includes(
              sessionState
            ) ? (
              <ConferenceCallList />
            ) : (
              <ProfilePicture
                src={"/images/avatars/1.png"}
                alt="profile-picture"
              />
            )}
            <Typography
              sx={{
                marginTop: "5px",
                fontWeight: "bold",
                color: theme.palette.primary.contrastText,
              }}
            >
              {sessionState &&
              [OngoingSessionState.INIT, OngoingSessionState.RINGING].includes(
                sessionState
              )
                ? lastDialNumber()
                : dialNumber}
            </Typography>
          </Stack>
          {/* <CallActionButton /> */}
          {pathName !== PATH_DASHBOARD.call.ongoingCall &&
            sessionState &&
            ![OngoingSessionState.RINGING, OngoingSessionState.INIT].includes(
              sessionState
            ) &&
            sessionCount() > 0 && (
              <>
                {isMergeCall ? <ConferenceCallAction /> : <CallActionButton />}
              </>
            )}
        </Stack>
        
      </Stack>
    </>
  );
};

export default CallDetails;
