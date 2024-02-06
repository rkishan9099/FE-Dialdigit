import { SipModel, SipSession, SipUA } from "@/lib/Sip";
import { ConnectingStatus, OngoingSessionState, RegisterState } from "@/lib/Sip/sip-type";
import { UA } from "jssip";

export  interface SipSliceType{
    userAgent:UA |null,
    connectingStatus:ConnectingStatus
    connected:boolean
    regState:RegisterState
    sessionState:OngoingSessionState|''
    ongoingSession:SipSession|{}
    sessionId:string
    callDirection:string
    sessions: Map<string, SipModel.SipSessionState>
    ConnectingCall:boolean,
    toggleDrawerSheet:boolean
    callTransfer:boolean
    isBlindTransfer:boolean
    isAttendedTransfer:boolean
    isConference:boolean
    isMergeCall:boolean

}