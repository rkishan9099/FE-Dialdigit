import { Button, useTheme } from '@mui/material'
import React from 'react'

const DialPadButton = ({ button, typeNumber }: { button: any; typeNumber: any }) => {
  const theme = useTheme()
  const clickHandler = () => {
    typeNumber(button)
  }

  return (
    <Button
      onClick={clickHandler}
      sx={{
        height: '60px',
        width: '60px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: theme.palette.background.default,
        color: theme.palette.mode==='dark' ? theme.palette.primary.contrastText :theme.palette.primary.main,
        boxShadow: theme.shadows[5]
      }}
    >
      <span style={{ fontSize: '21px' }}>{button}</span>
      {/* <span style={{ fontSize: '15px', marginTop: '-8px' }}>{button?.button_label}</span> */}
    </Button>
  )
}

export default DialPadButton
