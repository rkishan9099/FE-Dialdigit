import { auth } from '@/auth';
import React from 'react'
const AnalyticPage = () => {
  const session:any = auth();
  console.debug('sessio',session?.user)
  return (
    <div>AnalyticPage {session?.user?.name}</div>
  )
}

export default AnalyticPage