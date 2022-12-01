import * as eth from '@polybase/eth';
import { usePolybase } from '@polybase/react';
import Wallet from 'ethereumjs-wallet';

import { useAuth } from './useAuth';
import { UserRecord } from '../types';

export function useLogin() {
  const { login } = useAuth();
  const db = usePolybase();
  const userCollection = db.collection<UserRecord>('user');

  const getWalletAccount = async (
    accountAddress: string
  ): Promise<{ createNewUser: boolean; wallet: Wallet }> => {
    const user = await userCollection.record(accountAddress).get();
    console.log('accountAddress', accountAddress, user);
    if (!user) {
      return { createNewUser: true, wallet: Wallet.generate() };
    } else {
      const privateKey = await eth.decrypt(
        user.data.encryptedPrivateKey,
        accountAddress
      );
      return {
        createNewUser: false,
        wallet: Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex')),
      };
    }
  };

  return async () => {
    const accounts = await eth.requestAccounts();
    const accountAddress = accounts[0];
    const user = await getWalletAccount(accountAddress);

    console.log(
      user.createNewUser,
      accountAddress,
      user.wallet.getPublicKeyString()
    );

    db.signer(async (data) => {
      return {
        h: 'eth-personal-sign',
        sig: eth.ethPersonalSign(user.wallet.getPrivateKey(), data),
      };
    });

    if (user.createNewUser) {
      const privateKeyBuff = user.wallet.getPrivateKey();
      const privateKey = privateKeyBuff.toString('hex');
      const encryptedPrivateKey = await eth.encrypt(privateKey, accountAddress);
      await userCollection.create([
        accountAddress,
        encryptedPrivateKey,
        user.wallet.getPublicKey().toString('hex'),
      ]);
    }

    await login(accountAddress, user.wallet);
  };
}
