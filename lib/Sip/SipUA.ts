import * as events from "events";
import { UA, WebSocketInterface, debug } from "jssip";
import { RTCSession } from "jssip/lib/RTCSession";
import { SessionManager, SipModel, SipConstants, SipSession, SipAudioElements, normalizeNumber } from ".";
import { ConnectingStatus, RegisterState, SipSessionState } from "./sip-type";
import {
  ConnectedEvent,
  IncomingRTCSessionEvent,
  RegisteredEvent,
  ConnectingEvent,
  UnRegisteredEvent, DisconnectEvent
} from "jssip/lib/UA"
import { formatPhoneNumber } from "./sip-utils";
import toast from "react-hot-toast";
import { store } from "@/store";
import { setConnectedInfo, setRegistererState, updateSipState } from "@/store/dialer/sip";
import { currentUser } from "../auth";
import { setEngine } from "crypto";

    export default class SipUA extends events.EventEmitter {
  #ua: UA;
  #rtcConfig: RTCConfiguration;
  #sessionManager: SessionManager;

  constructor(client: SipModel.ClientAuth, settings: SipModel.ClientOptions) {
    super();
    debug.enable("JsSIP:*");
    this.#sessionManager = new SessionManager();
    this.#rtcConfig = settings.pcConfig;
    this.#ua = new UA({
      uri: `sip:${client.username}`,
      password: client.password,
      display_name: client.name,
      sockets: [new WebSocketInterface(settings.wsUri)],
      register: settings.register,
    });
    this.#ua.on("connecting", (data: ConnectingEvent) => {
      this.emit(SipConstants.UA_CONNECTING, { ...data, client })
      const connectedInfo = {
        connected: false,
        connectingStatus: ConnectingStatus.Connecting
      }

      store.dispatch(setConnectedInfo(connectedInfo))

    }
    );
    this.#ua.on("connected", (data: ConnectedEvent) => {
      console.log('connected;========================================')
      const connectedInfo = {
        connected: true,
        connectingStatus: ConnectingStatus.Connected
      }

      store.dispatch(setConnectedInfo(connectedInfo))
      toast.success('User Agent connected')
      this.emit(SipConstants.UA_CONNECTED, { ...data, client })

    }

    );
    this.#ua.on("disconnected", (data: DisconnectEvent) => {
      const connectedInfo = {
        connected: false,
        connectingStatus: ConnectingStatus.Disconnected
      }

      store.dispatch(setConnectedInfo(connectedInfo))
      this.emit(SipConstants.UA_DISCONNECTED, {
        ...data,
        client,
      })
      toast.error('User Agent disconnected')

    }

    );
    this.#ua.on("registered", (data: RegisteredEvent) => {
      console.log('registered;========================================')
      store.dispatch(setRegistererState(RegisterState.REGISTERED))
      this.emit(SipConstants.UA_REGISTERED, { ...data, client })
    }),
      this.#ua.on("unregistered", (data: UnRegisteredEvent) => {
        store.dispatch(setRegistererState(RegisterState.UNREGISTERED))
        this.emit(SipConstants.UA_UNREGISTERED, {
          ...data,
          client,
        })
      }

      );
    this.#ua.on("registrationFailed", (data: UnRegisteredEvent) => {
      store.dispatch(setRegistererState(RegisterState.UNREGISTERED))

      this.emit(SipConstants.UA_UNREGISTERED, {
        ...data,
        client,
      })
    }

    );

    this.#ua.on("newRTCSession", (data: IncomingRTCSessionEvent) => {
      const rtcSession: RTCSession = data.session;
      const session: SipSession = new SipSession(
        rtcSession,
        this.#rtcConfig,
        new SipAudioElements()
      );

console.debug('sessios',session)
      store.dispatch(updateSipState({key:"ongoingSession",value:session}))
      store.dispatch(updateSipState({key:"sessionId",value:session.id}))
      console.debug('session',session.direction)
      
      this.#sessionManager.newSession(session);
      session.on(SipConstants.SESSION_RINGING, (args) =>
        this.updateSession(SipConstants.SESSION_RINGING, session, args, client)
      );
      session.on(SipConstants.SESSION_ANSWERED, (args) =>
        this.updateSession(SipConstants.SESSION_ANSWERED, session, args, client)
      );
      session.on(SipConstants.SESSION_FAILED, (args) =>
        this.updateSession(SipConstants.SESSION_FAILED, session, args, client)
      );
      session.on(SipConstants.SESSION_ENDED, (args) =>
        this.updateSession(SipConstants.SESSION_ENDED, session, args, client)
      );
      session.on(SipConstants.SESSION_MUTED, (args) =>
        this.updateSession(SipConstants.SESSION_MUTED, session, args, client)
      );
      session.on(SipConstants.SESSION_HOLD, (args) =>
        this.updateSession(SipConstants.SESSION_HOLD, session, args, client)
      );
      session.on(SipConstants.SESSION_UNHOLD, (args) =>
        this.updateSession(SipConstants.SESSION_UNHOLD, session, args, client)
      );
      session.on(SipConstants.SESSION_ICE_READY, (args) =>
        this.updateSession(
          SipConstants.SESSION_ICE_READY,
          session,
          args,
          client
        )
      );
      session.on(SipConstants.SESSION_ACTIVE, (args) => {
        this.updateSession(SipConstants.SESSION_ACTIVE, session, args, client);
      });
      session.setActive(true);
    });
    this.start()
  }
 
  updateSession(
    field: string,
    session: SipSession,
    args: any,
    client: SipModel.ClientAuth
  ) {
    this.emit(field, { ...args, client, session });
    this.#sessionManager.updateSession(field, session, args);
  }

  start(): void {
    this.#ua.start();
    this.emit(SipConstants.UA_START);
  }

  stop(): void {
    this.#ua.stop();
    this.emit(SipConstants.UA_STOP);
  }

  call(number: string,video:boolean=false,extraHeaders=[]): void {
    let normalizedNumber: string = normalizeNumber(number);
    this.#ua.call(normalizedNumber, {
      extraHeaders: [`X-Original-Number:${number}`,...extraHeaders],
      mediaConstraints: { audio: true, video: video },
      pcConfig: this.#rtcConfig,
    });
  }

  isMuted(id: string | undefined): boolean {
    if (id) {
      return this.#sessionManager.getSession(id).isMuted();
    } else {
      return this.#sessionManager.activeSession.isMuted();
    }
  }

  mute(id: string | undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).mute();
    } else {
      this.#sessionManager.activeSession.mute();
    }
  }

  unmute(id: string | undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).unmute();
    } else {
      this.#sessionManager.activeSession.unmute();
    }
  }

  isHolded(id: string | undefined): boolean {
    if (id) {
      return this.#sessionManager.getSession(id).isHolded();
    } else {
      return this.#sessionManager.activeSession.isHolded();
    }
  }

  hold(id: string | undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).hold();
    } else {
      this.#sessionManager.activeSession.hold();
    }
  }

  unhold(id: string | undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).unhold();
    } else {
      this.#sessionManager.activeSession.unhold();
    }
  }

  dtmf(tone: number | string, id: string | undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).sendDtmf(tone);
    } else {
      this.#sessionManager.activeSession.sendDtmf(tone);
    }
  }

  terminate(sipCode: number, reason: string, id: string | undefined=undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).terminate(sipCode, reason);
    } else {
      if (this.getActiveSession() !== null) {
        const activeSessionID = this.#sessionManager.activeSession.id;
        this.#sessionManager.activeSession.terminate(sipCode, reason);
        this.#sessionManager.deleteSession(activeSessionID);
      }
    }
  }

  blindTransfer(number: number | string) {
    if (number) {
      const transferAor: string = `sip:${number}@switch.auxout.net`;

      this.#sessionManager.activeSession.blindTransfer(transferAor);
    }
  }

  attendedTransfer(number: string | number) {
    if (number) {
      let normalizedNumber: string = normalizeNumber(`${number}`);
      const replaceSession = this.#ua.call(normalizedNumber, {
        extraHeaders: [`X-Original-Number:${number}`],
        mediaConstraints: { audio: true, video: false },
        pcConfig: this.#rtcConfig,
      });
      const options = {
        replaces: replaceSession,
      };

      this.#sessionManager.activeSession?.attendedTransfer(
        replaceSession.remote_identity.uri,
        options
      );
    }
  }

  answer(id: string | undefined): void {
    if (id) {
      this.#sessionManager.getSession(id).answer();
    } else {
      this.#sessionManager.activeSession.answer();
    }
  }

  activate(id: string) {
    const session: SipSession = this.#sessionManager.getSession(id);
    session.setActive(true);
  }

  getAllSessions(): any {
    return this.#sessionManager.getAllSessions();
  }

  sessionCount() {
    const activeSession = this.getActiveSession();
    if (activeSession !== null) {
      const allsessions = this.#sessionManager.getAllSessions();
      return allsessions.length || 0;
    } else {
      return 0;
    }
  }

  getActiveSession() {
    try {
      return this.#sessionManager.activeSession;
    } catch (error) {
      return null;
    }
  }

  getSessionState(id:string=''){
    if(id){
      return this.#sessionManager.getSessionState(id)
    }
  }
  getDialNumber() {
    const allSessions = this.getAllSessions();
    const dialNumber: string[] = [];
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          dialNumber.push(formatPhoneNumber(session?.sipSession?.user));
        }
      });
      return dialNumber.join();
    }
  }

  /// Mute All Conference Call
  muteAllCall() {
    const allSessions = this.getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.mute();
        }
      });
    }
  }

  /// Check All call Are Muted in Coference
  isMutedAllCall(): boolean {
    let ismuted = false;
    const allSessions = this.getAllSessions();
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
  }

  isHoldedAllCall(): boolean {
    let isHolded = false;
    const allSessions = this.getAllSessions();
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
  }

  // Unmute All Conference Call
  unmuteAllCall(): void {
    const allSessions = this.getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.unmute();
        }
      });
    }
  }

  /// Hold All Conference Call
  holdAllCall() {
    const allSessions = this.getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.hold();
        }
      });
    }
  }

  // Unhold All Conference Call
  unholdAllCall() {
    const allSessions = this.getAllSessions();
    if (allSessions && allSessions.length > 0) {
      allSessions.forEach((session: SipSessionState) => {
        if (session !== null && session !== undefined) {
          session?.sipSession?.unhold();
        }
      });
    }
  }

  conference() {
    const AudioElement: SipAudioElements = new SipAudioElements();
    //take all received tracks from the sessions you want to merge
    const receivedTracks: any = [];
    const sessions = this.#sessionManager.getAllSessions();

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
  }
}
