#!/usr/bin/env node
/**
 * Seed MongoDB from the pre-migration site content.
 *
 *   npm run seed            # insert anything missing, leave existing docs alone
 *   npm run seed -- --force # overwrite every content document with the defaults
 *
 * Gallery photos are seeded with jsDelivr URLs that point at the images already
 * committed to this repo, so the gallery looks identical on day one. New uploads
 * made from the admin panel go to ImgBB.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { CONTENT_DEFAULTS, defaultCountries, cityDisplayNames } from '../src/lib/defaults.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(ROOT, '.env.local') });
dotenv.config({ path: path.join(ROOT, '.env') });

const FORCE = process.argv.includes('--force');
const GALLERY_ROOT = path.join(ROOT, 'src/images/gallery');
const DIMENSIONS_FILE = path.join(ROOT, 'scripts/legacy/galleryDimensions.json');

// jsDelivr mirror of this repo's `main` branch — same CDN the Vite build used.
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/DrtSinX98/DrtSinX98.github.io@main/src/images/gallery';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'vortex';
if (!uri) {
  console.error('MONGODB_URI is not set. Create .env.local first.');
  process.exit(1);
}

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

/** Walk `src/images/gallery/<Country>/<City>/*.webp` into photo documents. */
function collectPhotos() {
  if (!fs.existsSync(GALLERY_ROOT)) {
    console.warn(`! ${GALLERY_ROOT} not found — skipping photo seed`);
    return [];
  }

  const dimensions = fs.existsSync(DIMENSIONS_FILE)
    ? JSON.parse(fs.readFileSync(DIMENSIONS_FILE, 'utf8'))
    : {};

  const photos = [];
  for (const country of fs.readdirSync(GALLERY_ROOT).sort(naturalSort)) {
    const countryDir = path.join(GALLERY_ROOT, country);
    if (!fs.statSync(countryDir).isDirectory()) continue;

    for (const city of fs.readdirSync(countryDir).sort(naturalSort)) {
      const cityDir = path.join(countryDir, city);
      if (!fs.statSync(cityDir).isDirectory()) continue;

      const files = fs
        .readdirSync(cityDir)
        .filter((f) => /\.(webp|jpe?g|png|gif)$/i.test(f))
        .sort(naturalSort);

      files.forEach((file, index) => {
        const dims = dimensions[`../images/gallery/${country}/${city}/${file}`] || {};
        photos.push({
          country,
          city,
          cityDisplay: cityDisplayNames[city] || city,
          src: `${CDN_BASE}/${encodeURIComponent(country)}/${encodeURIComponent(city)}/${encodeURIComponent(file)}`,
          width: dims.width || 800,
          height: dims.height || 600,
          order: index,
          source: 'cdn',
          fileName: file,
          createdAt: new Date(),
        });
      });
    }
  }
  return photos;
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  console.log(`→ connected to "${dbName}"`);

  // ---- content sections -----------------------------------------------------
  for (const [key, data] of Object.entries(CONTENT_DEFAULTS)) {
    const existing = await db.collection('content').findOne({ key });
    if (existing && !FORCE) {
      console.log(`  content/${key}: exists, skipped`);
      continue;
    }
    await db
      .collection('content')
      .updateOne({ key }, { $set: { key, data, updatedAt: new Date() } }, { upsert: true });
    console.log(`  content/${key}: ${existing ? 'overwritten' : 'created'}`);
  }

  // ---- backfills ------------------------------------------------------------
  // Non-destructive top-ups for documents written before a field existed.
  // Safe to re-run; only fills in what is missing.
  const siteDoc = await db.collection('content').findOne({ key: 'site' });
  if (siteDoc?.data?.nav) {
    const defaultIcons = Object.fromEntries(
      CONTENT_DEFAULTS.site.nav.map((item) => [item.key || item.href, item.icon]),
    );
    let filled = 0;
    const nav = siteDoc.data.nav.map((item) => {
      if (item.icon) return item;
      const icon = defaultIcons[item.key] || defaultIcons[item.href];
      if (!icon) return item;
      filled += 1;
      return { ...item, icon };
    });
    if (filled) {
      await db
        .collection('content')
        .updateOne({ key: 'site' }, { $set: { 'data.nav': nav, updatedAt: new Date() } });
      console.log(`  backfill: added icons to ${filled} navigation item(s)`);
    }
  }

  // ---- countries ------------------------------------------------------------
  const countryCount = await db.collection('countries').countDocuments();
  if (countryCount === 0 || FORCE) {
    await db.collection('countries').deleteMany({});
    await db.collection('countries').insertMany(defaultCountries.map((c) => ({ ...c })));
    await db.collection('countries').createIndex({ name: 1 }, { unique: true });
    console.log(`  countries: seeded ${defaultCountries.length}`);
  } else {
    console.log(`  countries: ${countryCount} exist, skipped`);
  }

  // ---- photos ---------------------------------------------------------------
  const photoCount = await db.collection('photos').countDocuments();
  if (photoCount === 0 || FORCE) {
    const photos = collectPhotos();
    if (photos.length) {
      await db.collection('photos').deleteMany({});
      await db.collection('photos').insertMany(photos);
      await db.collection('photos').createIndex({ country: 1, city: 1, order: 1 });
      const cities = new Set(photos.map((p) => `${p.country}/${p.city}`));
      console.log(`  photos: seeded ${photos.length} across ${cities.size} cities`);
    }
  } else {
    console.log(`  photos: ${photoCount} exist, skipped`);
  }

  // ---- admin credentials ----------------------------------------------------
  const settings = await db.collection('settings').findOne({ key: 'admin' });
  if (!settings || FORCE) {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      console.warn('  ! ADMIN_PASSWORD not set — skipping admin credential seed');
    } else {
      await db.collection('settings').updateOne(
        { key: 'admin' },
        { $set: { key: 'admin', passwordHash: bcrypt.hashSync(password, 10), updatedAt: new Date() } },
        { upsert: true },
      );
      console.log('  settings/admin: password hash stored');
    }
  } else {
    console.log('  settings/admin: exists, skipped');
  }

  // ---- messages index -------------------------------------------------------
  await db.collection('messages').createIndex({ createdAt: -1 });

  console.log('\n✓ seed complete');
} catch (err) {
  console.error('\n✗ seed failed:', err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
