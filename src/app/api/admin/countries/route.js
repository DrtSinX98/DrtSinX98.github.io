import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';

export const runtime = 'nodejs';

const serialize = ({ _id, ...rest }) => ({ id: String(_id), ...rest });

export const GET = withAdmin(async () => {
  const db = await getDb();
  const docs = await db.collection(COLLECTIONS.countries).find({}).sort({ order: 1 }).toArray();
  return json(docs.map(serialize));
});

export const POST = withAdmin(async (req) => {
  const body = await req.json();
  const name = String(body.name || '').trim();
  if (!name) return error('Country name is required', 400);

  const db = await getDb();
  const exists = await db.collection(COLLECTIONS.countries).findOne({ name });
  if (exists) return error(`"${name}" already exists`, 409);

  const last = await db.collection(COLLECTIONS.countries).find({}).sort({ order: -1 }).limit(1).toArray();

  const doc = {
    name,
    displayName: body.displayName || name,
    flag: body.flag || '🌍',
    continent: body.continent || '',
    capital: body.capital || '',
    area: body.area || '',
    population: body.population || '',
    greeting: body.greeting || '',
    mapCenter: Array.isArray(body.mapCenter) ? body.mapCenter.map(Number) : [0, 0],
    mapZoom: Number(body.mapZoom) || 4,
    lat: Number(body.lat) || 0,
    lng: Number(body.lng) || 0,
    visited: body.visited !== false,
    order: (last[0]?.order ?? -1) + 1,
  };

  const res = await db.collection(COLLECTIONS.countries).insertOne(doc);
  revalidate(TAGS.countries);
  return json({ id: String(res.insertedId), ...doc }, 201);
});
