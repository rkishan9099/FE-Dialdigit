import { useRef } from "react";
import { useAuth } from "../useAuth";
import { SipUA } from "@/lib/Sip";
import { RootState, store } from "@/store";
import { setUserAgent } from "@/store/dialer/sip";
import { useSelector } from "react-redux";

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
