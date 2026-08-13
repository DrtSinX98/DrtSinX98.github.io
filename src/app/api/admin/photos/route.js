import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';
import { cityDisplayNames } from '@/lib/defaults';

export const runtime = 'nodejs';

const serialize = ({ _id, ...rest }) => ({ id: String(_id), ...rest });

/** GET /api/admin/photos?country=Sweden[&city=Uppsala] */
export const GET = withAdmin(async (req) => {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country');
  const city = searchParams.get('city');

  const query = {};
  if (country) query.country = country;
  if (city) query.city = city;

  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.photos)
    .find(query)
    .sort({ country: 1, city: 1, order: 1 })
    .toArray();

  return json(docs.map(serialize));
});

/** Adds one or more already-uploaded images to a city. */
export const POST = withAdmin(async (req) => {
  const body = await req.json();
  const country = String(body.country || '').trim();
  const city = String(body.city || '').trim();
  const photos = Array.isArray(body.photos) ? body.photos : [body];

  if (!country || !city) return error('country and city are required', 400);

  const valid = photos.filter((p) => p?.src);
  if (!valid.length) return error('At least one photo with a src is required', 400);

  const db = await getDb();
  const last = await db
    .collection(COLLECTIONS.photos)
    .find({ country, city })
    .sort({ order: -1 })
    .limit(1)
    .toArray();

  let order = (last[0]?.order ?? -1) + 1;
  const cityDisplay = body.cityDisplay || cityDisplayNames[city] || city;

  const docs = valid.map((p) => ({
    country,
    city,
    cityDisplay,
    src: p.src,
    thumb: p.thumb || '',
    width: Number(p.width) || 800,
    height: Number(p.height) || 600,
    order: order++,
    source: p.source || 'imgbb',
    deleteUrl: p.deleteUrl || '',
    fileName: p.fileName || '',
    createdAt: new Date(),
  }));

  const res = await db.collection(COLLECTIONS.photos).insertMany(docs);
  revalidate(TAGS.photos);
  return json(
    docs.map((d, i) => ({ id: String(res.insertedIds[i]), ...d })),
    201,
  );
});
