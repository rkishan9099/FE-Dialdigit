import React, { useState } from "react";
import CallDetails from "./CallDetails";
import { Button, Card, ClickAwayListener, Stack, styled, useTheme } from "@mui/material";
import CallFooterActionButton from "./CallFooterActionButton";
import { grey } from "@mui/material/colors";
import CallDialPadDrawer from "./CallDialPadDrawer";

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const OngoingCall = () => {
  const theme = useTheme();
  const [open,setOpen]=useState(true)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true)
  };

  return (
    <>
     
   
      <Stack
        sx={{ width:'100%', borderRadius: "15px" }}
      >
        <Card sx={{ borderRadius: "15px",boxShadow:theme.shadows[8] }}>
          <CallDetails />
          <Button onClick={handleClick}>Toggle</Button>
          <Stack sx={{ background: theme.palette.customColors.bodyBg }}>
            <CallFooterActionButton />
          </Stack>
        </Card>

            <CallDialPadDrawer open={open} setOpen={setOpen}/>
      
      </Stack>
    </>
  );
};

export default OngoingCall;
