import { WalrusClient } from '@mysten/walrus';
import { getFullnodeUrl } from '@mysten/sui/client';

export function createWalrusClient() {
  return new WalrusClient({
    network: 'testnet',
    suiRpcUrl: getFullnodeUrl('testnet'),
  });
}