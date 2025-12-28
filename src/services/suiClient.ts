import { SuiClient, getFullnodeUrl } from '@mysten/sui';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export const client = new SuiClient({ 
  url: getFullnodeUrl('testnet') 
});

export const SPONSOR_KEYPAIR = new Ed25519Keypair(); // Fund this with testnet SUI