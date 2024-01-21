import { SipUA } from "@/lib/Sip";
import { ConnectingStatus, RegisterState } from "@/lib/Sip/sip-type";
import { UA } from "jssip";

export  interface SipSliceType{
    userAgent:SipUA|null,
    connectingStatus:ConnectingStatus
    connected:boolean
    regState:RegisterState

}