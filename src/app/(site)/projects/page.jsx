import Projects from '@/components/Projects';
import { getContent } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';
import { visitorTheme } from '@/lib/visitorTheme';
import { requirePage } from '@/lib/pageGate';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Projects | Vortex' };

export default async function ProjectsPage() {
  const [projects, site] = await Promise.all([getContent('projects'), getContent('site')]);
  requirePage(site, 'projects');

  // The page has no illustration of its own yet; if one is set it is inlined and
  // animated like the others, otherwise the hero shows its element tile.
  const animate = site.animations?.illustrations !== false;
  const illustration =
    animate && projects.image ? await getIllustration(projects.image, await visitorTheme(site.theme)) : null;

  return <Projects content={projects} illustration={illustration} animateIllustration={animate} />;
}
