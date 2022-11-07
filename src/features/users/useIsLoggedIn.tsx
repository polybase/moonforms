import { useAuth } from './useAuth';

export function useIsLoggedIn() {
  const { auth } = useAuth();
  return [!!auth];
}
