'use client';

import React, { Suspense, useId, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Orbit from '@/components/ui/Orbit';
import { AdminTile } from '@/components/admin/AdminShell';
import AdminThemeToggle from '@/components/admin/AdminThemeToggle';
import { Alert } from '@/components/admin/ui';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const id = useId();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Login failed');

      const next = searchParams.get('next');
      router.replace(next && next.startsWith('/admin') ? next : '/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__theme">
        <AdminThemeToggle />
      </div>

      <div className="admin-login__stage">
        {/* The site's orbit motif, ringing the card. */}
        <Orbit className="admin-login__orbit" />

        <form className="admin-login-card" onSubmit={submit}>
          <AdminTile brand size="lg" />
          <h1>Vortex Admin</h1>
          <p className="sub">Sign in to edit the site.</p>

          {error && <Alert type="error">{error}</Alert>}

          <div className="admin-field">
            <label htmlFor={id}>Password</label>
            <div className="admin-passwordfield">
              <input
                id={id}
                className="admin-input"
                type={reveal ? 'text' : 'password'}
                value={password}
                autoFocus
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="admin-btn icon-only"
                onClick={() => setReveal((v) => !v)}
                aria-label={reveal ? 'Hide password' : 'Show password'}
                aria-pressed={reveal}
              >
                {reveal ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn primary admin-btn--block" disabled={busy || !password}>
            {busy ? <span className="admin-spinner" aria-hidden="true" /> : <LogIn size={16} aria-hidden="true" />}
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="admin-login" />}>
      <LoginForm />
    </Suspense>
  );
}
