import { Stack } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import DtmfTransferDialpad from "./fullscreen/DtmfTtansferDialpad";

const DraggableDialpad = () => {
  return (
    <Draggable>
      <Stack>
        <DtmfTransferDialpad />
      </Stack>
    </Draggable>
  );
};

export default DraggableDialpad;
