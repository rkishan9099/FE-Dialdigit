import { Stack } from "@mui/material";
import React from "react";
import DialPadButton from "./DialPadButton";

const buttons = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

const DialPadButtonList = ({ typeNumber }: { typeNumber: any }) => {
  return (
    <>
      <Stack direction={"column"} spacing={5} >
        {buttons.map((btnlist: string[], index: number) => (
          <Stack
            key={index}
            sx={{
              flexWrap: "wrap",
              borderRadius: "14px",
              gap:'12px'
            }}
            direction="row"
            spacing={5}
            justifyContent={'center'} 
            alignItems={'center'}
          >
            {btnlist.map((btn: string, btnIndex: number) => (
              <DialPadButton
                key={btnIndex}
                button={btn}
                typeNumber={typeNumber}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default DialPadButtonList;
