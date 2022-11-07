import React, { createContext, useCallback, useMemo, useState } from 'react';

export interface AuthContextValue {
  auth: { account: string; wallet: string } | null;
  login: (account: string, wallet: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  auth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: async (account: string, wallet: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: async () => {},
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthContextValue['auth']>(null);
  const login = useCallback(async (account: string, wallet: string) => {
    setAuth({ account, wallet });
  }, []);

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
