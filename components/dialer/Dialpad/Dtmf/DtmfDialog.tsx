import { Box, CardContent, Divider, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { useDispatch } from 'react-redux'
import DialPadInput from '../DialPadInput'
import DialPadButtonList from '../DialPadButtonList'

const DtmfDialog = () => {
  const theme = useTheme();
  const [number, setNumber] = useState('')

  const mediaQuery = useMediaQuery('sm')
  const typeNumber = (num: string): void => {
    setNumber((prev: string) => prev.concat(num))
  }

  const closeDtmf = () => {
    // dispatch(updateSipState({ key: 'showDtmf', value: false }))
  }

  return (
    <Draggable disabled={mediaQuery}>
      <Box sx={{ minWidth: 300, position: 'absolute', bottom: '200px', right: '50px', zIndex: '9999' }}>
        <CardContent
          sx={{
            display: 'inline-block',
            background: theme.palette.background.paper,
            borderRadius: '20px',
            padding: 0,
            paddingBottom: '0px !important',
    
            boxShadow: '0px 10px 10px rgba(0,0,0,0.4)'
          }}
        >
          <DialPadInput number={number} setNum={setNumber}/>
          <Divider />
        <CardContent>
          <DialPadButtonList typeNumber={typeNumber} />
        </CardContent>
        </CardContent>
      </Box>
    </Draggable>
  )
}

export default DtmfDialog
