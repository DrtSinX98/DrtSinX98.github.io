import { getContent } from '@/lib/content';
import ThemeProvider from '@/components/ThemeProvider';
import MotionProvider from '@/components/motion/MotionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ParticlesBG from '@/components/ParticlesBg';
import ScrollTop from '@/components/ScrollTop';

export default async function SiteLayout({ children }) {
  const site = await getContent('site');
  const theme = site.theme || {};
  const nav = site.nav || [];

  return (
    <ThemeProvider dayStartHour={theme.dayStartHour ?? 6} nightStartHour={theme.nightStartHour ?? 18}>
      <MotionProvider>
        {/* `.vx-site` scopes the redesign's element-level styling, so the admin
            panel (which shares the root layout's stylesheets) is untouched. */}
        <div className="vx-site">
          <a className="vx-skip" href="#main">
            Skip to content
          </a>
          <ParticlesBG config={site.particles || {}} />
          <Header brand={site.brand} nav={nav} />
          <Preloader enabled={site.preloader?.enabled ?? true} images={site.preloader?.images || []}>
            <main id="main" className="vx-main" tabIndex={-1}>
              {children}
            </main>
          </Preloader>
          <Footer owner={site.footer?.owner} writtenIn={site.footer?.writtenIn} nav={nav} />
          <ScrollTop />
        </div>
      </MotionProvider>
    </ThemeProvider>
  );
}
