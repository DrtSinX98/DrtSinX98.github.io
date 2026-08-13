'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Loads one content section, tracks unsaved edits, and writes it back.
 *
 * The whole section document is saved at once, which is why every component of
 * a page is edited on a single screen behind one save button — partial saves
 * would let one tab clobber another's changes.
 */
export default function useContentEditor(section) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/${section}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Could not load content');
      setData(json.data);
      setOriginal(JSON.stringify(json.data));
      setStatus({ type: 'idle', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = useMemo(
    () => data !== null && original !== null && JSON.stringify(data) !== original,
    [data, original],
  );

  // Guard against losing edits to a stray reload or tab close.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  /** `set('terminal.title', 'x')` or `set({ brand: 'x' })`. */
  const set = useCallback((pathOrPatch, value) => {
    setData((prev) => {
      if (typeof pathOrPatch === 'object') return { ...prev, ...pathOrPatch };

      const keys = String(pathOrPatch).split('.');
      const next = { ...prev };
      let cursor = next;
      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i];
        cursor[key] = Array.isArray(cursor[key]) ? [...cursor[key]] : { ...(cursor[key] || {}) };
        cursor = cursor[key];
      }
      cursor[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Could not save');
      setOriginal(JSON.stringify(data));
      setStatus({ type: 'saved', message: 'Saved. The live site is updated.' });
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  }, [section, data, router]);

  const reset = useCallback(() => {
    if (original) setData(JSON.parse(original));
    setStatus({ type: 'idle', message: '' });
  }, [original]);

  const restoreDefaults = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${section}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Could not restore');
      setData(json.data);
      setOriginal(JSON.stringify(json.data));
      setStatus({ type: 'saved', message: 'Restored the original site content.' });
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  }, [section, router]);

  return { data, set, setData, loading, saving, dirty, status, save, reset, restoreDefaults };
}
