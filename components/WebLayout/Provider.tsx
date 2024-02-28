"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      localStorage.setItem("access_token", user?.accessToken || "");
      localStorage.setItem("refresh_token", user?.refreshToken || "");
    }
  }, [user]);
  return <>{children}</>;
};

export default Provider;
