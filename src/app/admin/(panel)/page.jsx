import { Suspense } from 'react';
import Dashboard from '@/components/admin/Dashboard';
import { getDb, COLLECTIONS } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const db = await getDb();
    const [countries, photos, unreadMessages, cities] = await Promise.all([
      db.collection(COLLECTIONS.countries).countDocuments(),
      db.collection(COLLECTIONS.photos).countDocuments(),
      db.collection(COLLECTIONS.messages).countDocuments({ read: { $ne: true } }),
      db.collection(COLLECTIONS.photos).distinct('city'),
    ]);
    return { countries, photos, unreadMessages, cities: cities.length };
  } catch (err) {
    return { countries: 0, photos: 0, unreadMessages: 0, cities: 0, error: `Database unreachable: ${err.message}` };
  }
}

export default async function AdminHome() {
  const stats = await getStats();
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <Dashboard stats={stats} />
    </Suspense>
  );
}
