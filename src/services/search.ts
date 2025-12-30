export async function conversationalSearch(query: string) {
  const res = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  return await res.json();
}