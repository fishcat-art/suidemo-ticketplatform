import { getFullnodeUrl, SuiClient } from '@mysten/sui';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { walrus } from '@mysten/walrus';

export const client = new SuiClient({ 
  url: getFullnodeUrl('testnet'),
  network: 'testnet' as const,
}).extend(walrus()); // Single extended client for everything

export const SPONSOR_KEYPAIR = new Ed25519Keypair(); // Fund with testnet SUI