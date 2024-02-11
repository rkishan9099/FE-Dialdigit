"use client";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { AppDispatch, RootState } from "@/store";
import { updateSipState } from "@/store/dialer/sip";
import {
  Card,
  IconButton,
  IconButtonProps,
  Stack,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomCallButton } from "@/@core/styles/mui/button";
import IconifyIcon from "@/@core/components/icon";
import Draggable from "react-draggable";
import DialPadInput from "../../Dialpad/DialPadInput";
import DialPadButtonList from "../../Dialpad/DialPadButtonList";

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

const DtmfTransferDialpad = () => {
  const theme = useTheme();
  const [number, setNumber] = useState<string>("");
  const { dtmf, blindTransfer, attendedTransfer, holdAllCall, call } =
    useSipClient();
  const { sessionCount } = useSipSessionManager();
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
  const handleCloseHandler = () => {
    dispatch(updateSipState({ key: "toggleDTMF", value: false }));
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: false }));
    dispatch(updateSipState({ key: "isBlindTransfer", value: false }));
    if (sessionCount() < 2) {
      dispatch(updateSipState({ key: "isAttendedTransfer", value: false }));
      dispatch(updateSipState({ key: "isAddCall", value: false }));
    }
  };

  const blindTransferHandle = () => {
    if (number != "") {
      blindTransfer(number);
      dispatch(updateSipState({ key: "toggleDrawerSheet", value: false }));
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
      dispatch(updateSipState({ key: "isMergeCall", value: false }));
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
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        transition: "all 1s",
        maxWidth: "300px",
      }}
    >
      <Stack
        sx={{ marginTop: "5px", padding: "12px 0", height: "100%" }}
        justifyContent={"center"}
      >
        <CustomCloseButton type="button" onClick={handleCloseHandler}>
          <IconifyIcon icon={"tabler:x"} width={"30"} />
        </CustomCloseButton>
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

export default DtmfTransferDialpad;
