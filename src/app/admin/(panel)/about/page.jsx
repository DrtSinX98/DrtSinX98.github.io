import { Suspense } from 'react';
import AboutEditor from '@/components/admin/editors/AboutEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <AboutEditor />
    </Suspense>
  );
}
