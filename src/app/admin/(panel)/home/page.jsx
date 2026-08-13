import { Suspense } from 'react';
import HomeEditor from '@/components/admin/editors/HomeEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <HomeEditor />
    </Suspense>
  );
}
