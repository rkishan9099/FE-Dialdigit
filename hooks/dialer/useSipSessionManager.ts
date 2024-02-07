import { SipConstants, SipModel, SipSession } from "@/lib/Sip";
import { SipSessionState } from "@/lib/Sip/sip-type";
import { formatPhoneNumber } from "@/lib/Sip/sip-utils";
import { AppDispatch, RootState, store } from "@/store";
import { addSession, deleteSipSession } from "@/store/dialer/sip";
import { enableMapSet } from "immer";
import { useDispatch, useSelector } from "react-redux";


interface SipSessionManager {
    activate:(Session:SipSession)=>void
    updateSession:( field: string,session: SipSession,args: any, sessions: any)=>void
    getSessionState:(id:string)=>SipModel.SipSessionState
    getSession:(id:string)=>SipSession
    newSession:(session:SipSession)=>void
    sessionCount:()=>number
    getAllSessions:()=>any[]
    deleteSession:(id:string)=>void
    getDialNumber:()=>string
    getActiveSession:()=>SipSession |null
}

const useSipSessionManager = ():SipSessionManager=> {
  const {sessions}=useSelector((state:any)=>state.sip)
  const dispatch =useDispatch<AppDispatch>()

  const activate = (session: SipSession) => {
    sessions.forEach((v:any, k:any) => {
      if (k !== session.id) {
        v.active = false;
        session.setActive(false);
      } else {
        v.active = true;
        session.setActive(true);
      }
    });
  };

  const updateSession = (
    field: string,
    session: SipSession,
    args: any,
    sessions:any
  ): void => {
    let updateState=true;
    const sessionList:any = store.getState().sip.sessions
     let state: SipModel.SipSessionState = sessionList.get(session.id);
    if (state) {
      switch (field) {
        case SipConstants.SESSION_RINGING:
          state ={...state,status:args.status}
          break;
        case SipConstants.SESSION_ANSWERED:
          state ={...state,status:args.status}
          break;
        case SipConstants.SESSION_FAILED:
        case SipConstants.SESSION_ENDED:
          updateState=false
           state ={...state,status:args.status,endState:{
            cause: args.cause,
            status: args.status,
            originator: args.endState,
            description: args.description,
          }}
        
          // sessions.delete(session.id);
          dispatch(deleteSipSession(session.id))
          
          break;
        case SipConstants.SESSION_MUTED:
           state ={...state,status:args.status}
          state.muteStatus = args.status;
          break;
        case SipConstants.SESSION_HOLD:
           state ={...state,status:args.status,holdState: {
            originator: args.originator,
            status: args.status,
          }}
          break;
        case SipConstants.SESSION_ICE_READY:
           state ={...state,iceReady: true}
          break;
        case SipConstants.SESSION_ACTIVE:
           state ={...state,active: true}
          break;
      }

      if(updateState){
 dispatch(addSession(state))      }


    }
  };

  const getSessionState = (id: string):any=> {
  const state = sessions.get(id);
    if (!state) {
      throw new Error("Session not found");
    }
    return state;
  };

  const getSession = (id: string): SipSession => {
    return getSessionState(id).sipSession;
  };

  const newSession = (session: SipSession): void => {
   
    const sessionData ={
       id: session.id,
      sipSession: session,
      startDateTime: new Date(),
      active: true,
      status: "init",
      connection: undefined,
    }
    dispatch(addSession(sessionData))
  };

  const sessionCount = () => {
    return sessions.size;
  };

  const getAllSessions = () => {
   return Array.from(sessions.values());
  };

  const deleteSession = (id: string) => {
          dispatch(deleteSipSession(id))

  };

   const getDialNumber =() =>{
    const allSessions = getAllSessions();
    const dialNumber: string[] = [];
    let number:string='';
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session:any) => {
        if (session !== null && session !== undefined) {
          dialNumber.push(formatPhoneNumber(session?.sipSession?.user));
        }
      });
      number= dialNumber.join();
    }
    return number
  }

  const getActiveSession =():SipSession |null=> {
    if (sessions.size === 0) {
     return null;
    }
    const state = [...sessions.values()].filter((s) => s.active);
    if (state.length > 0) {
      return state[state.length-1].sipSession;
    } else {
      return null
    }
  }

  return {activate,updateSession,getSessionState,getSession,newSession,sessionCount,getAllSessions,deleteSession,getDialNumber,getActiveSession}
};

export default useSipSessionManager;
