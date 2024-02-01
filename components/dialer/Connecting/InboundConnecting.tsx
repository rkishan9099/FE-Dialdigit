import { Card, CardContent } from '@mui/material'
import React from 'react'
import { createPortal } from 'react-dom'

const InboundConnecting = () => {
  return (
    <> {createPortal(
        <Card sx={{position:"absolute",top:'89',background:'red',width:'100%'}}><CardContent>vvvvv</CardContent></Card>,
        document.body
      )}</>
  )
}

export default InboundConnecting