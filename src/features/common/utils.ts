export function shortEthAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
