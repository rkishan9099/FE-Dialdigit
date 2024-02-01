import SipSession from "./SipSession";
import { UA_UNREGISTERED } from "./sip-constants";


export enum ConnectingStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Connecting = 'connecting'
}
export enum CallReasonFor {
  Repos = 'Repos',
  Customer = 'Customer',
  Insurance = 'Insurance',
  Queues = 'Queues',
  AMENDMENT = 'AMENDMENT'
}

export enum CallDirection {
  Inbound = 'Inbound',
  Outbound = 'Outbound',
  NoCall = ''
}

export const CallDirectionValue={
incoming:CallDirection.Inbound,
outgoing:CallDirection.Outbound
}

export enum CallFunctionalityUsed {
  CallDialer = 'CallDialer',
  SelectedCall = 'SelectedCall',
  NoCalls = 'NoCalls'
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
  UNREGISTERED ="unregistered",
  REGISTERED ="registered",
}
export enum OngoingSessionState {
  RINGING = "ringing",
  ANSWERED = "answered",
  COMPLETED = "ended",
  FAILED = "failed",
}