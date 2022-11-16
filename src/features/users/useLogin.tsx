import * as eth from '@polybase/eth';
import { ethPersonalSign } from '@polybase/eth';
import { usePolybase } from '@polybase/react';
import Wallet from 'ethereumjs-wallet';

import { useAuth } from './useAuth';
import { UserRecord } from '../types';

export function useLogin() {
  const { login } = useAuth();
  const db = usePolybase();

  const getWalletAccount = async (accountAddress: string): Promise<Wallet> => {
    const userCollection = db.collection<UserRecord>('user');
    const user = await userCollection
      .record(accountAddress)
      .get()
      .catch(() => null);
    if (!user) {
      const wallet = Wallet.generate();
      const privateKeyBuff = wallet.getPrivateKey();
      const privateKey = privateKeyBuff.toString('hex');
      const encryptedPrivateKey = await eth.encrypt(privateKey, accountAddress);

      const publicKeyBuff = wallet.getPublicKey();
      const publicKey = publicKeyBuff.toString('hex');

      await userCollection.create([accountAddress, encryptedPrivateKey, publicKey]);
      return wallet;
    } else {
      const privateKey = await eth.decrypt(
        user.data.encryptedPrivateKey,
        accountAddress
      );
      return Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex'));
    }
  };

  return async () => {
    const accounts = await eth.requestAccounts();
    const accountAddress = accounts[0];
    const walletAccount = await getWalletAccount(accountAddress);

    await login(accountAddress, walletAccount);

    db.signer(async (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(walletAccount.getPrivateKey(), data),
      };
    });
  };
}
