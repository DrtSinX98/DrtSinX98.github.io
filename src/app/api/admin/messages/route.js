import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, withAdmin } from '@/lib/api';

export const runtime = 'nodejs';

export const GET = withAdmin(async (req) => {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get('limit')) || 100, 500);

  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.messages)
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  const unread = await db.collection(COLLECTIONS.messages).countDocuments({ read: { $ne: true } });

  return json({
    unread,
    messages: docs.map(({ _id, ...rest }) => ({ id: String(_id), ...rest })),
  });
});
