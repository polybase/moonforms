/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import Wallet from 'ethereumjs-wallet';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import {
  accountAddressLocalStorageKey,
  isWalletConnectedLocalStorageKey,
  walletAccountLocalStorageKey
} from "../common/utils";

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
      console.log('loggin in', accountAddress, walletAccount)
      localStorage.setItem(isWalletConnectedLocalStorageKey, 'true');
      setAuth({ accountAddress, walletAccount });
    },
    []
  );

  const logout = useCallback(async () => {
    localStorage.setItem(isWalletConnectedLocalStorageKey, 'false');
    localStorage.setItem(walletAccountLocalStorageKey, '');
    localStorage.setItem(accountAddressLocalStorageKey, '');
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
