'use client'
import { useAuth } from '@/hooks/useAuth'
import { SipUA } from '@/lib/Sip'
import { Button } from '@mui/material'
import React from 'react'

const DashboardPage = () => {
const  {user}=useAuth()
const connectHandler = ()=>{
  new SipUA()
}
  return (
    <>
    <div>DashboardPage{user?.name}</div>
    <Button onClick={connectHandler}>Connect</Button>
    </>
  )
}

export default DashboardPage