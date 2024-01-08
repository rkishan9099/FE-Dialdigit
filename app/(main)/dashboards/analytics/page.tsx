"use client"
import FormProvider from '@/hooks/hook-form/FormProvider';
import { SipUA } from '@/lib/Sip';
import { currentUser } from '@/lib/auth';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import React, { useMemo } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { RHFTextField } from '@/hooks/hook-form';
// eslint-disable-next-line @next/next/no-async-client-component

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const microdata=[
  {
    id:1,
    label:"ph",
    result:"",
    status:"",
    range:"30-12"
  },
  {
    id:1,
    label:"ph",
    result:"",
    status:"",
    range:"30-12"
  },
  {
    id:1,
    label:"ph",
    result:"",
    status:"",
    range:"30-12"
  }
]

const AnalyticPage =   () => {
  const schema = yup.object().shape({
    micro:yup.array()
  })
  const defaultValues = useMemo(
    () => ({
      micro:microdata
    }),
    []
  )
const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const {
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState: { isSubmitting }
  } = methods
const  values =  watch();
  const ConnectUa = async ()=>{
    new SipUA()
  }

const onSubmit =(data:any)=>{
console.debug('data',data)
window.print();
}
  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Label</StyledTableCell>
            <StyledTableCell align="right">Result</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Range</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow >
 <StyledTableCell component="th" scope="row" colSpan={5}>
  Micro
 </StyledTableCell>
          </StyledTableRow>
          {
values?.micro && values?.micro.map((row:any,index)=>{
 return <StyledTableRow key={row.id}>
   <StyledTableCell component="th" scope="row">
              {row.id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
              {row.label}
              </StyledTableCell>
              <StyledTableCell align="right">
                <RHFTextField
          name={`micro.${index}.result`}
         sx={{border:"none"}}
          size='small'
        />
              </StyledTableCell>
              <StyledTableCell align="right">
                 <RHFTextField
          name={`micro.${index}.status`}
          label={"result"}
          size='small'
        />
              </StyledTableCell>
              <StyledTableCell align="right">{row.range}</StyledTableCell>
             
            </StyledTableRow>
})
          }
         
        </TableBody>
      </Table>
    </TableContainer>
    <Button type='submit'>Submit</Button>
    </FormProvider>
    </>
  )
}

export default AnalyticPage