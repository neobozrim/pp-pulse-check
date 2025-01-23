// app/api/test/route.ts
import { fetchEvent } from '@/lib/firebase-utils';

export async function GET() {
  const event = await fetchEvent('-OHF-t1xsjfW5sEVErvM');
  return Response.json({ event });
}