'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { ArrowLeft, ArrowRight, CloudUpload, Plus, Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminShell from './AdminShell';
import { Alert, Button, Card, LoadingBlock, Select, useAdminDialogs } from './ui';

/**
 * Gallery photo manager.
 *
 * Photos seeded from the original repo keep their jsDelivr URLs (badged "cdn");
 * anything uploaded here goes to ImgBB and is badged "imgbb".
 *
 * Images can be dropped straight onto the grid as well as chosen with the
 * upload button.
 */
const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');

export default function PhotosManager() {
  const router = useRouter();
  const fileInput = useRef(null);
  const { confirm, prompt, dialog } = useAdminDialogs();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(null);
  const [dragging, setDragging] = useState(false);

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

    const targetCity =
      city ||
      (await prompt({
        title: 'Which city are these from?',
        label: 'City name',
        placeholder: 'e.g. Vasteras',
        hint: 'Folder-style, without accents.',
      }));
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
    const ok = await confirm({
      title: 'Remove this photo?',
      message: 'It disappears from the gallery straight away. The image file itself is not deleted from its host.',
      confirmLabel: 'Remove',
      danger: true,
    });
    if (!ok) return;
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

  const addCity = async () => {
    const name = await prompt({
      title: 'New city',
      label: 'City name',
      placeholder: 'e.g. Vasteras',
      hint: 'Folder-style, without accents. You will be asked to choose photos next.',
      confirmLabel: 'Choose photos',
    });
    if (!name) return;
    setCity(name);
    setStatus({ type: 'info', message: `Ready to upload to ${name}. Choose files to continue.` });
    fileInput.current?.click();
  };

  const dropProps = {
    onDragEnter: (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setDragging(true);
    },
    onDragOver: (e) => {
      if (hasFiles(e)) e.preventDefault();
    },
    // Leaving for a child element also fires dragleave; only clear when the
    // pointer has actually left the drop area.
    onDragLeave: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false);
    },
    onDrop: (e) => {
      e.preventDefault();
      setDragging(false);
      const files = [...e.dataTransfer.files].filter((f) => f.type.startsWith('image/'));
      if (files.length) upload(files);
    },
  };

  return (
    <AdminShell title="Photos" subtitle="Upload, reorder and delete gallery images">
      {status && <Alert type={status.type}>{status.message}</Alert>}

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
        <div className="admin-actions">
          <Button onClick={addCity}>
            <Plus size={16} aria-hidden="true" /> New city
          </Button>
          <Button variant="primary" onClick={() => fileInput.current?.click()} disabled={!country || Boolean(progress)}>
            {progress ? <span className="admin-spinner" aria-hidden="true" /> : <Upload size={16} aria-hidden="true" />}
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
        {progress && <div className="field-hint">{progress.name}</div>}
      </Card>

      <Card
        title={city ? `${cities.find((c) => c.city === city)?.label || city} — ${cityPhotos.length} photo(s)` : 'Photos'}
        hint="Order here is the order on the site. Hover or focus a photo for its controls, or drop images onto this panel to add them."
      >
        <div className={`admin-dropzone${dragging ? ' is-dragging' : ''}`} {...dropProps}>
          {dragging && (
            <div className="admin-dropzone__hint" aria-hidden="true">
              <CloudUpload size={28} />
              <span>Drop images to add them{city ? ` to ${city}` : ''}</span>
            </div>
          )}

          {loading && <LoadingBlock label="Loading photos" />}
          {!loading && cityPhotos.length === 0 && (
            <div className="admin-empty">No photos in this city yet. Upload some above, or drop them here.</div>
          )}

          {!loading && cityPhotos.length > 0 && (
            <div className="admin-photo-grid">
              {cityPhotos.map((photo, index) => (
                <div className="admin-photo" key={photo.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.thumb || photo.src} alt={photo.fileName || `Photo ${index + 1}`} loading="lazy" />
                  <span className="badge-src">{photo.source || 'cdn'}</span>
                  <div className="admin-photo__bar">
                    <span className="name">{photo.fileName || `#${index + 1}`}</span>
                    <div className="row">
                      <Button size="sm" className="icon-only" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move earlier" title="Move earlier">
                        <ArrowLeft size={16} />
                      </Button>
                      <Button
                        size="sm"
                        className="icon-only"
                        onClick={() => move(index, 1)}
                        disabled={index === cityPhotos.length - 1}
                        aria-label="Move later"
                        title="Move later"
                      >
                        <ArrowRight size={16} />
                      </Button>
                      <Button size="sm" variant="danger" className="icon-only" onClick={() => remove(photo)} aria-label="Delete photo" title="Delete">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {dialog}
    </AdminShell>
  );
}
