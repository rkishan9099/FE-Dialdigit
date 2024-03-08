import { useEffect } from "react";
import { useAuth } from "../useAuth";
import {
  SessionManager,
  SipAudioElements,
  SipConstants,
  SipSession,
  normalizeNumber,
} from "@/lib/Sip";
import { RootState, store } from "@/store";
import {
  setConnectedInfo,
  setRegistererState,
  setUserAgent,
  updateSipState,
} from "@/store/dialer/sip";
import { useSelector } from "react-redux";
import {
  CallDirection,
  CallDirectionValue,
  ConnectingStatus,
  OngoingSessionState,
  RegisterState,
  SipSessionState,
} from "@/lib/Sip/sip-type";
import { UA, WebSocketInterface, debug } from "jssip";
import {
  ConnectedEvent,
  ConnectingEvent,
  DisconnectEvent,
  IncomingRTCSessionEvent,
  RegisteredEvent,
  UnRegisteredEvent,
} from "jssip/lib/UA";
import toast from "react-hot-toast";
import { RTCSession } from "jssip/lib/RTCSession";
import * as events from "events";
import { formatPhoneNumber } from "@/lib/Sip/sip-utils";
import { SipClientType } from "@/types/dialer/SipClientType";
import useSipSessionManager from "./useSipSessionManager";

const useSipClient = (): SipClientType => {
  const { user } = useAuth();
  const { userAgent, sessions } = useSelector((state: RootState) => state.sip);
  const sipServerAddress = "wss://digit.digitechnobits.com:7443";
  const sipServer = "digit.digitechnobits.com";
  const sessionManager = new SessionManager();
  const EmitterEvent = new events.EventEmitter();
  const {
    newSession,
    updateSession,
    getAllSessions,
    getSession,
    getActiveSession,
    deleteSession,
  } = useSipSessionManager();
  let sipUA: UA;

  const settings = {
    pcConfig: {
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    },
    wsUri: sipServerAddress,
    register: true,
  };

  const client = {
    username: `${user?.sipExtension}@digit.digitechnobits.com`,
    password: user?.sipPassword || "",
    name: user?.name || user?.sipExtension || "",
  };

  const rtcConfig = settings.pcConfig;
  const createUA = () => {
    debug.enable("JsSIP:*");
    sipUA = new UA({
      uri: `sip:${client.username}`,
      password: client.password,
      display_name: client.name,
      sockets: [new WebSocketInterface(settings.wsUri)],
      register: settings.register,
    });
    sipUA.on("connecting", (data: ConnectingEvent) => {
      EmitterEvent.emit(SipConstants.UA_CONNECTING, { ...data, client });
      const connectedInfo = {
        connected: false,
        connectingStatus: ConnectingStatus.Connecting,
      };

      store.dispatch(setConnectedInfo(connectedInfo));
    });
    sipUA.on("connected", (data: ConnectedEvent) => {
      EmitterEvent.emit(SipConstants.UA_CONNECTED, { ...data, client });
      console.log("connected;========================================");
      const connectedInfo = {
        connected: true,
        connectingStatus: ConnectingStatus.Connected,
      };
      store.dispatch(setConnectedInfo(connectedInfo));
      toast.success("User Agent connected");
    });
    sipUA.on("disconnected", (data: DisconnectEvent) => {
      EmitterEvent.emit(SipConstants.UA_DISCONNECTED, {
        ...data,
        client,
      });
      const connectedInfo = {
        connected: false,
        connectingStatus: ConnectingStatus.Disconnected,
      };
      store.dispatch(setConnectedInfo(connectedInfo));
      toast.error("User Agent disconnected");
    });
    sipUA.on("registered", (data: RegisteredEvent) => {
      EmitterEvent.emit(SipConstants.UA_REGISTERED, { ...data, client });
      console.log("registered;========================================");
      store.dispatch(setRegistererState(RegisterState.REGISTERED));
    });
    sipUA.on("unregistered", (data: UnRegisteredEvent) => {
      EmitterEvent.emit(SipConstants.UA_UNREGISTERED, {
        ...data,
        client,
      });
      store.dispatch(setRegistererState(RegisterState.UNREGISTERED));
    });
    sipUA.on("registrationFailed", (data: UnRegisteredEvent) => {
      EmitterEvent.emit(SipConstants.UA_UNREGISTERED, {
        ...data,
        client,
      });
      store.dispatch(setRegistererState(RegisterState.UNREGISTERED));
    });

    // Session
    sipUA.on("newRTCSession", async (data: IncomingRTCSessionEvent) => {
      console.warn("args", data);
      const rtcSession: RTCSession = data.session;
      const session: SipSession = new SipSession(
        rtcSession,
        rtcConfig,
        new SipAudioElements()
      );

      store.dispatch(updateSipState({ key: "ongoingSession", value: session }));
      store.dispatch(updateSipState({ key: "sessionId", value: session.id }));
      store.dispatch(
        updateSipState({
          key: "callDirection",
          value: CallDirectionValue[session?.direction],
        })
      );
      if (CallDirectionValue[session?.direction] === CallDirection.Inbound) {
        store.dispatch(updateSipState({ key: "ConnectingCall", value: true }));
      }

      await newSession(session);

      session.on(SipConstants.SESSION_RINGING, (args) => {
        updateSession(SipConstants.SESSION_RINGING, session, args, sessions);
        store.dispatch(
          updateSipState({
            key: "sessionState",
            value: OngoingSessionState.RINGING,
          })
        );
      });

      session.on(SipConstants.SESSION_ANSWERED, (args) => {
        store.dispatch(
          updateSipState({
            key: "sessionState",
            value: OngoingSessionState.ANSWERED,
          })
        );
        updateSession(SipConstants.SESSION_ANSWERED, session, args, sessions);
      });

      session.on(SipConstants.SESSION_FAILED, (args) => {
        store.dispatch(
          updateSipState({
            key: "sessionState",
            value: OngoingSessionState.FAILED,
          })
        );

        updateSession(SipConstants.SESSION_FAILED, session, args, sessions);
      });

      session.on(SipConstants.SESSION_ENDED, (args) => {
        store.dispatch(
          updateSipState({
            key: "sessionState",
            value: OngoingSessionState.COMPLETED,
          })
        );
        updateSession(SipConstants.SESSION_ENDED, session, args, sessions);
      });

      session.on(SipConstants.SESSION_MUTED, (args) => {
        updateSession(SipConstants.SESSION_MUTED, session, args, sessions);
      });

      session.on(SipConstants.SESSION_HOLD, (args) => {
        updateSession(SipConstants.SESSION_HOLD, session, args, sessions);
      });

      session.on(SipConstants.SESSION_UNHOLD, (args) => {
        updateSession(SipConstants.SESSION_UNHOLD, session, args, sessions);
      });

      session.on(SipConstants.SESSION_ICE_READY, (args) => {
        updateSession(SipConstants.SESSION_ICE_READY, session, args, sessions);
      });

      session.on(SipConstants.SESSION_ACTIVE, (args) => {
        updateSession(SipConstants.SESSION_ACTIVE, session, args, sessions);
      });

      session.setActive(true);
    });
    sipUA.start();
    store.dispatch(setUserAgent(sipUA));
  };

  const call = async (number: string, video = false) => {
    let normalizedNumber: string = normalizeNumber(number);
    const extraHeaders: string[] = [];
    userAgent &&
      userAgent.call(normalizedNumber, {
        extraHeaders: [`X-Original-Number:${number}`, ...extraHeaders],
        mediaConstraints: { audio: true, video: video },
        pcConfig: rtcConfig,
      });
  };
  const disConnect = async () => {
    userAgent && userAgent?.stop();
  };

  const isMuted = (id: string | undefined): boolean => {
    if (id) {
      return getSession(id)?.isMuted();
    } else {
      const activeSession = getActiveSession();
      if (activeSession) {
        return activeSession?.isMuted();
      } else {
        return false;
      }
    }
  };
  const mute = (id: string | undefined): void => {
    if (id) {
      getSession(id)?.mute();
    } else {
      getActiveSession()?.mute();
    }
  };
  const unmute = (id: string | undefined): void => {
    if (id) {
      getSession(id).unmute();
    } else {
      getActiveSession()?.unmute();
    }
  };

  const isHolded = (id: string | undefined): boolean => {
    if (id) {
      return getSession(id)?.isHolded();
    } else {
      const activeSession = getActiveSession();
      if (activeSession) {
        return activeSession?.isHolded();
      } else {
        return false;
      }
    }
  };

  const hold = (id: string | undefined): void => {
    if (id) {
      getSession(id)?.hold();
    } else {
      getActiveSession()?.hold();
    }
  };

  const unhold = (id: string | undefined): void => {
    if (id) {
      getSession(id)?.unhold();
    } else {
      getActiveSession()?.unhold();
    }
  };

  const dtmf = (tone: number | string, id: string | undefined): void => {
    if (id) {
      getSession(id)?.sendDtmf(tone);
    } else {
      getActiveSession()?.sendDtmf(tone);
    }
  };

  const terminate = (
    sipCode: number,
    reason: string,
    id: string | undefined = undefined
  ): void => {
    if (id) {
      const session = getSession(id);
      if (session) {
        session.terminate(sipCode, reason);
      }
    } else {
      if (getAllSessions() !== null) {
        const activeSession = getActiveSession();
        if (activeSession) {
          const activeSessionID = activeSession.id;
          activeSession.terminate(sipCode, reason);
          deleteSession(activeSessionID);
        }
      }
    }
  };

  const blindTransfer = (number: number | string) => {
    if (number) {
      const transferAor: string = `sip:${number}@${sipServer}`;
      const activeSession = getActiveSession();
      if (activeSession) {
        activeSession.blindTransfer(transferAor);
      }
    }
  };

  const attendedTransfer = (number: string | number) => {
    if (number) {
      let normalizedNumber: string = normalizeNumber(`${number}`);
      const replaceSession =
        userAgent &&
        userAgent?.call(normalizedNumber, {
          extraHeaders: [`X-Original-Number:${number}`],
          mediaConstraints: { audio: true, video: false },
          pcConfig: rtcConfig,
        });
      const options = {
        replaces: replaceSession,
      };
      if (replaceSession) {
        const activeSession = getActiveSession();
        activeSession?.attendedTransfer(
          replaceSession.remote_identity.uri,
          options
        );
      }
    }
  };

  const answer = (id: string | undefined): void => {
    if (id) {
      getSession(id)?.answer();
    } else {
      const activeSession = getActiveSession();
      activeSession?.answer();
    }
  };
  const activate = (id: string) => {
    const session: SipSession = getSession(id);
    session.setActive(true);
  };

  /// Mute All Conference Call
  const muteAllCall = () => {
    const allSessions = getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.mute();
        }
      });
    }
  };

  /// Check All call Are Muted in Coference
  const isMutedAllCall = (): boolean => {
    let ismuted = false;
    const allSessions = getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          if (session?.sipSession?.isMuted()) {
            ismuted = true;
          } else {
            ismuted = false;
          }
        }
      });
    }
    return ismuted;
  };

  const isHoldedAllCall = (): boolean => {
    let isHolded = false;
    const allSessions = getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          if (session?.sipSession?.isHolded()) {
            isHolded = true;
          } else {
            isHolded = false;
          }
        }
      });
    }
    return isHolded;
  };

  // Unmute All Conference Call
  const unmuteAllCall = (): void => {
    const allSessions = getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.unmute();
        }
      });
    }
  };

  /// Hold All Conference Call
  const holdAllCall = () => {
    const allSessions = getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.hold();
        }
      });
    }
  };

  // Unhold All Conference Call
  const unholdAllCall = () => {
    const allSessions = getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.unhold();
        }
      });
    }
  };

  const conference = () => {
    const AudioElement: SipAudioElements = new SipAudioElements();
    //take all received tracks from the sessions you want to merge
    const receivedTracks: any = [];
    const sessions = sessionManager.getAllSessions();

    if (sessions) {
      sessions.forEach(function (session: SipSessionState) {
        if (session !== null && session !== undefined) {
          session?.sipSession?.unhold();
          session.sipSession?.rtcSession?.connection
            .getReceivers()
            .forEach(function (receiver: any) {
              receivedTracks.push(receiver.track);
            });
        }
      });
      //use the Web Audio API to mix the received tracks
      var context = new AudioContext();
      var allReceivedMediaStreams = new MediaStream();
      sessions.forEach(function (session) {
        if (session !== null && session !== undefined) {
          var mixedOutput = context.createMediaStreamDestination();
          session.sipSession?.rtcSession?.connection
            .getReceivers()
            .forEach(function (receiver: { track: MediaStreamTrack }) {
              receivedTracks.forEach(function (track: MediaStreamTrack) {
                allReceivedMediaStreams.addTrack(receiver.track);
                if (receiver.track.id !== track.id) {
                  var sourceStream = context.createMediaStreamSource(
                    new MediaStream([track])
                  );
                  sourceStream.connect(mixedOutput);
                }
              });
            });
          //mixing your voice with all the received audio
          session.sipSession?.rtcSession?.connection
            .getSenders()
            .forEach(function (sender: any) {
              var sourceStream = context.createMediaStreamSource(
                new MediaStream([sender.track])
              );
              sourceStream.connect(mixedOutput);
            });
          session.sipSession?.rtcSession?.connection
            .getSenders()[0]
            .replaceTrack(mixedOutput.stream.getTracks()[0]);
        }
      });

      //play all received stream to you
      AudioElement.playRemote(allReceivedMediaStreams);
    }
    return true;
  };
  return {
    createUA,
    updateSession,
    call,
    disConnect,
    isMuted,
    mute,
    unmute,
    isHolded,
    hold,
    unhold,
    dtmf,
    terminate,
    blindTransfer,
    attendedTransfer,
    answer,
    activate,
    muteAllCall,
    isMutedAllCall,
    isHoldedAllCall,
    unmuteAllCall,
    holdAllCall,
    unholdAllCall,
    conference,
  };
};

export default useSipClient;
