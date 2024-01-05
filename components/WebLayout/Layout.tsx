'use client'
import RootStyleRegistry from "@/app/emotion";
import React, { ReactNode } from "react";
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
import AclGuard from "@/@core/components/auth/AclGuard";
import { defaultACLObj } from "@/configs/acl";

type PropsType = {
  children: React.ReactNode;
  type: "main" | "auth";
};

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<FallbackSpinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<FallbackSpinner />}>{children}</AuthGuard>
  }
}

const Layout = ({ children, type }: PropsType) => {
  const contentHeightFixed = false;
  const setConfig: any = undefined;

  const authGuard = true

  const guestGuard =  false

  const aclAbilities = defaultACLObj
  return (
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
     
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                   <LocalizationProvider dateAdapter={AdapterDateFns}>

                  {type==='main' && 
                  
                  <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                          <UserLayout contentHeightFixed={contentHeightFixed}>
                    {children}
                  </UserLayout>
                        </AclGuard>
                  </Guard>
                   }
                  {type==='auth' && <BlankLayout>{children}</BlankLayout>}
                 
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
      </NextAppDirEmotionCacheProvider>
  );
};

export default Layout;
