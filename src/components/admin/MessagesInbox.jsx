'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Mail, MailOpen, Reply, Trash2 } from 'lucide-react';
import AdminShell from './AdminShell';
import { Card, Button } from './ui';

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setMessages(json.messages);
      setUnread(json.unread);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (message) => {
    const read = !message.read;
    setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, read } : m)));
    setUnread((n) => Math.max(0, n + (read ? -1 : 1)));
    await fetch(`/api/admin/messages/${message.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
  };

  const remove = async (message) => {
    if (!window.confirm(`Delete the message from ${message.name}?`)) return;
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
    if (!message.read) setUnread((n) => Math.max(0, n - 1));
    await fetch(`/api/admin/messages/${message.id}`, { method: 'DELETE' });
  };

  return (
    <AdminShell
      title="Messages"
      subtitle={unread ? `${unread} unread` : 'Submissions from the contact form'}
    >
      {status && <div className={`admin-alert ${status.type}`}>{status.message}</div>}

      <Card
        title={`${messages.length} message(s)`}
        actions={<Button onClick={load} disabled={loading}>Refresh</Button>}
      >
        {loading && <div className="admin-empty">Loading…</div>}
        {!loading && messages.length === 0 && <div className="admin-empty">No messages yet.</div>}

        {!loading &&
          messages.map((message) => (
            <div className="admin-item" key={message.id}>
              <div className="admin-item-head">
                {message.read ? (
                  <MailOpen size={16} style={{ color: 'var(--admin-muted)' }} />
                ) : (
                  <Mail size={16} style={{ color: 'var(--admin-accent)' }} />
                )}
                <span className="title" style={{ fontWeight: message.read ? 500 : 700 }}>
                  {message.name} — {message.email}
                </span>
                <span className="index">
                  {message.createdAt ? new Date(message.createdAt).toLocaleString() : ''}
                </span>
                <div className="admin-item-actions">
                  <a className="admin-btn sm" href={`mailto:${message.email}`} title="Reply by email">
                    <Reply size={16} />
                  </a>
                  <Button size="sm" onClick={() => toggleRead(message)}>
                    {message.read ? 'Unread' : 'Read'}
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => remove(message)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="admin-item-body">
                <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{message.message}</p>
                <div className="field-hint mt-2">IP {message.ip || 'unknown'}</div>
              </div>
            </div>
          ))}
      </Card>
    </AdminShell>
  );
}
