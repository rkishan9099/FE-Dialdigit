import IconifyIcon from '@/@core/components/icon';
import { convertIconSetInfo } from '@iconify/utils';
import { Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'

const SelectedNumber = ({number}:{number:any}) => {
  console.debug('seeee',number)
  return (
    <Table>
        <TableRow key={number?.phoneNumber} sx={{
              border: "none",
              "& td": {
                border: "none",
              },
            }}>
                  <TableCell>
                    <Stack
                      direction={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      spacing={1}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                        {number?.friendlyName}
                      </Typography>
                      <Typography>
                        {number?.locality && `${number?.locality},`}{" "}
                        {number?.region} {number?.isoCountry}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>Local</TableCell>
                  <TableCell align="center">
                    {number?.capabilities.voice ? (
                      <IconifyIcon icon={"fluent:call-28-regular"} />
                    ) : (
                      <IconifyIcon icon={"raphael:no"} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {number?.capabilities.SMS ? (
                      <IconifyIcon icon={"fa-solid:sms"} />
                    ) : (
                      <IconifyIcon icon={"raphael:no"} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {number?.capabilities.MMS ? (
                      <IconifyIcon icon={"material-symbols:mms"} />
                    ) : (
                      <IconifyIcon icon={"raphael:no"} />
                    )}
                  </TableCell>

                  <TableCell
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    {number?.addressRequirements}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    $1.00
                  </TableCell>
                </TableRow>
    </Table>
  )
}

export default SelectedNumber