'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Save, Sparkles, Trash2 } from 'lucide-react';
import AdminShell from './AdminShell';
import { Alert, Button, Card, CollapsibleItem, LoadingBlock, Switch, Text, useAdminDialogs } from './ui';

/**
 * CRUD for the countries shown on the globe.
 *
 * `name` must match the country name in the world-atlas topology (the same
 * string react-simple-maps exposes as `geo.properties.name`) or the country
 * won't highlight — hence the warning in the form.
 *
 * Each country is a collapsed row: there are a dozen-plus of them with thirteen
 * fields apiece, which made the page a very long scroll when they were all open.
 */
export default function CountriesManager() {
  const router = useRouter();
  const { confirm, prompt, dialog } = useAdminDialogs();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [fillingId, setFillingId] = useState(null);
  // The country just added: it opens expanded and is scrolled into view, so the
  // auto-filled values can be reviewed straight away.
  const [justAdded, setJustAdded] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/countries', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setCountries(json);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!justAdded) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(`country-${justAdded}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }, [justAdded]);

  const patch = (id, changes) =>
    setCountries((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)));

  const saveOne = async (country) => {
    setSavingId(country.id);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/countries/${country.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(country),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStatus({ type: 'success', message: `Saved ${country.name}.` });
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (country) => {
    const ok = await confirm({
      title: `Remove ${country.name}?`,
      message: 'It stops lighting up on the globe. A country that still has photos cannot be removed — delete those first.',
      confirmLabel: 'Remove',
      danger: true,
    });
    if (!ok) return;

    setSavingId(country.id);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/countries/${country.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setCountries((prev) => prev.filter((c) => c.id !== country.id));
      setStatus({ type: 'success', message: `Removed ${country.name}.` });
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSavingId(null);
    }
  };

  /** The API puts its "did you mean…" suggestions inside `error` already. */
  const apiError = (json, fallback) => new Error(json?.error || fallback);

  const add = async () => {
    // Offer only the names the map knows: that is what makes a new country light
    // up on the globe, and it replaces typing one in exactly right.
    let options = [];
    try {
      const res = await fetch('/api/admin/countries/catalog', { cache: 'no-store' });
      if (res.ok) options = (await res.json()).names || [];
    } catch {
      /* the picker still works as a free-text field */
    }

    const name = await prompt({
      title: 'Add a country',
      label: 'Country',
      placeholder: 'Start typing, e.g. Netherlands',
      hint: 'Pick from the list so the name matches the map. Everything else — flag, capital, area, population, greeting and its place on the map — is filled in for you.',
      options,
      confirmLabel: 'Add country',
    });
    if (!name) return;

    setStatus({ type: 'info', message: `Looking up ${name}…` });
    try {
      const res = await fetch('/api/admin/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok) throw apiError(json, 'Could not add the country');

      const { warnings = [], ...country } = json;
      setCountries((prev) => [...prev, country]);
      setJustAdded(country.id);
      setStatus(
        warnings.length
          ? { type: 'info', message: `Added ${name}, but: ${warnings.join(' ')} Fill in anything missing below.` }
          : { type: 'success', message: `Added ${name} with its details filled in. Review them below and edit anything you like.` },
      );
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  /**
   * Fills an existing country from the same lookup. Nothing is saved until the
   * admin presses Save, so it is safe to try — but it does overwrite what is in
   * the form, hence the confirmation.
   */
  const autofill = async (country) => {
    const ok = await confirm({
      title: `Fill in ${country.name}?`,
      message: 'Replaces its details with freshly looked-up data. Nothing is saved until you press Save, but anything you have edited by hand in this form will be overwritten.',
      confirmLabel: 'Fill in',
    });
    if (!ok) return;

    setFillingId(country.id);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/countries/lookup?name=${encodeURIComponent(country.name)}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw apiError(json, 'Lookup failed');

      // Keep the name the map matches on; refresh everything else.
      const { name: _name, ...fields } = json.fields;
      patch(country.id, fields);
      setStatus(
        json.warnings?.length
          ? { type: 'info', message: `Filled in ${country.name}, but: ${json.warnings.join(' ')}` }
          : { type: 'success', message: `Filled in ${country.name}. Check the values, then press Save to keep them.` },
      );
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setFillingId(null);
    }
  };

  return (
    <AdminShell title="Countries" subtitle="Highlighted on the globe, with the facts shown above each photo set">
      {status && <Alert type={status.type}>{status.message}</Alert>}

      <Card
        title={`${countries.length} countries`}
        hint="Pick a country and the rest is filled in for you: flag, capital, area, population, greeting and its place on the map. Every value stays editable."
        actions={
          <Button variant="primary" onClick={add}>
            <Plus size={16} aria-hidden="true" /> Add country
          </Button>
        }
      >
        {loading && <LoadingBlock label="Loading countries" />}

        {!loading &&
          countries.map((country) => (
            <CollapsibleItem
              key={country.id}
              id={`country-${country.id}`}
              defaultOpen={country.id === justAdded}
              title={
                <>
                  <span className="admin-flag" aria-hidden="true">{country.flag}</span> {country.name}
                </>
              }
              badge={!country.visited ? <span className="index">hidden</span> : null}
              actions={
                <>
                  <Button size="sm" variant="primary" onClick={() => saveOne(country)} disabled={savingId === country.id}>
                    <Save size={16} aria-hidden="true" /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="icon-only"
                    onClick={() => remove(country)}
                    disabled={savingId === country.id}
                    aria-label={`Delete ${country.name}`}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </Button>
                </>
              }
            >
              <div className="admin-actions admin-actions--flush">
                <Button size="sm" onClick={() => autofill(country)} disabled={fillingId === country.id}>
                  {fillingId === country.id ? <span className="admin-spinner" aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}
                  {fillingId === country.id ? 'Looking up…' : 'Fill from open data'}
                </Button>
                <span className="field-hint">Looks up the flag, capital, area, population, greeting and map position.</span>
              </div>
              <div className="admin-grid cols-3">
                <Text label="Map name" value={country.name} onChange={(v) => patch(country.id, { name: v })} />
                <Text label="Full name" value={country.displayName} onChange={(v) => patch(country.id, { displayName: v })} />
                <Text label="Flag emoji" value={country.flag} onChange={(v) => patch(country.id, { flag: v })} />
                <Text label="Continent" value={country.continent} onChange={(v) => patch(country.id, { continent: v })} />
                <Text label="Capital" value={country.capital} onChange={(v) => patch(country.id, { capital: v })} />
                <Text label="Greeting" value={country.greeting} onChange={(v) => patch(country.id, { greeting: v })} />
                <Text label="Area" value={country.area} onChange={(v) => patch(country.id, { area: v })} />
                <Text label="Population" value={country.population} onChange={(v) => patch(country.id, { population: v })} />
                <Text label="Map zoom" type="number" value={country.mapZoom} onChange={(v) => patch(country.id, { mapZoom: v })} />
              </div>
              <div className="admin-grid cols-4">
                <Text
                  label="Map centre — longitude"
                  type="number"
                  step="0.0001"
                  value={country.mapCenter?.[0]}
                  onChange={(v) => patch(country.id, { mapCenter: [v, country.mapCenter?.[1] ?? 0] })}
                />
                <Text
                  label="Map centre — latitude"
                  type="number"
                  step="0.0001"
                  value={country.mapCenter?.[1]}
                  onChange={(v) => patch(country.id, { mapCenter: [country.mapCenter?.[0] ?? 0, v] })}
                />
                <Text label="Weather latitude" type="number" step="0.0001" value={country.lat} onChange={(v) => patch(country.id, { lat: v })} />
                <Text label="Weather longitude" type="number" step="0.0001" value={country.lng} onChange={(v) => patch(country.id, { lng: v })} />
              </div>
              <Switch
                label="Show on the globe"
                checked={country.visited !== false}
                onChange={(v) => patch(country.id, { visited: v })}
              />
            </CollapsibleItem>
          ))}
      </Card>

      {dialog}
    </AdminShell>
  );
}
