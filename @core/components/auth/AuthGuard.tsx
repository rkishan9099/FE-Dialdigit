// ** React Imports
import { currentUser } from "@/lib/auth";
import { ReactNode, ReactElement } from "react";

// ** Next Import

// ** Hooks Import

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
    return <>{children}</>;
};

export default AuthGuard;
