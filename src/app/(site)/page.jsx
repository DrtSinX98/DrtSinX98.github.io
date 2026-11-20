import Home from '@/components/Home';
import { getContentMany } from '@/lib/content';
import { visitorTheme } from '@/lib/visitorTheme';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { home, site } = await getContentMany(['home', 'site']);
  return <Home content={home} nav={site.nav || []} theme={await visitorTheme(site.theme)} serverHour={new Date().getHours()} />;
}
