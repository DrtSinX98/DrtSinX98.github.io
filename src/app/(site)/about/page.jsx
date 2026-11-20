import About from '@/components/About';
import { getContentMany } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';
import { visitorTheme } from '@/lib/visitorTheme';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'About | Vortex' };

export default async function AboutPage() {
  const { about, cv, site } = await getContentMany(['about', 'cv', 'site']);
  const animate = site.animations?.illustrations !== false;
  const illustration = animate ? await getIllustration(about.image, await visitorTheme(site.theme)) : null;

  return <About content={about} cv={cv} illustration={illustration} animateIllustration={animate} />;
}
