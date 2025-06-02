"use client";

import { checkSessionApi, loginApi, LoginDto, logoutApi } from "@/apis/auth";
import { getMyProfileApi, ProfileApiResponse } from "@/apis/users";
import { GlobalPending } from "@/components/global-loader";
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
  user: ProfileApiResponse | null;
  setUser: Dispatch<SetStateAction<ProfileApiResponse | null>>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ProfileApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  const profileMutation = useProfileMutation();

  const login = useCallback(
    async (loginDto: LoginDto) => {
      const data = await loginApi(loginDto);
      localStorage.setItem("token", data.access_token);
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
