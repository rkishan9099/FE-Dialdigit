import { SipUA } from "@/lib/Sip";
import { ConnectingStatus, RegisterState } from "@/lib/Sip/sip-type";
import { SipSliceType } from "@/types/dialer/SipSlice";
import { createSlice } from "@reduxjs/toolkit";
import { SessionStatus } from "jssip/lib/RTCSession";


const initialState:SipSliceType ={
 userAgent:null,
 connectingStatus: ConnectingStatus.Disconnected,
 connected:false,
 regState:RegisterState.UNREGISTERED,
}
const slice = createSlice({
    name:'sip',
    initialState,
    reducers:{
   /// set Sip js Wbsocket Connected Details
    setConnectedInfo: (state, action) => {
      const { connected, connectingStatus } = action.payload
      state.connected = connected
      state.connectingStatus = connectingStatus
    },
     setRegistererState: (state, action) => {
      state.regState = action.payload
    },
    setUserAgent:(state,action)=>{
state.userAgent=action.payload
    }


    }
})
export const {setConnectedInfo,setRegistererState,setUserAgent
} = slice.actions
export default slice.reducer