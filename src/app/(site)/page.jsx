import Home from '@/components/Home';
import { getContentMany } from '@/lib/content';
import { visitorTheme } from '@/lib/visitorTheme';
import { enabledNav } from '@/lib/pageGate';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { home, site } = await getContentMany(['home', 'site']);
  return <Home content={home} nav={enabledNav(site.nav)} theme={await visitorTheme(site.theme)} serverHour={new Date().getHours()} />;
}
