import { getContent, saveContent } from '@/lib/content';
import { CONTENT_DEFAULTS } from '@/lib/defaults';
import { json, error, withAdmin, revalidate, TAGS } from '@/lib/api';

export const runtime = 'nodejs';

const VALID_KEYS = Object.keys(CONTENT_DEFAULTS);

export const GET = withAdmin(async (_req, { params }) => {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) return error(`Unknown content section "${key}"`, 404);
  return json({ key, data: await getContent(key) });
});

export const PUT = withAdmin(async (req, { params }) => {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) return error(`Unknown content section "${key}"`, 404);

  const body = await req.json();
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return error('Body must be a content object', 400);
  }

  await saveContent(key, body);
  revalidate(TAGS.content);
  return json({ key, data: body });
});

/** Restores a section to the values the site shipped with. */
export const DELETE = withAdmin(async (_req, { params }) => {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) return error(`Unknown content section "${key}"`, 404);

  const data = CONTENT_DEFAULTS[key];
  await saveContent(key, data);
  revalidate(TAGS.content);
  return json({ key, data });
});
