export const isWalletConnectedLocalStorageKey = 'isWalletConnected';
export const walletAccountLocalStorageKey = 'walletAccountPk';
export const accountAddressLocalStorageKey = 'accountAddress';

export function shortEthAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
