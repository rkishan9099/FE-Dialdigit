import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import { Box, Button, IconButton, Stack, Typography, styled } from "@mui/material";
import React from "react";


const ActionText = styled(Typography)(({ theme }) => ({
color: 'white',marginTop:'7px',fontSize:'12px'
}));
const CallActionButton = () => {
    return (
        <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            sx={{ margin: "20px" }}
        >
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{ color: 'white', padding: '10px' }}>
                <CustomActionButton>
                    <IconifyIcon icon={"mdi:microphone"} width={'25px'} />
                    <ActionText>Mute</ActionText>
                </CustomActionButton>
                <CustomActionButton>
                    <IconifyIcon icon={"solar:pause-bold"} width={'25px'} />
                    <ActionText>Hold</ActionText>
                </CustomActionButton>
                <CustomActionButton>
                    <IconifyIcon icon={"eva:keypad-fill"} width={'25px'} />
                    <ActionText>Keypad</ActionText>
                </CustomActionButton>
            </Stack>
        </Stack>
    );
};

export default CallActionButton;
