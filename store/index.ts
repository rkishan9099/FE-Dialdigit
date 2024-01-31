// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import  sip from '@/store/dialer/sip'


export const store = configureStore({
  reducer: {
    sip
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      isSerializable:false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
