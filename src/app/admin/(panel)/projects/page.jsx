import { Suspense } from 'react';
import ProjectsEditor from '@/components/admin/editors/ProjectsEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <ProjectsEditor />
    </Suspense>
  );
}
