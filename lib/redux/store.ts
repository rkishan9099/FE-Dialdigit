import { combineReducers, configureStore } from "@reduxjs/toolkit";

// ** Reducers
import sip from "@/store/dialer/sip";
import users from "@/store/users/users";
import { TypedUseSelectorHook, useDispatch, useSelector ,useStore } from "react-redux";

const reducers = combineReducers({
  sip,
  users,
});
export const makeStore = () => {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        isSerializable: false,
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore