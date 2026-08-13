import { Suspense } from 'react';
import MessagesInbox from '@/components/admin/MessagesInbox';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <MessagesInbox />
    </Suspense>
  );
}
