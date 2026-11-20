import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, withAdmin } from '@/lib/api';
import { listMapCountries } from '@/lib/countryLookup';

export const runtime = 'nodejs';

/**
 * Countries the map knows that haven't been added yet — the picker's options.
 * Offering only map names is what guarantees a new country lights up on the
 * globe; the old free-text prompt only warned you about that.
 */
export const GET = withAdmin(async () => {
  const [names, db] = await Promise.all([listMapCountries(), getDb()]);
  const existing = await db.collection(COLLECTIONS.countries).find({}, { projection: { name: 1 } }).toArray();
  const taken = new Set(existing.map((c) => c.name));
  return json({ names: names.filter((n) => !taken.has(n)) });
});
