import { RootState, store } from '@/store'
import React, { useEffect } from 'react'
import DialpadDropdown from './DialpadDropdown';
import OnGoingCallDropdown from './OnGoingCallDropdown';
import { Settings } from '@/@core/context/settingsContext';
import { useSelector } from 'react-redux';
import useSipClient from '@/hooks/dialer/useSipClient';
import useSipSessionManager from '@/hooks/dialer/useSipSessionManager';
import { CallDirection } from '@/lib/Sip/sip-type';
import InboundConnecting from '@/components/dialer/Connecting/InboundConnecting';
import ConnectingCallDropdown from './ConnectingCallDropdown';

interface Props {
  settings: Settings
}
const CallDropdown = (props: Props) => {
const {  settings } = props
const {userAgent,callDirection,ConnectingCall} = useSelector((state:RootState)=>state.sip)
const {sessionCount}=useSipSessionManager();

  return <>
  {/* {sessionCount()<=0 &&<ConnectingCallDropdown settings={settings}/>} */}
  {sessionCount()>0 ? <OnGoingCallDropdown settings={settings}/> : <DialpadDropdown settings={settings} />}
  {sessionCount()>0 && ConnectingCall && callDirection === CallDirection.Inbound && <InboundConnecting />}
   </>

}

export default CallDropdown