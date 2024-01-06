import { currentUser } from '@/lib/auth';
import React from 'react'
const AnalyticPage =  async () => {
  const user = await currentUser();
  return (
    <div>AnalyticPage {user?.name}</div>
  )
}

export default AnalyticPage