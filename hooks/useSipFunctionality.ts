import { SipConstants, SipUA } from '@/lib/Sip';
import { useSession } from 'next-auth/react';
import React, { useRef } from 'react'

const useSipFunctionality = () => {
  const sipUA = useRef<SipUA | null>(null);

  const createSipUA  =async ()=>{
// eslint-disable-next-line react-hooks/rules-of-hooks
    const settings = {
      pcConfig: {
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      },
      wsUri: SipConstants.sipServerAddress,
      register: true,
    };
    
  }
  
  return {sipUA,createSipUA}
}

export default useSipFunctionality