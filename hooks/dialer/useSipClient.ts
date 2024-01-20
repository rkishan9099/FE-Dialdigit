import React, { useRef } from "react";
import { useAuth } from "../useAuth";
import { SessionManager, SipConstants, SipUA } from "@/lib/Sip";
import { UA, WebSocketInterface } from "jssip";
import {
  ConnectedEvent,
  ConnectingEvent,
  DisconnectEvent,
  RegisteredEvent,
  UnRegisteredEvent,
} from "jssip/lib/UA";
import { ConnectingStatus, RegisterState } from "@/lib/Sip/sip-type";
import { store } from "@/store";
import {
  setConnectedInfo,
  setRegistererState,
  setUserAgent,
} from "@/store/dialer/sip";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const useSipClient = () => {
  const { user } = useAuth();
  const sipClient = useRef<SipUA | null>();
  const { userAgent } = useSelector((state: any) => state.sip);
  const createUA = async () => {
    const client = {
      username: `${user?.sipExtension}@@testsip.digitechnobits.com`,
      password: user?.sipPassword,
      name: user?.name ?? user?.sipExtension,
    };

    const sipUserAgent = new UA({
      uri: `sip:${user?.sipExtension}@testsip.digitechnobits.com`,
      password: "digit90digit@@digit90",
      display_name: user?.name,
      sockets: [
        new WebSocketInterface("wss://testsip.digitechnobits.com:7443"),
      ],
      register: true,
    });
    sipUserAgent.on("connecting", (event: ConnectingEvent) => {
      const connectedInfo = {
        connected: false,
        connectingStatus: ConnectingStatus.Connecting,
      };
      store.dispatch(setConnectedInfo(connectedInfo));
    });
    sipUserAgent.on("connected", (event: ConnectedEvent) => {
      const connectedInfo = {
        connected: true,
        connectingStatus: ConnectingStatus.Connected,
      };
      store.dispatch(setConnectedInfo(connectedInfo));
      toast.success("User Agent connected");
    });
    sipUserAgent.on("disconnected", (event: DisconnectEvent) => {
      const connectedInfo = {
        connected: false,
        connectingStatus: ConnectingStatus.Disconnected,
      };
      store.dispatch(setConnectedInfo(connectedInfo));
      toast.error("User Agent Disconnected");
    });
    sipUserAgent.on("registered", (data: RegisteredEvent) => {
       console.debug('registered')
      store.dispatch(setRegistererState(RegisterState.REGISTERED));
    });
    sipUserAgent.on("unregistered", (data: UnRegisteredEvent) => {
      console.debug('unregistered')
      store.dispatch(setRegistererState(RegisterState.UNREGISTERED));
    });
    sipUserAgent.on("registrationFailed", (data: UnRegisteredEvent) => {
       console.debug('registrationFailed')
      store.dispatch(setRegistererState(RegisterState.UNREGISTERED));
    });
    store.dispatch(setUserAgent(sipUserAgent));
    sipUserAgent.start();
  };

  return { createUA, sipClient: sipClient.current };
};

export default useSipClient;
