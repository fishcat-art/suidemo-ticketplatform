import { createWalrusClient } from '../walrus/walrusClient';
import type { TicketMetadata } from '../types/TicketMetadata';
import { SuiClient } from '@mysten/sui/client';
import { Signer } from '@mysten/sui/cryptography';

export async function uploadTicketMetadata(
  metadata: TicketMetadata,
  suiClient: SuiClient,
  signer: Signer,
): Promise<string> {
  const walrus = createWalrusClient(suiClient);

  const bytes = new TextEncoder().encode(JSON.stringify(metadata));

  const result = await walrus.writeBlob({
    blob: bytes,
    deletable: false,
    epochs: 10,
    signer,
  });

  return `walrus://${result.blobId}`;
}