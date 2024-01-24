import { SipSession, SipUA } from "@/lib/Sip";
import { ConnectingStatus, OngoingSessionState, RegisterState } from "@/lib/Sip/sip-type";
import { UA } from "jssip";

export  interface SipSliceType{
    userAgent:SipUA|null,
    connectingStatus:ConnectingStatus
    connected:boolean
    regState:RegisterState
    sessionState:OngoingSessionState|''
    ongoingSession:SipSession|{}
    sessionId:string
    CallDirection:string

}