import { ProfileData } from '@/@fake-db/pages/profile'
import { UserProfileActiveTab } from '@/@fake-db/types'
import UserProfile from '@/views/pages/user-profile/UserProfile'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React from 'react'

const UserProfileTabs = async ({params:{tab}}:{params:{tab:string}}) => {
    console.log('tab',tab)
if(!["profile"].includes(tab)) redirect('/')
const res:any= ProfileData['profile']
  return (<UserProfile tab={tab} data={res} />
  )
}

export default UserProfileTabs