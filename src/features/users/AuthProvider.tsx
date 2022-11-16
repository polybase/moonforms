/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import Wallet from 'ethereumjs-wallet';
import React, { createContext, useCallback, useMemo, useState } from 'react';

export interface AuthContextValue {
  auth: { accountAddress: string; walletAccount: Wallet } | null;
  login: (accountAddress: string, walletAccount: Wallet) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  auth: null,
  login: async (accountAddress: string, walletAccount: Wallet) => {},
  logout: async () => {},
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthContextValue['auth']>(null);
  const login = useCallback(
    async (accountAddress: string, walletAccount: Wallet) => {
      setAuth({ accountAddress, walletAccount });
    },
    []
  );

  const logout = useCallback(async () => {
    setAuth(null);
  }, []);

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
