import { Suspense } from 'react';
import SiteEditor from '@/components/admin/editors/SiteEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <SiteEditor />
    </Suspense>
  );
}
