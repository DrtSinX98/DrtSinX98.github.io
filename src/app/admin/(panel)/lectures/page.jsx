import { Suspense } from 'react';
import LecturesEditor from '@/components/admin/editors/LecturesEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <LecturesEditor />
    </Suspense>
  );
}
