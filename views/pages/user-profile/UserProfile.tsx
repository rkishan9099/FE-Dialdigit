'use client'
// ** React Imports
import { useState, useEffect, ReactElement, SyntheticEvent } from 'react'

// ** Next Import

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Type Import
import {
  TeamsTabType,
  ProfileTabType,
  ProjectsTabType,
  ConnectionsTabType,
  UserProfileActiveTab
} from '@/@fake-db/types'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Demo Components
import Teams from '@/views/pages/user-profile/teams'
import Profile from '@/views/pages/user-profile/profile'
import Projects from '@/views/pages/user-profile/projects'
import Connections from '@/views/pages/user-profile/connections'
import UserProfileHeader from '@/views/pages/user-profile/UserProfileHeader'
import { useRouter } from 'next/navigation'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const UserProfile = ({ tab, data }: { tab: string; data: UserProfileActiveTab }) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
    router
      .push(`/user-profile/${value.toLowerCase()}`)
  }

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList: { [key: string]: ReactElement } = {
    profile: <Profile data={data as ProfileTabType} />,
    teams: <Teams data={data as TeamsTabType[]} />,
    projects: <Projects data={data as ProjectsTabType[]} />,
    connections: <Connections data={data as ConnectionsTabType[]} />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader/>
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  onChange={handleChange}
                  aria-label='customized tabs example'
                >
                  <Tab
                    value='profile'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='tabler:user-check' />
                        {!hideText && 'Profile'}
                      </Box>
                    }
                  />
                  <Tab
                    value='teams'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='tabler:users' />
                        {!hideText && 'Teams'}
                      </Box>
                    }
                  />
                  <Tab
                    value='projects'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='tabler:layout-grid' />
                        {!hideText && 'Projects'}
                      </Box>
                    }
                  />
                  <Tab
                    value='connections'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='tabler:link' />
                        {!hideText && 'Connections'}
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
              <Grid item xs={12}>
               
                  <TabPanel sx={{ p: 0 }} value={activeTab}>
                    {tabContentList[activeTab]}
                  </TabPanel>
              
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default UserProfile
