import { Suspense } from 'react';
import ContactEditor from '@/components/admin/editors/ContactEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <ContactEditor />
    </Suspense>
  );
}
