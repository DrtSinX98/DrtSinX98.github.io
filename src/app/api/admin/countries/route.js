import { NextResponse } from 'next/server';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';
import { buildCountry } from '@/lib/countryLookup';

export const runtime = 'nodejs';

const serialize = ({ _id, ...rest }) => ({ id: String(_id), ...rest });

export const GET = withAdmin(async () => {
  const db = await getDb();
  const docs = await db.collection(COLLECTIONS.countries).find({}).sort({ order: 1 }).toArray();
  return json(docs.map(serialize));
});

/**
 * Adds a country. Only `name` is required: everything else is looked up (see
 * lib/countryLookup.js). Any field sent in the body still wins over the looked-up
 * value, so API callers can override, and a lookup that comes back partly empty
 * never blocks the add — missing data is reported in `warnings` instead.
 */
export const POST = withAdmin(async (req) => {
  const body = await req.json();
  const name = String(body.name || '').trim();
  if (!name) return error('Country name is required', 400);

  const db = await getDb();
  const exists = await db.collection(COLLECTIONS.countries).findOne({ name });
  if (exists) return error(`"${name}" already exists`, 409);

  const looked = await buildCountry(name);
  if (looked.error) {
    const hint = looked.suggestions?.length ? ` Did you mean ${looked.suggestions.join(', ')}?` : '';
    return NextResponse.json({ error: `${looked.error}${hint}`, suggestions: looked.suggestions }, { status: 400 });
  }
  const { fields, warnings } = looked;

  const last = await db.collection(COLLECTIONS.countries).find({}).sort({ order: -1 }).limit(1).toArray();

  const doc = {
    name,
    displayName: body.displayName || fields.displayName,
    flag: body.flag || fields.flag,
    continent: body.continent || fields.continent,
    capital: body.capital || fields.capital,
    area: body.area || fields.area,
    population: body.population || fields.population,
    greeting: body.greeting || fields.greeting,
    mapCenter: Array.isArray(body.mapCenter) ? body.mapCenter.map(Number) : fields.mapCenter,
    mapZoom: Number(body.mapZoom) || fields.mapZoom,
    lat: body.lat !== undefined ? Number(body.lat) : fields.lat,
    lng: body.lng !== undefined ? Number(body.lng) : fields.lng,
    visited: body.visited !== false,
    order: (last[0]?.order ?? -1) + 1,
  };

  const res = await db.collection(COLLECTIONS.countries).insertOne(doc);
  revalidate(TAGS.countries);
  return json({ id: String(res.insertedId), ...doc, warnings }, 201);
});
