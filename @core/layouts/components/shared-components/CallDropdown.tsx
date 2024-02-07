import { RootState } from "@/store";
import React, { useEffect } from "react";
import DialpadDropdown from "./DialpadDropdown";
import OnGoingCallDropdown from "./OnGoingCallDropdown";
import { Settings } from "@/@core/context/settingsContext";
import { useSelector } from "react-redux";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { CallDirection, OngoingSessionState } from "@/lib/Sip/sip-type";
import InboundConnecting from "@/components/dialer/Connecting/InboundConnecting";
import { useCallDurationTimer } from "@/hooks/dialer/useCallDurationTimer";
import useSipClient from "@/hooks/dialer/useSipClient";

interface Props {
  settings: Settings;
}
const CallDropdown = (props: Props) => {
  const { settings } = props;
  const { userAgent, callDirection, ConnectingCall, sessionState } =
    useSelector((state: RootState) => state.sip);
  const { sessionCount } = useSipSessionManager();
  const { TimerAction } = useCallDurationTimer();
  const {unholdAllCall,unmuteAllCall}=useSipClient()
  const sessionNumber = sessionCount()

  useEffect(() => {
    if (sessionNumber === 1 && sessionState === OngoingSessionState.ANSWERED) {
      TimerAction("start");
    }
    if(sessionNumber===0){
      TimerAction('stop')
    }

if(sessionNumber>0){
  unholdAllCall()
  unmuteAllCall()
}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionState,sessionNumber]);

  return (
    <>
      {sessionCount() >0 ? (
        <OnGoingCallDropdown settings={settings} />
      ) : (
        <DialpadDropdown settings={settings} />
      )}
      {sessionCount() > 0 &&
        ConnectingCall &&
        callDirection === CallDirection.Inbound && <InboundConnecting />}
    </>
  );
};

export default CallDropdown;
