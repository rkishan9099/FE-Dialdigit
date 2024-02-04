"use client";
import React, { ReactNode, Suspense, lazy, useCallback, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  SettingsConsumer,
  SettingsProvider,
} from "@/@core/context/settingsContext";
import ThemeComponent from "@/@core/theme/ThemeComponent";
import ReactHotToast from "@/@core/styles/libs/react-hot-toast";
import { Toaster } from "react-hot-toast";
import UserLayout from "@/layouts/UserLayout";
import BlankLayout from "@/@core/layouts/BlankLayout";
import NextAppDirEmotionCacheProvider from "@/@core/theme/EmotionCache";
import GuestGuard from "@/@core/components/auth/GuestGuard";
import AuthGuard from "@/@core/components/auth/AuthGuard";
import FallbackSpinner from "@/@core/components/spinner";
import { defaultACLObj } from "@/configs/acl";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import useSipClient from "@/hooks/dialer/useSipClient";
import { CallTimerDurationProvider } from "@/context/CallTimerContext";
import { PersistGate } from "redux-persist/integration/react";
import { useAuth } from "@/hooks/useAuth";

const AclGuard = lazy(() => import("@/@core/components/auth/AclGuard"));

type PropsType = {
  children: React.ReactNode;
  type: "main" | "auth";
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<FallbackSpinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<FallbackSpinner />}>{children}</AuthGuard>;
  }
};

const Layout = ({ children, type }: PropsType) => {
  const contentHeightFixed = false;
  const setConfig: any = undefined;

  const authGuard = true;

  const guestGuard = false;

  const aclAbilities = defaultACLObj;

  const { user } = useAuth();

  const setAccessToken = useCallback(()=>{
     if (user) {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken && user.accessToken) {
        localStorage.setItem("accessToken", user?.accessToken);
      }
    }
  },[user])

  const setRefreshToken = useCallback(()=>{
     if (user) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken && user.refreshToken) {
        localStorage.setItem("refreshToken", user?.refreshToken);
      }
    }
  },[user])

  useEffect(() => {
   setAccessToken()
   setRefreshToken()
  }, []);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {type === "main" && (
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <Suspense fallback={<FallbackSpinner />}>
                          <AclGuard
                            aclAbilities={aclAbilities}
                            guestGuard={guestGuard}
                            authGuard={authGuard}
                          >
                            <Suspense fallback={<h1>Loading</h1>}>
                              <CallTimerDurationProvider>
                                <UserLayout
                                  contentHeightFixed={contentHeightFixed}
                                >
                                  {children}
                                </UserLayout>
                              </CallTimerDurationProvider>
                            </Suspense>
                          </AclGuard>
                        </Suspense>
                      </Guard>
                    )}
                    {type === "auth" && <BlankLayout>{children}</BlankLayout>}

                    <ReactHotToast>
                      <Toaster
                        position={settings.toastPosition}
                        toastOptions={{ className: "react-hot-toast" }}
                      />
                    </ReactHotToast>
                  </LocalizationProvider>
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
        {/* </PersistGate> */}
      </Provider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default Layout;
