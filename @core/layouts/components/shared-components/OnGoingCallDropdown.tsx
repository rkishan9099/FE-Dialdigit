// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { Settings } from '@/@core/context/settingsContext'
import DialPad from '@/components/dialer/Dialpad/DialPad'
import IconifyIcon from '@/@core/components/icon'
import useSipClient from '@/hooks/dialer/useSipClient'
import toast from 'react-hot-toast'
import OngoingCall from '@/components/dialer/OngoingCall/OngoingCall'

export type ShortcutsType = {
  url: string
  icon: string
  title: string
  subtitle: string
}

interface Props {
  settings: Settings
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 350,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '30rem'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const OnGoingCallDropdown = (props: Props) => {
  // ** Props
  const {  settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [number, setNumber] = useState<string>("");
    const {  call } = useSipClient();

  // ** Hook
  const mediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  // ** Vars
  const { direction } = settings



  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }





  const callHandler = () => {
    if(number){
    call(number);

    }else{
      toast.error('Enter Number')
    }
  };



  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Icon fontSize='1.625rem' icon='material-symbols:call-log' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}

      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            m: 0,
            cursor: 'default',
            userSelect: 'auto',
            p: theme => theme.spacing(4, 6),
            backgroundColor: 'transparent !important',
            padding:'0px'
          }}
        >
          <OngoingCall />
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default OnGoingCallDropdown
