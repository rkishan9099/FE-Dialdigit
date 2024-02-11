import { SipModel, SipSession } from "@/lib/Sip"

export interface SipClientType {
    createUA: () => void,
    updateSession: (field: string, session: SipSession, args: any, client: SipModel.ClientAuth) => void
    call: (number: string, video?: boolean) => void
    disConnect: () => void
    isMuted: (id?: string | undefined) => boolean
    mute: (id?: string | undefined) => void
    unmute: (id?: string | undefined) => void
    isHolded: (id?: string | undefined) => boolean
    hold: (id?: string | undefined) => void
    unhold: (id?: string | undefined) => void
    dtmf: (tone: number | string, id?: string | undefined) => void
    terminate: (sipCode: number, reason: string, id: string | undefined) => void
    blindTransfer: (number: number | string) => void
    attendedTransfer: (number: string | number) => void
    answer: (id?: string | undefined) => void
    activate: (id: string) => void
    muteAllCall: () => void
    isMutedAllCall: () => boolean
    isHoldedAllCall: () => boolean
    unmuteAllCall: () => void
    holdAllCall: () => void
    unholdAllCall: () => void
    conference: () => void
}