import { ObjectId } from 'mongodb';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';

export const runtime = 'nodejs';

/** Body: `{ ids: [photoId, ...] }` — array position becomes the new order. */
export const POST = withAdmin(async (req) => {
  const { ids } = await req.json();
  if (!Array.isArray(ids) || !ids.length) return error('ids must be a non-empty array', 400);
  if (!ids.every((id) => ObjectId.isValid(id))) return error('ids contains an invalid photo id', 400);

  const db = await getDb();
  await db.collection(COLLECTIONS.photos).bulkWrite(
    ids.map((id, index) => ({
      updateOne: { filter: { _id: new ObjectId(id) }, update: { $set: { order: index } } },
    })),
  );

  revalidate(TAGS.photos);
  return json({ ok: true, count: ids.length });
});
