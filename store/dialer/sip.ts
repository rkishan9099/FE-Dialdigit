import axiosInstance from "@/Utils/axios";
import { UserApiUrl } from "@/configs/apiUrlConstant";
import { SipModel, SipSession, SipUA } from "@/lib/Sip";
import { ConnectingStatus, OngoingSessionState, RegisterState } from "@/lib/Sip/sip-type";
import { SipSliceType } from "@/types/dialer/SipSlice";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { enableMapSet, produce } from "immer";
import { SessionStatus } from "jssip/lib/RTCSession";
const initialState: SipSliceType = {
  userAgent: null,
  connectingStatus: ConnectingStatus.Disconnected,
  connected: false,
  regState: RegisterState.UNREGISTERED,
  sessionState: OngoingSessionState.RINGING,
  ongoingSession: {},
  sessionId: "",
  callDirection: "",
  sessions: new Map(),
  ConnectingCall:false,
  toggleDrawerSheet:false
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
    updateSipState: (
      state,
      action: {
        type: string;
        payload: {
          key: keyof SipSliceType;
          value: SipSliceType[keyof SipSliceType];
        };
      }
    ) => {
      const { key, value } = action.payload;
      if (key && key in state) {
        // @ts-ignore
        state[key] = value;
      } else {
        console.error(`Invalid key: ${key}`);
      }
    },
    addSession: (state, action) => {
      enableMapSet()
      const session: SipModel.SipSessionState = action.payload;
      state.sessions.set(session.id,session)
    },
    deleteSipSession: (state, action) => {
      state.sessions.delete(action.payload);
    },
    getSessionState:(state,action)=>{
      state.sessions.get(action.payload)
    }
  },
});


export function sendMissedCallEmail() {
 
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get(UserApiUrl.getUser)
      console.debug('response')

      return response.data
    } catch (error) {

      return error
    }
  }
}

export const {
  setConnectedInfo,
  setRegistererState,
  setUserAgent,
  updateSipState,
  addSession,
  deleteSipSession,
} = slice.actions;


export default slice.reducer;
