/**
 * Fills in a country from open data, so adding one in the admin panel is "pick a
 * name" rather than typing thirteen fields.
 *
 * Three sources, all keyless:
 *   - the world-atlas map the globe already draws (country names, and the
 *     outline, from which the map centre and zoom are computed);
 *   - the open `mledoze/countries` dataset (official name, flag, capital,
 *     region, area, languages);
 *   - the World Bank API (the capital's coordinates and the latest population).
 *
 * The name must be one the *map* knows, because that is the string the globe
 * matches on. The picker only offers those, so it can't be mistyped.
 *
 * Nothing here is "server-only" or Next-specific on purpose, so it can be run
 * and tested with plain node.
 */
import { feature } from 'topojson-client';
import { greetingFor } from './greetings.js';

const ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const DATASET_URL = 'https://cdn.jsdelivr.net/gh/mledoze/countries@master/dist/countries.json';
const WORLD_BANK = 'https://api.worldbank.org/v2';

const DAY = 24 * 60 * 60 * 1000;

/* ------------------------------------------------------------------ plumbing */

const memo = new Map();

/** Remembers a result (and shares an in-flight request); a failure isn't remembered. */
function remember(key, ttlMs, load) {
  const hit = memo.get(key);
  if (hit && hit.expires > Date.now()) return hit.promise;

  const promise = load().catch((err) => {
    memo.delete(key);
    throw err;
  });
  memo.set(key, { promise, expires: Date.now() + ttlMs });
  return promise;
}

async function getJson(url, timeoutMs = 10000) {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${new URL(url).hostname} answered ${res.status}`);
  return res.json();
}

const norm = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/* --------------------------------------------------------------------- atlas */

const mercatorY = (latDeg) => Math.log(Math.tan(Math.PI / 4 + (latDeg * Math.PI) / 360));

/** Bounding box of a polygon's outer ring: [minLon, minLat, maxLon, maxLat]. */
function ringBox(ring) {
  let [minLon, minLat, maxLon, maxLat] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLon, minLat, maxLon, maxLat];
}

/**
 * The box of a country's *largest* piece. Taking the whole country would frame
 * Alaska with the lower 48, or the Pacific islands with Fiji across the
 * antimeridian; the mainland is what you want to look at.
 */
function mainlandBox(geometry) {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  let best = null;
  let bestArea = -1;
  for (const poly of polygons) {
    const box = ringBox(poly[0]);
    const area = (box[2] - box[0]) * (box[3] - box[1]);
    if (area > bestArea) {
      best = box;
      bestArea = area;
    }
  }
  return best;
}

/** Every country on the map, with the box of its mainland. */
export function getAtlas() {
  return remember('atlas', DAY, async () => {
    const topology = await getJson(ATLAS_URL);
    const { features } = feature(topology, topology.objects.countries);
    return features
      .filter((f) => f.properties?.name && f.geometry)
      .map((f) => ({ name: f.properties.name, box: mainlandBox(f.geometry) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
}

/**
 * Where to point the map and how far to zoom so the country fills its frame.
 *
 * `span` is the larger of the mainland's width and its *Mercator* height
 * (Mercator stretches the north, which is why Sweden needs less zoom than
 * Poland despite similar areas), in degrees.
 *
 * The zoom is `20 * span^-0.54`, a power law fitted to the zoom levels chosen by
 * hand for the original fourteen non-extreme countries: it lands within 0.43 of
 * a level on average and never more than one off. (A plain 1/span was tried
 * first and was badly wrong — far too low for India, far too high for Estonia —
 * because hand-picked zooms grow more slowly than size shrinks.) Qatar, hand-set
 * to an extreme 20, comes out at 15; that is the kind of case to fine-tune in
 * the editor.
 */
export function mapFraming([minLon, minLat, maxLon, maxLat]) {
  const lonSpan = maxLon - minLon;
  const latSpan = ((mercatorY(maxLat) - mercatorY(minLat)) * 180) / Math.PI;
  const span = Math.max(lonSpan, latSpan, 0.01);
  const round = (n) => Math.round(n * 10000) / 10000;
  return {
    center: [round((minLon + maxLon) / 2), round((minLat + maxLat) / 2)],
    zoom: Math.min(20, Math.max(1, Math.round(20 * span ** -0.54))),
  };
}

/* ------------------------------------------------------------------- dataset */

/**
 * The map abbreviates some names ("Dem. Rep. Congo", "Eq. Guinea") that the
 * dataset spells out. Maps the atlas name to the dataset's name.
 */
const ALIASES = {
  // The dataset has renamed it; the map still says "Turkey".
  Turkey: 'Türkiye',
  'United States of America': 'United States',
  'Dem. Rep. Congo': 'DR Congo',
  Congo: 'Republic of the Congo',
  'Central African Rep.': 'Central African Republic',
  'Bosnia and Herz.': 'Bosnia and Herzegovina',
  'Dominican Rep.': 'Dominican Republic',
  'Eq. Guinea': 'Equatorial Guinea',
  'S. Sudan': 'South Sudan',
  'Solomon Is.': 'Solomon Islands',
  'W. Sahara': 'Western Sahara',
  'Falkland Is.': 'Falkland Islands',
  'Fr. S. Antarctic Lands': 'French Southern and Antarctic Lands',
  Macedonia: 'North Macedonia',
  eSwatini: 'Eswatini',
  "Côte d'Ivoire": 'Ivory Coast',
  Korea: 'South Korea',
  'Dem. Rep. Korea': 'North Korea',
};

export function getDataset() {
  return remember('dataset', DAY, async () => {
    const all = await getJson(DATASET_URL, 20000);
    // Keep only what is used; the full file is ~800 kB.
    return all.map((c) => ({
      cca2: c.cca2,
      common: c.name?.common,
      official: c.name?.official,
      alt: c.altSpellings || [],
      flag: c.flag,
      capital: Array.isArray(c.capital) ? c.capital[0] : c.capital,
      region: c.region,
      subregion: c.subregion,
      area: c.area,
      latlng: c.latlng,
      languages: c.languages || {},
    }));
  });
}

export function matchCountry(atlasName, dataset) {
  const wanted = [ALIASES[atlasName], atlasName].filter(Boolean).map(norm);

  for (const target of wanted) {
    const exact = dataset.find(
      (c) => norm(c.common) === target || norm(c.official) === target || c.alt.some((a) => norm(a) === target),
    );
    if (exact) return exact;
  }
  // Last resort: one contains the other (e.g. "Bosnia and Herz." vs a longer form).
  const target = wanted[wanted.length - 1];
  return dataset.find((c) => norm(c.common).startsWith(target) || target.startsWith(norm(c.common))) || null;
}

/** "Europe", "Asia"… The dataset lumps both Americas together; split them. */
function continentOf(rec) {
  if (!rec?.region) return '';
  if (rec.region === 'Americas') return /south/i.test(rec.subregion || '') ? 'South America' : 'North America';
  if (rec.region === 'Antarctic') return 'Antarctica';
  return rec.region;
}

/* ---------------------------------------------------------------- formatting */

const formatArea = (km2) => (km2 ? `${Math.round(km2).toLocaleString('en-US')} km²` : '');

/** "1.4 Billion", "10.6 Million", "812,000" — the style the globe already uses. */
export function formatPopulation(n) {
  if (!n) return '';
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} Billion`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} Million`;
  return Math.round(n).toLocaleString('en-US');
}

/* ---------------------------------------------------------------- World Bank */

async function worldBankFacts(cca2) {
  const [country, population] = await Promise.all([
    getJson(`${WORLD_BANK}/country/${cca2}?format=json`, 8000),
    getJson(`${WORLD_BANK}/country/${cca2}/indicator/SP.POP.TOTL?format=json&mrnev=1`, 8000),
  ]);
  const c = country?.[1]?.[0];
  const lat = Number(c?.latitude);
  const lng = Number(c?.longitude);
  return {
    capitalLatLng: Number.isFinite(lat) && Number.isFinite(lng) && c?.latitude !== '' ? [lat, lng] : null,
    population: population?.[1]?.[0]?.value ?? null,
  };
}

/* ---------------------------------------------------------------- public API */

/** Names on the map, for the picker. */
export async function listMapCountries() {
  return (await getAtlas()).map((c) => c.name);
}

/** Levenshtein distance: how many single-character edits turn `a` into `b`. */
function editDistance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    for (let j = 1; j <= b.length; j += 1) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = row;
  }
  return prev[b.length];
}

/** Prefix matches, then substring matches, then near-misses ("Netherlnds"). */
function suggest(name, names) {
  const q = norm(name);
  if (!q) return [];
  const starts = names.filter((n) => norm(n).startsWith(q));
  const includes = names.filter((n) => !starts.includes(n) && norm(n).includes(q));
  const tolerance = Math.max(2, Math.floor(q.length / 4));
  const near = names
    .filter((n) => !starts.includes(n) && !includes.includes(n))
    .map((n) => ({ n, d: editDistance(q, norm(n)) }))
    .filter(({ d }) => d <= tolerance)
    .sort((x, y) => x.d - y.d)
    .map(({ n }) => n);
  return [...starts, ...includes, ...near].slice(0, 5);
}

/**
 * Everything the countries collection stores, ready to insert.
 *
 * Resolves to `{ fields, warnings }`, or `{ error, suggestions }` when the name
 * isn't on the map. Missing data never throws: whatever couldn't be found is
 * left blank and reported in `warnings`, so a lookup that half-works still gives
 * the admin a country to finish by hand.
 */
export async function buildCountry(name) {
  const atlas = await getAtlas();
  const entry = atlas.find((c) => c.name === name);
  if (!entry) {
    return { error: `"${name}" is not a country on the map.`, suggestions: suggest(name, atlas.map((c) => c.name)) };
  }

  const warnings = [];
  const framing = mapFraming(entry.box);

  let rec = null;
  try {
    rec = matchCountry(name, await getDataset());
  } catch {
    warnings.push('The country dataset could not be reached, so only the map position was filled in.');
  }
  if (!rec && warnings.length === 0) {
    warnings.push(`No facts found for "${name}" — only the map position was filled in.`);
  }

  // The dataset's point is the country's centre, which is a fair stand-in for
  // the weather location when the capital's coordinates can't be fetched.
  let weatherPoint = rec?.latlng || [framing.center[1], framing.center[0]];
  let population = null;

  if (rec?.cca2) {
    try {
      const wb = await worldBankFacts(rec.cca2);
      if (wb.capitalLatLng) weatherPoint = wb.capitalLatLng;
      population = wb.population;
    } catch {
      warnings.push('The World Bank could not be reached, so population is blank and the weather uses an approximate location.');
    }
    if (population === null && !warnings.some((w) => w.includes('World Bank'))) {
      warnings.push('No population figure is published for this country.');
    }
  }

  return {
    fields: {
      name,
      displayName: rec?.official || name,
      flag: rec?.flag || '🌍',
      continent: continentOf(rec),
      capital: rec?.capital || '',
      area: formatArea(rec?.area),
      population: formatPopulation(population),
      greeting: rec ? greetingFor(rec.languages, rec.cca2) : '',
      mapCenter: framing.center,
      mapZoom: framing.zoom,
      lat: weatherPoint[0],
      lng: weatherPoint[1],
    },
    warnings,
  };
}
