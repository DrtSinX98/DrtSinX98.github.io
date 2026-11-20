import { NextResponse } from 'next/server';
import { json, error, withAdmin } from '@/lib/api';
import { buildCountry } from '@/lib/countryLookup';

export const runtime = 'nodejs';

/**
 * Looks a country up without saving anything. The editor uses it to fill in a
 * country that was added blank (or by an older version of this panel); the
 * admin then reviews the values and saves as usual.
 */
export const GET = withAdmin(async (req) => {
  const name = new URL(req.url).searchParams.get('name')?.trim();
  if (!name) return error('A country name is required', 400);

  const result = await buildCountry(name);
  if (result.error) {
    return NextResponse.json({ error: result.error, suggestions: result.suggestions }, { status: 404 });
  }
  return json({ fields: result.fields, warnings: result.warnings });
});
