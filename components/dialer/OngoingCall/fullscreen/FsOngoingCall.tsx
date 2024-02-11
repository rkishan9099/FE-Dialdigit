"use client";
import React from "react";
import OngoingCall from "../OngoingCall";
import { Card, Stack, useTheme } from "@mui/material";
import CallDetails from "../CallDetails";
import CallFooterActionButton from "../CallFooterActionButton";
import FsCallActionButton from "./FsCallActionButton";
import { usePathname } from "next/navigation";

const FsOngoingCall = () => {
  const theme = useTheme();
  const pathName = usePathname()
  console.debug('path name',pathName)
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      <Card
        sx={{
          borderRadius: "15px",
          boxShadow: theme.shadows[8],
          background: theme.palette.background.paper,
          height: "100%",
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
        }}
      >
        <CallDetails />
        <FsCallActionButton />
      </Card>
    </Stack>
  );
};

export default FsOngoingCall;
