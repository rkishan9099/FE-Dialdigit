"use client";
import IconifyIcon from "@/@core/components/icon";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getAvailableNumber } from "@/store/dialer/number/number";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '30rem'
})

type PropsType = {
  setSelectedNumber: (number: any) => void;
  selectedNumber: any;
};
const NumberSelection = (props: PropsType) => {
  const { selectedNumber, setSelectedNumber } = props;
  const dispatch = useAppDispatch();
  const { avilableNumbers } = useAppSelector((state) => state.number);

  useEffect(() => {
    dispatch(getAvailableNumber({ type: "local", countryCode: "US" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              border: "none",
              "& th": {
                border: "none",
              },
            }}
          >
            <TableCell align="center">Number</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell
              sx={{
                borderBottom: "1px solid rgba(47, 43, 61, 0.16) !important",
                textAlign: "center",
              }}
              colSpan={3}
            >
              Capabilities
            </TableCell>
            <TableCell align="center">Address Requirement</TableCell>
            <TableCell align="center">Monthly fee</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Voice</TableCell>
            <TableCell>SMS</TableCell>
            <TableCell>MMS</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avilableNumbers &&
            avilableNumbers?.length &&
            avilableNumbers.map((number: any) => {
              return (
                <TableRow key={number.phoneNumber}>
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
                    {number.capabilities.voice ? (
                      <IconifyIcon icon={"fluent:call-28-regular"} />
                    ) : (
                      <IconifyIcon icon={"raphael:no"} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {number.capabilities.SMS ? (
                      <IconifyIcon icon={"fa-solid:sms"} />
                    ) : (
                      <IconifyIcon icon={"raphael:no"} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {number.capabilities.MMS ? (
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

                  <TableCell>
                    {" "}
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedNumber(number);
                      }}
                      disabled={
                        selectedNumber &&
                        selectedNumber?.phoneNumber === number?.phoneNumber
                          ? true
                          : false
                      }
                    >
                    { selectedNumber?.phoneNumber === number?.phoneNumber
                          ? "Selected"
                          : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NumberSelection;
