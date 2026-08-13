import { Suspense } from 'react';
import GalleryEditor from '@/components/admin/editors/GalleryEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <GalleryEditor />
    </Suspense>
  );
}
