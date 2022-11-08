import * as eth from '@polybase/eth';
import { usePolybase } from '@polybase/react';

import { useAuth } from './useAuth';

export function useLogin() {
  const { login } = useAuth();
  const db = usePolybase();

  return async () => {
    const accounts = await eth.requestAccounts();
    const account = accounts[0];

    await login(account, '0x23838');

    db.signer(async (data) => {
      const accounts = await eth.requestAccounts();
      const account = accounts[0];
      const sig = await eth.sign(data, account);

      return { h: 'eth-personal-sign', sig };
    });
  };
}
