'use client';

import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import AdminShell from './AdminShell';
import { Alert, Card, Text, Button } from './ui';

const ENV = [
  ['MONGODB_URI', 'Atlas connection string for all content, photos and messages.'],
  ['MONGODB_DB', 'Database name. Defaults to vortex.'],
  ['JWT_SECRET', 'Signs the admin session cookie. Changing it signs everyone out.'],
  ['ADMIN_PASSWORD', 'Bootstrap password, used only until a hash exists in the database.'],
  ['IMGBB_API_KEY', 'Destination for every image uploaded from this panel.'],
];

export default function SettingsPanel() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'The new passwords do not match.' });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStatus({ type: 'success', message: 'Password updated. It applies to the next sign-in.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell title="Settings" subtitle="Admin account">
      {status && <Alert type={status.type}>{status.message}</Alert>}

      <Card
        title="Change password"
        hint="Stored as a bcrypt hash in MongoDB. The ADMIN_PASSWORD environment variable is only used before a password has ever been set."
      >
        {/* A real form, so Enter submits and password managers recognise it. */}
        <form className="admin-form-narrow" onSubmit={submit}>
          <Text
            label="Current password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />
          <Text
            label="New password"
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters."
            value={newPassword}
            onChange={setNewPassword}
          />
          <Text
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <Button type="submit" variant="primary" disabled={busy || !currentPassword || !newPassword}>
            {busy ? <span className="admin-spinner" aria-hidden="true" /> : <KeyRound size={16} aria-hidden="true" />}
            {busy ? 'Saving…' : 'Update password'}
          </Button>
        </form>
      </Card>

      <Card title="Environment" hint="Set these in Vercel → Project → Settings → Environment Variables.">
        <div className="admin-tablewrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Variable</th>
                <th scope="col">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {ENV.map(([name, purpose]) => (
                <tr key={name}>
                  <th scope="row">
                    <code>{name}</code>
                  </th>
                  <td>{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminShell>
  );
}
