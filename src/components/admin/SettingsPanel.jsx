'use client';

import React, { useState } from 'react';
import AdminShell from './AdminShell';
import { Card, Text, Button } from './ui';

export default function SettingsPanel() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
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
      {status && <div className={`admin-alert ${status.type}`}>{status.message}</div>}

      <Card
        title="Change password"
        hint="Stored as a bcrypt hash in MongoDB. The ADMIN_PASSWORD environment variable is only used before a password has ever been set."
      >
        <div style={{ maxWidth: 420 }}>
          <Text label="Current password" type="password" value={currentPassword} onChange={setCurrentPassword} />
          <Text
            label="New password"
            type="password"
            hint="At least 8 characters."
            value={newPassword}
            onChange={setNewPassword}
          />
          <Text label="Confirm new password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
          <Button variant="primary" onClick={submit} disabled={busy || !currentPassword || !newPassword}>
            {busy ? <span className="admin-spinner" /> : null}
            {busy ? 'Saving…' : 'Update password'}
          </Button>
        </div>
      </Card>

      <Card title="Environment" hint="Set these in Vercel → Project → Settings → Environment Variables.">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>MONGODB_URI</code></td>
              <td>Atlas connection string for all content, photos and messages.</td>
            </tr>
            <tr>
              <td><code>MONGODB_DB</code></td>
              <td>Database name. Defaults to <code>vortex</code>.</td>
            </tr>
            <tr>
              <td><code>JWT_SECRET</code></td>
              <td>Signs the admin session cookie. Changing it signs everyone out.</td>
            </tr>
            <tr>
              <td><code>ADMIN_PASSWORD</code></td>
              <td>Bootstrap password, used only until a hash exists in the database.</td>
            </tr>
            <tr>
              <td><code>IMGBB_API_KEY</code></td>
              <td>Destination for every image uploaded from this panel.</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </AdminShell>
  );
}
