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
  const clearNumber = () => {
    setNumber((prv: any) => prv.substring(0, prv.length - 1));
  };
  const changeHandler = (e: any) => {
    setNumber(e.target.value);
  };
  const typeNumber = (num: any) => {
    setNumber(number.concat(num));
  };

  return (
    <Stack sx={{width:'auto'}} justifyContent={'center'} alignItems={'center'}>
      <Card>
          <DialPadInput number={number} setNum={setNumber}/>
          <Divider />
        <CardContent>
          <DialPadButtonList typeNumber={typeNumber} />
          {children &&  <Stack justifyContent={'center'} alignItems='center' sx={{marginTop:'20px'}}>{children}</Stack>}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DialPad;
