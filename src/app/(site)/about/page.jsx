import About from '@/components/About';
import { getContentMany } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';
import { visitorTheme } from '@/lib/visitorTheme';
import { requirePage } from '@/lib/pageGate';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'About | Vortex' };

export default async function AboutPage() {
  const { about, cv, site } = await getContentMany(['about', 'cv', 'site']);
  requirePage(site, 'about');
  const animate = site.animations?.illustrations !== false;
  const illustration = animate ? await getIllustration(about.image, await visitorTheme(site.theme)) : null;

  return <About content={about} cv={cv} illustration={illustration} animateIllustration={animate} />;
}
