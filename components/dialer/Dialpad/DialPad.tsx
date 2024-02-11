import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import DialPadButtonList from "./DialPadButtonList";
import IconifyIcon from "@/@core/components/icon";
import DialPadInput from "./DialPadInput";

type PropsType ={
  setNumber:any
  number:string,
  children?:ReactNode
}

const DialPad = ({ setNumber, number ,children}:PropsType) => {
  const typeNumber = (num: any) => {
    setNumber((prev:string)=>prev.concat(num));
  };

  return (
    <Stack>
      <Card>
          <DialPadInput number={number} setNum={setNumber}/>
          <Divider />
        <CardContent>
          <DialPadButtonList typeNumber={typeNumber} />
          {children &&  <Stack justifyContent={'center'} alignItems='center' sx={{marginTop:'20px'}}>{children}</Stack>}
        </CardContent>
      </Card>
    </Stack>
  )
};

export default DialPad;
