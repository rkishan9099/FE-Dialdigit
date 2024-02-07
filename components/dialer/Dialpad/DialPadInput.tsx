import {
  IconButton,
  InputBase,
  Paper
} from '@mui/material';
import React from 'react';
import IconifyIcon from '@/@core/components/icon';

const DialPadInput = ({ number, setNum }: { number: string; setNum: any }) => {
  const changeHandler = (e: any) => {
    setNum(e.target.value);
  };
  const clearNumber = () => {
    setNum((prv: any) => prv.substring(0, prv.length - 1));
  };

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        background: 'transparent !important',
        boxShadow:'none',
        padding:'8px',
       
      }}
    >
      <InputBase
        sx={{ fontSize: '23px',  textAlign: 'center', paddingLeft: '15px', width: '100%',boxShadow:'none' }}
        defaultValue={number}
        onChange={changeHandler}
      />
      <IconButton type="button" sx={{ p: '10px' }} onClick={clearNumber}>
       <IconifyIcon icon={"iconamoon:backspace-fill"} />
      </IconButton>
     
    </Paper>
  );
};

export default DialPadInput;
