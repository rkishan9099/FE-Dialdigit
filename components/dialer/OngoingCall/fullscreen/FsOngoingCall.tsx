"use client";
import React from "react";
import OngoingCall from "../OngoingCall";
import { Card, Stack, Theme, useMediaQuery, useTheme } from "@mui/material";
import CallDetails from "../CallDetails";
import CallFooterActionButton from "../CallFooterActionButton";
import FsCallActionButton from "./FsCallActionButton";
import { usePathname } from "next/navigation";
import DraggableDialpad from "../DraggableDialpad";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const FsOngoingCall = () => {
  const theme = useTheme();
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { toggleDrawerSheet } = useSelector((state: RootState) => state.sip);
  return (
    <>
      {!hidden ? (
        <>
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CallDetails />
              <FsCallActionButton />
            </Card>
          </Stack>
          {toggleDrawerSheet && <DraggableDialpad />}
        </>
      ) : (
        <OngoingCall />
      )}
    </>
  );
};

export default FsOngoingCall;
