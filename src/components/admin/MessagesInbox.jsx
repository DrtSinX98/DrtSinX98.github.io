'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Mail, MailOpen, RotateCcw, Reply, Trash2 } from 'lucide-react';
import AdminShell from './AdminShell';
import { Alert, Button, Card, LoadingBlock, useAdminDialogs } from './ui';

const formatTime = (value) =>
  value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '';

export default function MessagesInbox() {
  const { confirm, dialog } = useAdminDialogs();
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setMessages(json.messages);
      setUnread(json.unread);
      setLoaded(true);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Keep the sidebar badge in step with what's on screen.
  useEffect(() => {
    if (loaded) window.dispatchEvent(new CustomEvent('admin:unread', { detail: unread }));
  }, [unread, loaded]);

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
    const ok = await confirm({
      title: 'Delete this message?',
      message: `From ${message.name} (${message.email}). This can't be undone.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
    if (!message.read) setUnread((n) => Math.max(0, n - 1));
    await fetch(`/api/admin/messages/${message.id}`, { method: 'DELETE' });
  };

  const visible = useMemo(
    () => (filter === 'unread' ? messages.filter((m) => !m.read) : messages),
    [messages, filter],
  );

  return (
    <AdminShell title="Messages" subtitle={unread ? `${unread} unread` : 'Submissions from the contact form'}>
      {status && <Alert type={status.type}>{status.message}</Alert>}

      <Card
        title={`${messages.length} message${messages.length === 1 ? '' : 's'}`}
        actions={
          <Button onClick={load} disabled={loading}>
            <RotateCcw size={16} aria-hidden="true" /> Refresh
          </Button>
        }
      >
        <div className="admin-filter" role="group" aria-label="Filter messages">
          <button type="button" className="admin-filter__btn" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            All <span>{messages.length}</span>
          </button>
          <button type="button" className="admin-filter__btn" aria-pressed={filter === 'unread'} onClick={() => setFilter('unread')}>
            Unread <span>{unread}</span>
          </button>
        </div>

        {loading && <LoadingBlock label="Loading messages" />}
        {!loading && visible.length === 0 && (
          <div className="admin-empty">{filter === 'unread' ? 'No unread messages.' : 'No messages yet.'}</div>
        )}

        {!loading &&
          visible.map((message) => (
            <article className={`admin-message${message.read ? '' : ' is-unread'}`} key={message.id}>
              <div className="admin-message__avatar" aria-hidden="true">
                {(message.name || '?').trim().charAt(0).toUpperCase()}
              </div>

              <div className="admin-message__main">
                <header className="admin-message__head">
                  <div className="admin-message__who">
                    <h3>{message.name}</h3>
                    {!message.read && <span className="admin-message__new">New</span>}
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </div>
                  <time dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
                </header>

                <p className="admin-message__body">{message.message}</p>

                <footer className="admin-message__foot">
                  <span className="admin-message__ip">IP {message.ip || 'unknown'}</span>
                  <div className="admin-message__actions">
                    <a className="admin-btn sm" href={`mailto:${message.email}`}>
                      <Reply size={16} aria-hidden="true" /> Reply
                    </a>
                    <Button size="sm" onClick={() => toggleRead(message)}>
                      {message.read ? <Mail size={16} aria-hidden="true" /> : <MailOpen size={16} aria-hidden="true" />}
                      {message.read ? 'Mark unread' : 'Mark read'}
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => remove(message)}>
                      <Trash2 size={16} aria-hidden="true" /> Delete
                    </Button>
                  </div>
                </footer>
              </div>
            </article>
          ))}
      </Card>

      {dialog}
    </AdminShell>
  );
}
