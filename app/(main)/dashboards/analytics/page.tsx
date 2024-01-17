'use client'
import useSipClient from '@/hooks/dialer/useSipClient'
import { useAuth } from '@/hooks/useAuth'
import useSipFunctionality from '@/hooks/useSipFunctionality'
import { SipUA } from '@/lib/Sip'
import { Button } from '@mui/material'
import React from 'react'

const DashboardPage = () => {
const  {user}=useAuth()
const {sipClient}=useSipClient();
const connectHandler = async ()=>{
sipClient && sipClient?.call('7001')
}

  return (
    <>
    <div>DashboardPage{user?.name}</div>
    <Button onClick={connectHandler}>Connect</Button>
    </>
  )
}

export default DashboardPage