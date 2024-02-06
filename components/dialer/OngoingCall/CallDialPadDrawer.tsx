import {
  Button,
  Card,
  ClickAwayListener,
  Icon,
  IconButton,
  IconButtonProps,
  InputBase,
  Paper,
  Stack,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import DialPad from "../Dialpad/DialPad";
import IconifyIcon from "@/@core/components/icon";
import DialPadButtonList from "../Dialpad/DialPadButtonList";
import DialPadInput from "../Dialpad/DialPadInput";
import { Fascinate } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateSipState } from "@/store/dialer/sip";
import { CustomActionButton, CustomCallButton } from "@/@core/styles/mui/button";

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
}));


const CallDialPadDrawer = () => {
  const theme = useTheme();
  const [number, setNumber] = useState<string>("");
  const { toggleDrawerSheet } = useSelector((state: RootState) => state.sip);
  const dispatch = useDispatch<AppDispatch>();
  const typeNumber = (num: any) => {
    setNumber(number.concat(num));
  };

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
          <CustomCloseButton
            type="button"
            onClick={() =>
              dispatch(
                updateSipState({ key: "toggleDrawerSheet", value: false })
              )
            }
          >
            <IconifyIcon icon={"tabler:x"} width={"30"} />
          </CustomCloseButton>
        )}
        <Stack sx={{ padding: "0 20px" }}>
          <DialPadInput number={number} setNum={setNumber} />
        </Stack>
        <DialPadButtonList typeNumber={typeNumber} />
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
          sx={{
             gap:'12px',
            marginTop:'15px',
            color: "white",
          }}
        >
          {/* {sessionState !== OngoingSessionState.RINGING &&
            sessionCount() > 0 && ( */}
          <CustomCallButton size="small" >
            <IconifyIcon icon={"mingcute:user-add-fill"} />
          </CustomCallButton>
          {/* )} */}
          <CustomCallButton>
            <IconifyIcon icon={"material-symbols:call-end"} width={"25px"} />
          </CustomCallButton>
          {/* {sessionState !== OngoingSessionState.RINGING &&
            sessionCount() > 0 && ( */}
          <CustomCallButton>
            <IconifyIcon
              icon={"fluent:call-transfer-16-filled"}
              width={"25px"}
            />
          </CustomCallButton>
          {/* )} */}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CallDialPadDrawer;
