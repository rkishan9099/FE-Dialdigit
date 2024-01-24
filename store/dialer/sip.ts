import { SipUA } from "@/lib/Sip";
import { ConnectingStatus, RegisterState } from "@/lib/Sip/sip-type";
import { SipSliceType } from "@/types/dialer/SipSlice";
import { createSlice } from "@reduxjs/toolkit";
import { SessionStatus } from "jssip/lib/RTCSession";

const initialState: SipSliceType = {
  userAgent: null,
  connectingStatus: ConnectingStatus.Disconnected,
  connected: false,
  regState: RegisterState.UNREGISTERED,
  sessionState:'',
  ongoingSession:{},
  sessionId:'',
  CallDirection:""
};
const slice = createSlice({
  name: "sip",
  initialState,
  reducers: {
    /// set Sip js Websocket Connected Details
    setConnectedInfo: (state, action) => {
      const { connected, connectingStatus } = action.payload;
      state.connected = connected;
      state.connectingStatus = connectingStatus;
    },
    setRegistererState: (state, action) => {
      state.regState = action.payload;
    },
    setUserAgent: (state, action) => {
      state.userAgent = action.payload;
    },
    updateSipState:(state,action:{type:string,payload: { key: keyof SipSliceType; value: SipSliceType[keyof SipSliceType] }})=>{
      const {key,value}=action.payload
       if (key && key in state) {
          // @ts-ignore
        state[key] = value;
      } else {
        console.error(`Invalid key: ${key}`);
      }
    }
  },
});
export const { setConnectedInfo, setRegistererState, setUserAgent,updateSipState } =
  slice.actions;
export default slice.reducer;
