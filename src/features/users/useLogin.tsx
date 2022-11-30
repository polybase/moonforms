import Web3 from 'web3';
import { usePolybase } from '@polybase/react';
import { ConnectExtension } from "@magic-ext/connect";
import * as eth from '@polybase/eth';
import Wallet from 'ethereumjs-wallet';
import { Magic } from 'magic-sdk';

import { useAuth } from './useAuth';
import { UserRecord } from '../types';
import {walletAccountLocalStorageKey} from "../common/utils";

type LoginType = 'google' | 'email' | 'metamask';
interface LoginProps {
  loginType: LoginType
  email: string;
}

export function useLogin() {
  const { login } = useAuth();
  const db = usePolybase();
  const userCollection = db.collection<UserRecord>('user');

  const getWalletAccount = async (
    accountAddress: string
  ): Promise<{ createNewUser: boolean; wallet: Wallet }> => {
    const user = await userCollection
      .record(accountAddress)
      .get()
      .catch(() => null);
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

  const getAccountAddress = async (loginProps: LoginProps) => {
    try {
      const magicAuth = new Magic('pk_live_C8D6B4E0E1EBCBF5', {
        network: "mainnet",
      });

      await magicAuth.auth.loginWithMagicLink({email: loginProps.email});
      const metadata = await magicAuth.user.getMetadata();

      console.log('logged in', metadata.publicAddress);
    } catch (e) {}
  }

  return async (loginProps: LoginProps) => {
    await getAccountAddress(loginProps);
    // const user = await getWalletAccount(accountAddress);
    //
    // localStorage.setItem(walletAccountLocalStorageKey, user.wallet.getPrivateKeyString());
    //
    // db.signer(async (data) => {
    //   return {
    //     h: 'eth-personal-sign',
    //     sig: eth.ethPersonalSign(user.wallet.getPrivateKey(), data),
    //   };
    // });
    //
    // if (user.createNewUser) {
    //   const privateKeyBuff = user.wallet.getPrivateKey();
    //   const privateKey = privateKeyBuff.toString('hex');
    //   const encryptedPrivateKey = await eth.encrypt(privateKey, accountAddress);
    //   await userCollection.create([
    //     accountAddress,
    //     encryptedPrivateKey,
    //     user.wallet.getPublicKey().toString('hex'),
    //   ]);
    // }
    //
    // await login(accountAddress, user.wallet);
  };
}
