import { useCallback } from 'react';

import { useAuth } from './useAuth';

export function useLogout() {
  const { logout } = useAuth();
  return useCallback(() => {
    return logout();
  }, [logout]);
}
