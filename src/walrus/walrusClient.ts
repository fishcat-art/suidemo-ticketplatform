import { WalrusClient } from '@mysten/walrus';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export function createWalrusClient(suiClient: SuiClient) {
  return new WalrusClient({
    network: 'testnet',
    suiClient,
  });
}