import bcrypt from 'bcryptjs';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin } from '@/lib/api';

export const runtime = 'nodejs';

export const PUT = withAdmin(async (req) => {
  const { currentPassword, newPassword } = await req.json();

  if (!newPassword || newPassword.length < 8) {
    return error('New password must be at least 8 characters', 400);
  }

  const db = await getDb();
  const record = await db.collection(COLLECTIONS.settings).findOne({ key: 'admin' });

  const valid = record?.passwordHash
    ? bcrypt.compareSync(currentPassword || '', record.passwordHash)
    : currentPassword === process.env.ADMIN_PASSWORD;

  if (!valid) return error('Current password is incorrect', 401);

  await db.collection(COLLECTIONS.settings).updateOne(
    { key: 'admin' },
    { $set: { key: 'admin', passwordHash: bcrypt.hashSync(newPassword, 10), updatedAt: new Date() } },
    { upsert: true },
  );

  return json({ ok: true });
});
