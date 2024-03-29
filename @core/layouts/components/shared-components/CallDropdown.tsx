import { AppDispatch, RootState } from "@/store";
import React, { useEffect } from "react";
import DialpadDropdown from "./DialpadDropdown";
import OnGoingCallDropdown from "./OnGoingCallDropdown";
import { Settings } from "@/@core/context/settingsContext";
import { useDispatch, useSelector } from "react-redux";
import useSipSessionManager from "@/hooks/dialer/useSipSessionManager";
import { CallDirection, OngoingSessionState } from "@/lib/Sip/sip-type";
import InboundConnecting from "@/components/dialer/Connecting/InboundConnecting";
import { useCallDurationTimer } from "@/hooks/dialer/useCallDurationTimer";
import useSipClient from "@/hooks/dialer/useSipClient";
import { closeToggleDrawerSheet, updateSipState } from "@/store/dialer/sip";
import { usePathname, useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";

interface Props {
  settings: Settings;
}
const CallDropdown = (props: Props) => {
  const { settings } = props;
  const pathName = usePathname();

  const {
    userAgent,
    callDirection,
    ConnectingCall,
    sessionState,
    isAttendedTransfer,
    isAddCall,
    sessions,
  } = useSelector((state: RootState) => state.sip);
  const { sessionCount, getActiveSession, getActiveSessionState } =
    useSipSessionManager();

  const { TimerAction } = useCallDurationTimer();
  const { unholdAllCall, unmuteAllCall } = useSipClient();

  const sessionNumber = sessionCount();
  const activeSessionState = getActiveSessionState();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (sessionNumber === 1 && sessionState === OngoingSessionState.ANSWERED) {
      TimerAction("start");
    }
    if (sessionNumber === 0) {
      TimerAction("stop");
      dispatch(closeToggleDrawerSheet());
    }
    if (sessionNumber === 1) {
      dispatch(closeToggleDrawerSheet());
    }
    if (sessionNumber === 0 && pathName === PATH_DASHBOARD.call.ongoingCall) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionState, sessionNumber, pathName]);

  useEffect(() => {
    if (activeSessionState) {
      dispatch(
        updateSipState({
          key: "sessionState",
          value: activeSessionState?.status,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSessionState, sessionNumber, activeSessionState?.status]);

  useEffect(() => {
    if (sessionNumber === 1) {
      unholdAllCall();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionNumber]);

  return (
    <>
      {sessionCount() > 0 && (pathName !==PATH_DASHBOARD.dashboard.general && pathName !== PATH_DASHBOARD.call.ongoingCall ) && (
        <OnGoingCallDropdown settings={settings} />
      )}
      {sessionCount() === 0 && pathName !==PATH_DASHBOARD.dashboard.general && <DialpadDropdown settings={settings} />}

      {sessionCount() > 0 &&
        ConnectingCall &&
        callDirection === CallDirection.Inbound && <InboundConnecting />}
    </>
  );
};

export default CallDropdown;
