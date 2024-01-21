import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import { Card, Stack, Typography, styled, useTheme } from "@mui/material";
import React from "react";

const ActionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode==='light' ? "black" :'white',
  marginTop: "7px",
  fontSize: "12px",
}));

const CallFooterActionButton = () => {
  const theme = useTheme();

  const ButtonStyle = {
     color: theme.palette.mode==='light' ? "black" :'white',
    "&:hover": {
      background: theme.palette.customColors.bodyBg,
    },
  };

  return (
    <Stack
      sx={{ background: theme.palette.customColors.bodyBg, margin: "20px 0",padding:'24px 0' }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        sx={{
          padding: "0 6px",
          borderRadius: "30px !important",
          background:theme.palette.background.paper
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
          sx={{ color: "white", padding: "10px" }}
        >
          <CustomActionButton sx={ButtonStyle} >
            <IconifyIcon icon={"mingcute:user-add-fill"} width={"25px"} />
            <ActionText>Add Call</ActionText>
          </CustomActionButton>
          <CustomActionButton
            sx={{
              background: "red",
               "&:hover": {
      background:'white',
      color:'red'
    },
            }}
          >
            <IconifyIcon icon={"material-symbols:call-end"} width={"40px"} />
          </CustomActionButton>
          <CustomActionButton sx={ButtonStyle}>
            <IconifyIcon
              icon={"fluent:call-transfer-16-filled"}
              width={"25px"}
            />
            <ActionText>Transfer</ActionText>
          </CustomActionButton>
        </Stack>
      </Card>
    </Stack>
  );
};

export default CallFooterActionButton;
