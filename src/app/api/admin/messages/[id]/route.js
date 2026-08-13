import { ObjectId } from 'mongodb';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin } from '@/lib/api';

export const runtime = 'nodejs';

const toId = (id) => {
  if (!ObjectId.isValid(id)) {
    const err = new Error('Invalid message id');
    err.status = 400;
    throw err;
  }
  return new ObjectId(id);
};

export const PATCH = withAdmin(async (req, { params }) => {
  const { id } = await params;
  const { read } = await req.json();

  const db = await getDb();
  const res = await db
    .collection(COLLECTIONS.messages)
    .updateOne({ _id: toId(id) }, { $set: { read: Boolean(read) } });

  if (!res.matchedCount) return error('Message not found', 404);
  return json({ ok: true });
});

export const DELETE = withAdmin(async (_req, { params }) => {
  const { id } = await params;
  const db = await getDb();
  const res = await db.collection(COLLECTIONS.messages).deleteOne({ _id: toId(id) });
  if (!res.deletedCount) return error('Message not found', 404);
  return json({ ok: true });
});
