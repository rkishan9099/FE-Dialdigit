import { RootState, store } from "@/store";
import React, { useEffect } from "react";
import DialpadDropdown from "./DialpadDropdown";
import OnGoingCallDropdown from "./OnGoingCallDropdown";
import { Settings } from "@/@core/context/settingsContext";
import { useSelector } from "react-redux";
import useSipClient from "@/hooks/dialer/useSipClient";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { CallDirection, OngoingSessionState } from "@/lib/Sip/sip-type";
import InboundConnecting from "@/components/dialer/Connecting/InboundConnecting";
import ConnectingCallDropdown from "./ConnectingCallDropdown";
import { useCallDurationTimer } from "@/hooks/dialer/useCallDurationTimer";

interface Props {
  settings: Settings;
}
const CallDropdown = (props: Props) => {
  const { settings } = props;
  const { userAgent, callDirection, ConnectingCall, sessionState } =
    useSelector((state: RootState) => state.sip);
  const { sessionCount } = useSipSessionManager();
  const { TimerAction } = useCallDurationTimer();

  useEffect(() => {
    if (sessionCount() === 1 && sessionState === OngoingSessionState.ANSWERED) {
      TimerAction("start");
    }
    if(sessionCount()===0&& sessionState===OngoingSessionState.COMPLETED){
      TimerAction('stop')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionState]);

  return (
    <>
      {sessionCount() > 0 ? (
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
