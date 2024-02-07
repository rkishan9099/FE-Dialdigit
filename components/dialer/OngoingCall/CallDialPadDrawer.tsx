import {
  Card,
  IconButton,
  IconButtonProps,
  Stack,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import IconifyIcon from "@/@core/components/icon";
import DialPadButtonList from "../Dialpad/DialPadButtonList";
import DialPadInput from "../Dialpad/DialPadInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeToggleDrawerSheet, updateSipState } from "@/store/dialer/sip";
import { CustomCallButton } from "@/@core/styles/mui/button";
import useSipClient from "@/hooks/dialer/useSipClient";

const Puller = styled("div")(({ theme }) => ({
  width: 60,
  height: 10,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 5,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: "2px",
  left: "2px",
  width: "35px",
  height: "35px",
  color: "grey.500",
  position: "absolute",
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: "transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out",
  zIndex: 999,
}));

const CallDialPadDrawer = () => {
  const theme = useTheme();
  const [number, setNumber] = useState<string>("");
  const { dtmf, blindTransfer, attendedTransfer, holdAllCall, call } =
    useSipClient();
  const {
    toggleDrawerSheet,
    callTransfer,
    isAttendedTransfer,
    isAddCall,
    isBlindTransfer,
    toggleDTMF,
  } = useSelector((state: RootState) => state.sip);
  const dispatch = useDispatch<AppDispatch>();
  const typeNumber = (num: any) => {
    if (toggleDTMF) {
      dtmf(num);
    }
    setNumber(number.concat(num));
  };
  const handleCallHandler = () => {
    dispatch(updateSipState({ key: "toggleDTMF", value: false }));
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: false }));
  };

  const blindTransferHandle = () => {
    if (number != "") {
      blindTransfer(number);
    }
  };

  const attendedTransferHandle = () => {
    if (number != "") {
      holdAllCall();
      attendedTransfer(number);
      dispatch(updateSipState({ key: "toggleDrawerSheet", value: false }));
    }
  };

  const addCallHandler = () => {
    if (number != "") {
      holdAllCall();
      call(number);
      dispatch(updateSipState({ key: "toggleDrawerSheet", value: false }));
    }
  };
  useEffect(() => {
    if (!toggleDrawerSheet) {
      setNumber("");
    }
  }, [toggleDrawerSheet]);

  return (
    <Card
      sx={{
        height: toggleDrawerSheet ? "100%" : "6%",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        transition: "all 1s",
      }}
    >
      <Puller />
      <Stack sx={{ marginTop: "5px", padding: "12px 0" }}>
        {toggleDrawerSheet && (
          <CustomCloseButton type="button" onClick={handleCallHandler}>
            <IconifyIcon icon={"tabler:x"} width={"30"} />
          </CustomCloseButton>
        )}
        <Stack sx={{ paddingLeft: "20px" }}>
          <DialPadInput number={number} setNum={setNumber} />
        </Stack>
        <DialPadButtonList typeNumber={typeNumber} />
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
          sx={{
            gap: "12px",
            marginTop: "15px",
            color: "white",
          }}
        >
          {/* {sessionState !== OngoingSessionState.RINGING &&
            sessionCount() > 0 && ( */}
          {isAddCall && (
            <Tooltip title={"Add Call"}>
              <CustomCallButton size="small" onClick={addCallHandler}>
                <IconifyIcon icon={"mingcute:user-add-fill"} />
              </CustomCallButton>
            </Tooltip>
          )}

          {/* )} */}
          {callTransfer && isAttendedTransfer && (
            <Tooltip title={"Attended Transfer"}>
              <CustomCallButton onClick={attendedTransferHandle}>
                <IconifyIcon
                  icon={"fluent-mdl2:transfer-call"}
                  width={"25px"}
                />
              </CustomCallButton>
            </Tooltip>
          )}

          {/* {sessionState !== OngoingSessionState.RINGING &&
            sessionCount() > 0 && ( */}
          {callTransfer && isBlindTransfer && (
            <Tooltip title={"Blind Transfer"}>
              <CustomCallButton onClick={blindTransferHandle}>
                <IconifyIcon icon={"wpf:call-transfer"} width={"25px"} />
              </CustomCallButton>
            </Tooltip>
          )}

          {/* )} */}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CallDialPadDrawer;
