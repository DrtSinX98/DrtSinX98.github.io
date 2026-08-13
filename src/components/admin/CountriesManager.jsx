'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from './AdminShell';
import { Card, Text, Switch, Button } from './ui';

/**
 * CRUD for the countries shown on the globe.
 *
 * `name` must match the country name in the world-atlas topology (the same
 * string react-simple-maps exposes as `geo.properties.name`) or the country
 * won't highlight — hence the warning in the form.
 */
export default function CountriesManager() {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [savingId, setSavingId] = useState(null);

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

  const add = async () => {
    const name = window.prompt('Country name — must match the map exactly, e.g. "Netherlands"');
    if (!name) return;
    try {
      const res = await fetch('/api/admin/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setCountries((prev) => [...prev, json]);
      setStatus({ type: 'success', message: `Added ${name}. Fill in its details below.` });
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <AdminShell title="Countries" subtitle="Highlighted on the globe, with the facts shown above each photo set">
      {status && <div className={`admin-alert ${status.type}`}>{status.message}</div>}

      <Card
        title={`${countries.length} countries`}
        hint="The name must match the map data exactly, otherwise the country will not light up on the globe."
        actions={<Button variant="primary" onClick={add}>Add country</Button>}
      >
        {loading && <div className="admin-empty">Loading…</div>}

        {!loading &&
          countries.map((country) => (
            <div className="admin-item" key={country.id}>
              <div className="admin-item-head">
                <span style={{ fontSize: '1.2rem' }}>{country.flag}</span>
                <span className="title">{country.name}</span>
                {!country.visited && <span className="index">hidden</span>}
                <div className="admin-item-actions">
                  <Button size="sm" variant="primary" onClick={() => saveOne(country)} disabled={savingId === country.id}>
                    Save
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => remove(country)} disabled={savingId === country.id}>
                    Delete
                  </Button>
                </div>
              </div>
              <div className="admin-item-body">
                <div className="admin-grid cols-3">
                  <Text label="Map name" value={country.name} onChange={(v) => patch(country.id, { name: v })} />
                  <Text label="Full name" value={country.displayName} onChange={(v) => patch(country.id, { displayName: v })} />
                  <Text label="Flag emoji" value={country.flag} onChange={(v) => patch(country.id, { flag: v })} />
                  <Text label="Continent" value={country.continent} onChange={(v) => patch(country.id, { continent: v })} />
                  <Text label="Capital" value={country.capital} onChange={(v) => patch(country.id, { capital: v })} />
                  <Text label="Greeting" value={country.greeting} onChange={(v) => patch(country.id, { greeting: v })} />
                  <Text label="Area" value={country.area} onChange={(v) => patch(country.id, { area: v })} />
                  <Text label="Population" value={country.population} onChange={(v) => patch(country.id, { population: v })} />
                  <Text
                    label="Map zoom"
                    type="number"
                    value={country.mapZoom}
                    onChange={(v) => patch(country.id, { mapZoom: v })}
                  />
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
                  <Text
                    label="Weather latitude"
                    type="number"
                    step="0.0001"
                    value={country.lat}
                    onChange={(v) => patch(country.id, { lat: v })}
                  />
                  <Text
                    label="Weather longitude"
                    type="number"
                    step="0.0001"
                    value={country.lng}
                    onChange={(v) => patch(country.id, { lng: v })}
                  />
                </div>
                <Switch
                  label="Show on the globe"
                  checked={country.visited !== false}
                  onChange={(v) => patch(country.id, { visited: v })}
                />
              </div>
            </div>
          ))}
      </Card>
    </AdminShell>
  );
}
