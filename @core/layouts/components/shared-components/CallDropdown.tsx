import { RootState, store } from '@/store'
import React, { useEffect } from 'react'
import DialpadDropdown from './DialpadDropdown';
import OnGoingCallDropdown from './OnGoingCallDropdown';
import { Settings } from '@/@core/context/settingsContext';
import { useSelector } from 'react-redux';
import useSipClient from '@/hooks/dialer/useSipClient';
import useSipSessionManager from '@/hooks/dialer/useSipSessionManager';
import InboundConnecting from '@/components/dialer/Connecting/InboundConnecting';

interface Props {
  settings: Settings
}
const CallDropdown = (props: Props) => {
const {  settings } = props
const {userAgent} = useSelector((state:RootState)=>state.sip)
const {sessionCount}=useSipSessionManager();

  return <>
  {sessionCount() > 0 ? <OnGoingCallDropdown settings={settings}/> : <DialpadDropdown settings={settings} />}
  <InboundConnecting />
  </>

}

export default CallDropdown