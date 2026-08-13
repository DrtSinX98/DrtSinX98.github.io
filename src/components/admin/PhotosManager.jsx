'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import AdminShell from './AdminShell';
import { Card, Button, Select } from './ui';

/**
 * Gallery photo manager.
 *
 * Photos seeded from the original repo keep their jsDelivr URLs (badged "cdn");
 * anything uploaded here goes to ImgBB and is badged "imgbb".
 */
export default function PhotosManager() {
  const router = useRouter();
  const fileInput = useRef(null);

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetch('/api/admin/countries', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        setCountries(json);
        if (json[0]) setCountry(json[0].name);
      })
      .catch((err) => setStatus({ type: 'error', message: err.message }));
  }, []);

  const loadPhotos = useCallback(async (forCountry) => {
    if (!forCountry) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/photos?country=${encodeURIComponent(forCountry)}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPhotos(json);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos(country);
  }, [country, loadPhotos]);

  const cities = useMemo(() => {
    const map = new Map();
    for (const p of photos) {
      if (!map.has(p.city)) map.set(p.city, { city: p.city, label: p.cityDisplay || p.city, count: 0 });
      map.get(p.city).count += 1;
    }
    return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [photos]);

  useEffect(() => {
    if (cities.length && !cities.some((c) => c.city === city)) setCity(cities[0].city);
    if (!cities.length) setCity('');
  }, [cities, city]);

  const cityPhotos = photos.filter((p) => p.city === city).sort((a, b) => a.order - b.order);

  const upload = async (files) => {
    const list = [...files];
    if (!list.length || !country) return;

    const targetCity = city || window.prompt('City name for these photos');
    if (!targetCity) return;

    setStatus(null);
    const uploaded = [];

    for (let i = 0; i < list.length; i += 1) {
      setProgress({ done: i, total: list.length, name: list[i].name });
      try {
        const body = new FormData();
        body.append('file', list[i]);
        const res = await fetch('/api/admin/upload', { method: 'POST', body });
        const json = await res.json();
        if (!res.ok) throw new Error(`${list[i].name}: ${json.error}`);
        uploaded.push({ ...json, fileName: list[i].name });
      } catch (err) {
        setStatus({ type: 'error', message: err.message });
      }
    }

    setProgress(null);
    if (!uploaded.length) return;

    try {
      const res = await fetch('/api/admin/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, city: targetCity, photos: uploaded }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStatus({ type: 'success', message: `Added ${uploaded.length} photo(s) to ${targetCity}.` });
      setCity(targetCity);
      await loadPhotos(country);
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const remove = async (photo) => {
    if (!window.confirm('Remove this photo from the gallery?')) return;
    try {
      const res = await fetch(`/api/admin/photos/${photo.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const move = async (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= cityPhotos.length) return;

    const reordered = [...cityPhotos];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    // Optimistic: renumber locally, then persist the new order.
    const orderById = new Map(reordered.map((p, i) => [p.id, i]));
    setPhotos((prev) => prev.map((p) => (orderById.has(p.id) ? { ...p, order: orderById.get(p.id) } : p)));

    try {
      await fetch('/api/admin/photos/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: reordered.map((p) => p.id) }),
      });
      router.refresh();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
      loadPhotos(country);
    }
  };

  const addCity = () => {
    const name = window.prompt('New city name (folder-style, e.g. "Vasteras")');
    if (!name) return;
    setCity(name);
    setStatus({ type: 'info', message: `Ready to upload to ${name}. Choose files below.` });
    fileInput.current?.click();
  };

  return (
    <AdminShell title="Photos" subtitle="Upload, reorder and delete gallery images">
      {status && <div className={`admin-alert ${status.type}`}>{status.message}</div>}

      <Card title="Location">
        <div className="admin-grid cols-2">
          <Select
            label="Country"
            value={country}
            onChange={setCountry}
            options={countries.map((c) => ({ value: c.name, label: `${c.flag} ${c.name}` }))}
          />
          <Select
            label="City"
            value={city}
            onChange={setCity}
            options={
              cities.length
                ? cities.map((c) => ({ value: c.city, label: `${c.label} (${c.count})` }))
                : [{ value: '', label: 'No cities yet' }]
            }
          />
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Button onClick={addCity}>
            <FontAwesomeIcon icon={faPlus} /> New city
          </Button>
          <Button variant="primary" onClick={() => fileInput.current?.click()} disabled={!country || Boolean(progress)}>
            {progress ? <span className="admin-spinner" /> : <FontAwesomeIcon icon={faUpload} />}
            {progress ? `Uploading ${progress.done + 1}/${progress.total}…` : 'Upload photos'}
          </Button>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => upload(e.target.files)}
        />
        {progress && <div className="field-hint mt-2">{progress.name}</div>}
      </Card>

      <Card
        title={city ? `${cities.find((c) => c.city === city)?.label || city} — ${cityPhotos.length} photo(s)` : 'Photos'}
        hint="Order here is the order on the site. Hover a photo for its controls."
      >
        {loading && <div className="admin-empty">Loading…</div>}
        {!loading && cityPhotos.length === 0 && (
          <div className="admin-empty">No photos in this city yet. Upload some above.</div>
        )}

        {!loading && cityPhotos.length > 0 && (
          <div className="admin-photo-grid">
            {cityPhotos.map((photo, index) => (
              <div className="admin-photo" key={photo.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.thumb || photo.src} alt={photo.fileName || ''} loading="lazy" />
                <span className="badge-src">{photo.source || 'cdn'}</span>
                <div className="overlay">
                  <span className="name">{photo.fileName || `#${index + 1}`}</span>
                  <div className="row">
                    <Button size="sm" onClick={() => move(index, -1)} disabled={index === 0} title="Move earlier">
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => move(index, 1)}
                      disabled={index === cityPhotos.length - 1}
                      title="Move later"
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => remove(photo)} title="Delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </AdminShell>
  );
}
