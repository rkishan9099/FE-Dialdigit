import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import IconifyIcon from "@/@core/components/icon";
import { ProfilePicture } from "@/@core/styles/mui/customImage";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { Icon } from "@iconify/react";
import { SipModel, SipSession } from "@/lib/Sip";

const ConferenceCallList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { sessionCount, getAllSessions, getSessionState } =
    useSipSessionManager();
  const [actionSessionId, setActionSessionId] = useState("");
  const theme = useTheme();
  const allSessions = getAllSessions();
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    sessionId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setActionSessionId(sessionId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActionSessionId("");
  };
  const hangupHandler = () => {
    if (actionSessionId) {
      const sessionState = getSessionState(actionSessionId);
      sessionState.sipSession?.terminate(408, "Call Hangup");
    }
  };
  return (
    <React.Fragment>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{
          background: "transparent",
        }}
      >
        {allSessions &&
          allSessions.length > 0 &&
          allSessions.map((session: SipModel.SipSessionState) => {
            return (
              <Tooltip title={session?.sipSession?.user} key={session.id}>
                <Box sx={{ position: "relative" }}>
                  <ProfilePicture
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      handleClick(event, session.id)
                    }
                    sx={{ width: "60px", height: "60px", cursor: "pointer" }}
                    src={"/images/avatars/1.png"}
                    alt="profile-picture"
                  />
                  <Stack
                    sx={{
                      position: "absolute",
                      width: "25px",
                      height: "25px",
                      background: theme.palette.background.paper,
                      borderRadius: "50%",
                      top: "-5px",
                      right: "-5px",
                      border: "3px solid #00000091",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      icon={
                        session?.sipSession?.isHolded()
                          ? "ph:pause-fill"
                          : "iconoir:microphone-speaking-solid"
                      }
                    />
                  </Stack>
                </Box>
              </Tooltip>
            );
          })}
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: "0px" }}>
          <Button
            onClick={hangupHandler}
            sx={{
              background: "red",
              color: "white",
              "&:hover": {
                background: "white",
                color: "red",
              },
            }}
          >
            <IconifyIcon icon={"material-symbols:call-end"} />
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ConferenceCallList;
