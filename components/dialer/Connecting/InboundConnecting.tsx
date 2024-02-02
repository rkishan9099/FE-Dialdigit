import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import { ProfilePicture } from "@/@core/styles/mui/customImage";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { AppDispatch } from "@/store";
import { updateSipState } from "@/store/dialer/sip";
import {
  Card,
  IconButton,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

const CustomPortals = styled(Card)(({ theme }) => ({
  borderRadius: "15px",
  boxShadow: theme.shadows[8],
  position: "absolute",
  top: "89px",
  right: theme.breakpoints.values.md ? "19px" : "0",
  zIndex: 9999,
  maxWidth: "320px",
  width: "100%",
}));

const InboundConnecting = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { getDialNumber } = useSipSessionManager();
  const { answer, terminate } = useSipClient();
  const dialNumber = getDialNumber();

  const handleAnswer = () => {
    answer();
    dispatch(updateSipState({ key: "ConnectingCall", value: false }));
  };
  const handleDecline = () => {
    terminate(486, "Busy here", undefined);
    dispatch(updateSipState({ key: "ConnectingCall", value: false }));
  };
  return (
    <>
      {createPortal(
        <CustomPortals
          sx={{ borderRadius: "15px", boxShadow: theme.shadows[8] }}
        >
          <Stack
            sx={{
              background: theme.palette.background.paper,
              borderRadius: "10px",
            }}
          >
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ margin: "38px 0 10px 0" }}
            >
              <ProfilePicture
                src={"/images/avatars/1.png"}
                alt="profile-picture"
              />
              {/* <Typography
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Kishan Ramani
          </Typography> */}
              <Typography
                sx={{
                  marginTop: "15px",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  fontSize: "20px",
                }}
              >
                {dialNumber}
              </Typography>
            </Stack>
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
                spacing={5}
                sx={{ color: "white", padding: "10px" }}
              >
                <CustomActionButton
                  onClick={handleAnswer}
                  sx={{
                    background: "#44b700",
                    color: "white",
                    "&:hover": {
                      background: "white",
                      color: "#44b700",
                      border: "2px solid #44b700",
                    },
                  }}
                >
                  <IconifyIcon icon={"material-symbols:call"} width={"40px"} />
                </CustomActionButton>

                <CustomActionButton
                  onClick={handleDecline}
                  sx={{
                    background: "red",
                    "&:hover": {
                      background: "white",
                      color: "red",
                      border: "2px solid red",
                    },
                  }}
                >
                  <IconifyIcon
                    icon={"material-symbols:call-end"}
                    width={"40px"}
                  />
                </CustomActionButton>
              </Stack>
            </Stack>
          </Stack>
        </CustomPortals>,
        document.body
      )}
    </>
  );
};

export default InboundConnecting;
