'use client'

import IconifyIcon from '@/@core/components/icon'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import PurschaseNumberStep from './purcasenumber/PurschaseNumberStep'

const PurchaseNumber = () => {
  return (
    <Stack direction={'column'} spacing={3}>
    <Card>
      <CardContent>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <Button variant="outlined" type="submit" size="small">
            <IconifyIcon icon={"fluent-mdl2:chrome-back"} />
          </Button>
          <Typography gutterBottom variant="h4" component="h2">
            Purchase Number
          </Typography>
        </Stack>
      </CardContent>
    </Card>
   <PurschaseNumberStep />
  </Stack>
  )
}

export default PurchaseNumber
