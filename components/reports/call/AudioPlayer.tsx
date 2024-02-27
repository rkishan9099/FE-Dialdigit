'use client'
import React, { useEffect } from 'react'
import { Card, IconButton, styled, useTheme } from '@mui/material'
import Draggable from 'react-draggable'
import IconifyIcon from '@/@core/components/icon'
// ** Styled Component for the wrapper of whole component
const AudioTag = styled('audio')(({ theme }) => ({
  '&::-webkit-media-controls-panel': {
    background: theme.palette.mode === 'dark' ? '#c1bee3' : ''
  }
}))
const AudioPlayer = ({
  id,
  src,
  closeHandle,
  openAudio
}: {
  id: string
  src: string
  closeHandle: any
  openAudio: boolean
}) => {
  const theme = useTheme()

  const closeHandler = () => {
    closeHandle(false)
  }

  useEffect(() => {
    const element: any = new Audio(src)
    if (openAudio) {
      element.play()
    } else {
      element.pause()
    }
  }, [openAudio, src]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Draggable>
        <Card
          sx={{
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0px 0px 24px rgba(0,0,0,0.6)',
            background: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <IconButton
            onClick={closeHandler}
            sx={{
              width: '30px',
              height: '30px',
              borderRadius: '2px',
              background: 'rgba(12, 16, 27, 0.15)',
              padding: '2px',
              margin: '5px',
              marginLeft: 'auto',
              marginBottom: '13px'
            }}
          >
            <IconifyIcon icon={"fa:close"} />
          </IconButton>

          <AudioTag src={src} controls id={id} />
        </Card>
      </Draggable>
    </>
  )
}

export default AudioPlayer
