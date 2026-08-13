import { ObjectId } from 'mongodb';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';

export const runtime = 'nodejs';

const toId = (id) => {
  if (!ObjectId.isValid(id)) {
    const err = new Error('Invalid photo id');
    err.status = 400;
    throw err;
  }
  return new ObjectId(id);
};

export const PUT = withAdmin(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();

  const update = {};
  for (const field of ['src', 'thumb', 'city', 'cityDisplay', 'country', 'fileName']) {
    if (body[field] !== undefined) update[field] = String(body[field]);
  }
  for (const field of ['width', 'height', 'order']) {
    if (body[field] !== undefined) update[field] = Number(body[field]);
  }

  const db = await getDb();
  const res = await db.collection(COLLECTIONS.photos).updateOne({ _id: toId(id) }, { $set: update });
  if (!res.matchedCount) return error('Photo not found', 404);

  revalidate(TAGS.photos);
  return json({ id, ...update });
});

export const DELETE = withAdmin(async (_req, { params }) => {
  const { id } = await params;
  const db = await getDb();
  const res = await db.collection(COLLECTIONS.photos).deleteOne({ _id: toId(id) });
  if (!res.deletedCount) return error('Photo not found', 404);
  revalidate(TAGS.photos);
  return json({ ok: true });
});
