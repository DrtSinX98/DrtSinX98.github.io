import 'server-only';
import { unstable_cache } from 'next/cache';
import { getDb, COLLECTIONS } from './mongodb';
import { CONTENT_DEFAULTS, cityDisplayNames, defaultCountries } from './defaults';

/**
 * Cache tags. Pages render per request (so the clock-based greeting and footer
 * year stay correct) but the database reads behind them are cached until an
 * admin write revalidates the matching tag — see `revalidateContent`.
 */
export const TAGS = {
  content: 'content',
  countries: 'countries',
  photos: 'photos',
};

/* ----------------------------------------------------------------- readers */

const readContent = unstable_cache(
  async (key) => {
    const db = await getDb();
    const doc = await db.collection(COLLECTIONS.content).findOne({ key });
    return doc?.data ?? null;
  },
  ['content-section'],
  { tags: [TAGS.content] },
);

const readContentMany = unstable_cache(
  async (keys) => {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTIONS.content)
      .find({ key: { $in: keys } })
      .toArray();
    return Object.fromEntries(docs.map((d) => [d.key, d.data]));
  },
  ['content-sections'],
  { tags: [TAGS.content] },
);

const readCountries = unstable_cache(
  async () => {
    const db = await getDb();
    const docs = await db.collection(COLLECTIONS.countries).find({}).sort({ order: 1 }).toArray();
    return docs.map(({ _id, ...rest }) => ({ ...rest, id: String(_id) }));
  },
  ['countries'],
  { tags: [TAGS.countries] },
);

const readPhotos = unstable_cache(
  async () => {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTIONS.photos)
      .find({}, { projection: { src: 1, width: 1, height: 1, country: 1, city: 1, cityDisplay: 1, order: 1 } })
      .sort({ country: 1, city: 1, order: 1 })
      .toArray();
    return docs.map(({ _id, ...rest }) => rest);
  },
  ['photos'],
  { tags: [TAGS.photos] },
);

/* ------------------------------------------------------------- public API */

/**
 * Read one content section. Falls back to the bundled defaults if the document
 * is missing or the database is unreachable, so the site never renders empty.
 */
export async function getContent(key) {
  const fallback = CONTENT_DEFAULTS[key] ?? {};
  try {
    const data = await readContent(key);
    // Shallow merge keeps newly added default fields available on old documents.
    return data ? { ...fallback, ...data } : fallback;
  } catch (err) {
    console.error(`[content] failed to load "${key}":`, err.message);
    return fallback;
  }
}

/** Read several sections in one round trip. */
export async function getContentMany(keys) {
  try {
    const byKey = await readContentMany(keys);
    return Object.fromEntries(
      keys.map((key) => [key, { ...(CONTENT_DEFAULTS[key] ?? {}), ...(byKey[key] ?? {}) }]),
    );
  } catch (err) {
    console.error('[content] bulk load failed:', err.message);
    return Object.fromEntries(keys.map((key) => [key, CONTENT_DEFAULTS[key] ?? {}]));
  }
}

export async function saveContent(key, data) {
  const db = await getDb();
  await db
    .collection(COLLECTIONS.content)
    .updateOne({ key }, { $set: { key, data, updatedAt: new Date() } }, { upsert: true });
  return data;
}

/** Countries shown on the globe, ordered. */
export async function getCountries() {
  try {
    const docs = await readCountries();
    return docs.length ? docs : defaultCountries;
  } catch (err) {
    console.error('[content] countries load failed:', err.message);
    return defaultCountries;
  }
}

/**
 * All gallery photos grouped as `{ [country]: { [cityLabel]: Photo[] } }`,
 * matching the shape the original Gallery component built from `import.meta.glob`.
 */
export async function getGalleries() {
  const grouped = {};
  try {
    for (const p of await readPhotos()) {
      const city = p.cityDisplay || cityDisplayNames[p.city] || p.city;
      if (!grouped[p.country]) grouped[p.country] = {};
      if (!grouped[p.country][city]) grouped[p.country][city] = [];
      grouped[p.country][city].push({
        src: p.src,
        width: p.width || 800,
        height: p.height || 600,
      });
    }
  } catch (err) {
    console.error('[content] gallery load failed:', err.message);
  }
  return grouped;
}
