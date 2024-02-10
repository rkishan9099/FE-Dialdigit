import SipSession from "./SipSession";
import { UA_UNREGISTERED } from "./sip-constants";

export enum ConnectingStatus {
  Connected = "connected",
  Disconnected = "disconnected",
  Connecting = "connecting",
}
export enum CallReasonFor {
  Repos = "Repos",
  Customer = "Customer",
  Insurance = "Insurance",
  Queues = "Queues",
  AMENDMENT = "AMENDMENT",
}

export enum CallDirection {
  Inbound = "Inbound",
  Outbound = "Outbound",
  NoCall = "",
}

export const CallDirectionValue = {
  incoming: CallDirection.Inbound,
  outgoing: CallDirection.Outbound,
};

export enum CallFunctionalityUsed {
  CallDialer = "CallDialer",
  SelectedCall = "SelectedCall",
  NoCalls = "NoCalls",
}

export interface SipSessionState {
  connection: any;
  id: string;
  sipSession: SipSession;
  startDateTime: Date;
  active: boolean;
  status: string;
  muteStatus?: string;
  iceReady?: boolean;
  endState?: EndState;
  holdState?: HoldState;
}

export interface EndState {
  cause: string;
  status: string;
  originator: string;
  description: string;
}

export interface HoldState {
  status: string;
  originator: string;
}

export interface ClientAuth {
  username: string;
  password: string;
  name: string;
}

export interface ClientOptions {
  pcConfig: PeerConnectionConfig;
  wsUri: string;
  register: boolean;
}

export interface PeerConnectionConfig {
  iceServers: IceServer[];
}

export interface IceServer {
  urls: string[];
}

export interface SipSettings {
  sipDomain: string;
  sipServerAddress: string;
  sipUsername: string;
  sipPassword: string;
  sipDisplayName: string;
  apiKey: string;
}

export enum RegisterState {
  UNREGISTERED = "unregistered",
  REGISTERED = "registered",
}
export enum OngoingSessionState {
  INIT='init',
  RINGING = "ringing",
  ANSWERED = "answered",
  COMPLETED = "ended",
  FAILED = "failed",
  MUTED = "muted",
  HOLD = "hold",
  UNHOLD = "unhold",
  REFER = "refer",
  REPLACES = "replaces",
  ICE_READY = "ice-ready",
  ADD_STREAM = "add-stream",
  TRACK = "track",
  ACTIVE = "active",
}

export const SESSION_RINGING: string = "ringing";
export const SESSION_ANSWERED: string = "answered";
export const SESSION_FAILED: string = "failed";
export const SESSION_ENDED: string = "ended";
export const SESSION_MUTED: string = "muted";
export const SESSION_HOLD: string = "hold";
export const SESSION_UNHOLD: string = "unhold";
export const SESSION_REFER: string = "refer";
export const SESSION_REPLACES: string = "replaces";
export const SESSION_ICE_READY: string = "ice-ready";
export const SESSION_ADD_STREAM: string = "add-stream";
export const SESSION_TRACK: string = "track";
export const SESSION_ACTIVE: string = "active";
