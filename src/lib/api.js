import 'server-only';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdmin } from './session';
import { TAGS } from './content';

/** Drops the cached database reads behind the given tags so the site updates. */
export function revalidate(...tags) {
  for (const tag of tags.length ? tags : Object.values(TAGS)) revalidateTag(tag);
}

export { TAGS };

export const json = (data, status = 200) => NextResponse.json(data, { status });

export const error = (message, status = 400) => NextResponse.json({ error: message }, { status });

/**
 * Wraps an admin route handler with session enforcement and error mapping, so
 * every handler can just throw.
 */
export function withAdmin(handler) {
  return async (req, ctx) => {
    try {
      await requireAdmin();
      return await handler(req, ctx);
    } catch (err) {
      const status = err.status || 500;
      if (status === 500) console.error('[api]', err);
      return error(status === 500 ? 'Internal server error' : err.message, status);
    }
  };
}
