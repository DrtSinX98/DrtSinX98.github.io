import { ObjectId } from 'mongodb';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';

export const runtime = 'nodejs';

const EDITABLE = [
  'name',
  'displayName',
  'flag',
  'continent',
  'capital',
  'area',
  'population',
  'greeting',
  'mapCenter',
  'mapZoom',
  'lat',
  'lng',
  'visited',
  'order',
];

const toId = (id) => {
  if (!ObjectId.isValid(id)) {
    const err = new Error('Invalid country id');
    err.status = 400;
    throw err;
  }
  return new ObjectId(id);
};

export const PUT = withAdmin(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  const db = await getDb();

  const current = await db.collection(COLLECTIONS.countries).findOne({ _id: toId(id) });
  if (!current) return error('Country not found', 404);

  const update = {};
  for (const field of EDITABLE) {
    if (body[field] === undefined) continue;
    if (field === 'mapCenter') update[field] = (body[field] || []).map(Number);
    else if (['mapZoom', 'lat', 'lng', 'order'].includes(field)) update[field] = Number(body[field]);
    else if (field === 'visited') update[field] = Boolean(body[field]);
    else update[field] = body[field];
  }

  await db.collection(COLLECTIONS.countries).updateOne({ _id: toId(id) }, { $set: update });

  // Photos are keyed by country name, so a rename has to cascade.
  if (update.name && update.name !== current.name) {
    await db
      .collection(COLLECTIONS.photos)
      .updateMany({ country: current.name }, { $set: { country: update.name } });
  }

  revalidate(TAGS.countries, TAGS.photos);
  return json({ id, ...current, ...update });
});

export const DELETE = withAdmin(async (_req, { params }) => {
  const { id } = await params;
  const db = await getDb();

  const country = await db.collection(COLLECTIONS.countries).findOne({ _id: toId(id) });
  if (!country) return error('Country not found', 404);

  const photos = await db.collection(COLLECTIONS.photos).countDocuments({ country: country.name });
  if (photos > 0) {
    return error(`${country.name} still has ${photos} photo(s). Delete them first.`, 409);
  }

  await db.collection(COLLECTIONS.countries).deleteOne({ _id: toId(id) });
  revalidate(TAGS.countries);
  return json({ ok: true });
});
