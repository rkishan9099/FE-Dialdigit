import { pad } from '@/Utils/utils'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { useStopwatch } from 'react-timer-hook'

// Call Timer Types
interface CallTimerType {
  TimerAction: (action:"start"|"pause"|"stop"|"reset")=>void
  callTimer: any
  seconds: number
  minutes: number
  hours: number
  startTimer: any
  pauseTimer: any
  resetTimer: any
}

// ** Defaults
const defaultProvider: CallTimerType = {
  TimerAction: (action:"start"|"pause"|"stop"|"reset") => null,
  callTimer: '00:00:00',
  seconds: 0,
  minutes: 0,
  hours: 0,
  startTimer: () => null,
  pauseTimer: () => null,
  resetTimer: () => null
}

const CallTimerContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const CallTimerDurationProvider = ({ children }: Props) => {
  // ** States
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: false })
  // const [callDuraion, setDuration] = useState<any>('00:00:00')
  const [callTimer, setCalltimer] = useState<any>('00:00:00')

  const TimerAction = (action: "start"|"pause"|"stop"|"reset") => {
    switch (action) {
      case 'start':
        start()
        break
      case 'reset':
        reset()
        break
      case 'pause':
        pause()
        break
      case 'stop':
        reset()
        pause()
        break
    }
  }

  useEffect(() => {
    setCalltimer(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`)
  }, [seconds]) // eslint-disable-line react-hooks/exhaustive-deps

  const memoizedValue = useMemo(
    () => ({
      callTimer,
      seconds,
      minutes,
      hours,
      startTimer: start,
      pauseTimer: pause,
      resetTimer: reset,
      TimerAction
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callTimer, seconds, minutes, start, pause, reset, TimerAction]
  )

  return <CallTimerContext.Provider value={memoizedValue}>{children}</CallTimerContext.Provider>
}

export { CallTimerContext, CallTimerDurationProvider }
