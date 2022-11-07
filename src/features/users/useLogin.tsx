import * as eth from '@polybase/eth';

import { useAuth } from './useAuth';

export function useLogin() {
  const { login } = useAuth();
  // const db = usePolybase();

  return async () => {
    const accounts = await eth.requestAccounts();
    const account = accounts[0];

    console.log(account);
    // Login
    await login(account, '0x23838');
  };
}
