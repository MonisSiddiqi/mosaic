"use client";

import { checkSessionApi, loginApi, LoginDto, logoutApi } from "@/apis/auth";
import { AuthUser, getMyProfileApi } from "@/apis/users";
import { GlobalPending } from "@/components/global-pending";
import { useProfileMutation } from "@/queries/auth.queries";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (loginDto: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  const profileMutation = useProfileMutation();

  const login = useCallback(
    async (loginDto: LoginDto) => {
      await loginApi(loginDto);
      const profile = await profileMutation.mutateAsync();

      setUser(profile);
    },
    [profileMutation],
  );

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const isLoggedIn = await checkSessionApi();
        if (isLoggedIn) {
          const profile = await getMyProfileApi();
          setUser(profile);
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, setUser }}
    >
      {isLoading ? <GlobalPending /> : children}
    </AuthContext.Provider>
  );
}
