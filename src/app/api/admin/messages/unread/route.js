import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, withAdmin } from '@/lib/api';

export const runtime = 'nodejs';

/**
 * Just the unread count, for the sidebar badge. The full messages route also
 * returns every message body, which is far too much to fetch on every page.
 * Covered by the middleware's /api/admin gate like every other admin route.
 */
export const GET = withAdmin(async () => {
  const db = await getDb();
  const unread = await db.collection(COLLECTIONS.messages).countDocuments({ read: { $ne: true } });
  return json({ unread });
});
