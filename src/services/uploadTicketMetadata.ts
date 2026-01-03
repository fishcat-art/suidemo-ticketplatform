import type { TicketMetadata } from '../types/TicketMetadata';

export async function uploadTicketMetadata(
  metadata: TicketMetadata,
): Promise<string> {
  const res = await fetch('/api/upload-metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    throw new Error('Upload metadata failed');
  }

  const data = await res.json();
  return data.uri as string; // e.g. walrus:xxx
}
/*
export async function uploadTicketMetadata(metadata: unknown): Promise<string> {
  const res = await fetch('/api/upload-metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    throw new Error('Upload metadata failed');
  }

  const { uri } = await res.json();
  return uri;
}
*/