import { ConnectingStatus, RegisterState } from "@/lib/Sip/sip-type";
import { createSlice } from "@reduxjs/toolkit";


const initialState ={
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


    }
})
export const {setConnectedInfo,setRegistererState
} = slice.actions
export default slice.reducer