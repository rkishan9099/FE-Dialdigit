import IconifyIcon from '@/@core/components/icon'
import { CustomActionButton } from '@/@core/styles/mui/button'
import { ProfilePicture } from '@/@core/styles/mui/customImage'
import useSipSessionManager from '@/hooks/dialer/useSipSessionManager'
import { Button, Card, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

const ConnectingCallDetail = () => {
    const theme =useTheme()
    const {getDialNumber}=useSipSessionManager();
    const dialNumber =getDialNumber();
  return (
      <Stack
            sx={{
               background: "rgb(103,120,240)",
              borderRadius: "10px",
              width:'100%'
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
                 color: theme.palette.primary.contrastText,
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
                <Button
                  sx={{
                    background: "#44b700",
                    color: "white"
                  }}
                >
                  <IconifyIcon icon={"material-symbols:call-end"}/>
                </Button>

             
              </Stack>
            </Stack>
          </Stack>
  )
}

export default ConnectingCallDetail