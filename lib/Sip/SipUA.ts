import * as events from "events";
import { UA, WebSocketInterface, debug } from "jssip";
import { RTCSession } from "jssip/lib/RTCSession";
import { SessionManager, SipModel, SipConstants, SipSession, SipAudioElements, normalizeNumber } from ".";
import { SipSessionState } from "./sip-type";
import {
  ConnectedEvent,
  IncomingRTCSessionEvent,
  RegisteredEvent,
  ConnectingEvent,
  UnRegisteredEvent,DisconnectEvent
} from "jssip/lib/UA"
import { formatPhoneNumber } from "./sip-utils";
import toast from "react-hot-toast";

export default class SipUA extends events.EventEmitter {
  #ua: UA;
  #rtcConfig: RTCConfiguration;
  #sessionManager: SessionManager;

  constructor() {
    super();
   toast.success('User Agent Register')
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

  call(number: string): void {
    let normalizedNumber: string = normalizeNumber(number);
    this.#ua.call(normalizedNumber, {
      extraHeaders: [`X-Original-Number:${number}`],
      mediaConstraints: { audio: true, video: false },
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

  terminate(sipCode: number, reason: string, id: string | undefined): void {
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
