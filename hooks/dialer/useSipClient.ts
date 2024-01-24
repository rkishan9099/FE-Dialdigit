import { useEffect, useRef } from "react";
import { useAuth } from "../useAuth";
import { SipConstants, SipUA } from "@/lib/Sip";
import { RootState, store } from "@/store";
import { setUserAgent, updateSipState } from "@/store/dialer/sip";
import { useSelector } from "react-redux";
import { OngoingSessionState } from "@/lib/Sip/sip-type";

const useSipClient = () => {
  const { user } = useAuth();
  const sipClient = useRef<SipUA | null>();
  const { userAgent } = useSelector((state: RootState) => state.sip);




  const createUA = () => {
    const sipServerAddress = "wss://testsip.digitechnobits.com:7443";
    const settings = {
      pcConfig: {
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      },
      wsUri: sipServerAddress,
      register: true,
    };
    const client = {
      username: `${user?.sipExtension}@testsip.digitechnobits.com`,
      password: user?.sipPassword || "",
      name: user?.name || user?.sipExtension || "",
    };
    const sipUserAgent = new SipUA(client, settings);

    sipUserAgent.on("newRTCSession", (args) => {
      console.error("args", args);
    });

    sipUserAgent.on(SipConstants.SESSION_RINGING, (args) => {
      updateSipState({
        key: "sessionState",
        value: OngoingSessionState.RINGING,
      });
    });
    sipUserAgent.on(SipConstants.SESSION_ANSWERED, (args) => {
      updateSipState({
        key: "sessionState",
        value: OngoingSessionState.ANSWERED,
      });
    });
    sipUserAgent.on(SipConstants.SESSION_ENDED, (args) => {
      updateSipState({
        key: "sessionState",
        value: OngoingSessionState.COMPLETED,
      });
    });
    sipUserAgent.on(SipConstants.SESSION_FAILED, (args) => {
      updateSipState({
        key: "sessionState",
        value: OngoingSessionState.FAILED,
      });
    });

    sipUserAgent.start();
    store.dispatch(setUserAgent(sipUserAgent));
    sipClient.current = sipUserAgent;
  };

  const call = async (number: string, video = false) => {
    userAgent && userAgent?.call(number);
  };

  const disConnect = async () => {
    userAgent && userAgent?.stop();
  };

  const hangUp = async (
    terminationCode: number = 480,
    message: string = "Call Finished"
  ) => {
    userAgent && userAgent?.terminate(terminationCode, message);
  };

  return { createUA, call, disConnect, hangUp };
};

export default useSipClient;
