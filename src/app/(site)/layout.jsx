import { getContentMany } from '@/lib/content';
import { portraitUrl } from '@/lib/portrait';
import { visitorTheme } from '@/lib/visitorTheme';
import ThemeProvider from '@/components/ThemeProvider';
import MotionProvider from '@/components/motion/MotionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ParticlesBG from '@/components/ParticlesBg';
import ScrollTop from '@/components/ScrollTop';

export default async function SiteLayout({ children }) {
  const { site, home } = await getContentMany(['site', 'home']);
  const theme = await visitorTheme(site.theme || {});
  const nav = site.nav || [];

  // The saved preload list names the original portrait PNGs (833 kB each), which
  // the page no longer uses — it shows the recoloured versions. Swap them, so the
  // loading screen waits for (and warms the cache with) the images actually shown.
  const light = home.profileImageLight;
  const dark = home.profileImageDark;
  const preloadImages = [
    ...(site.preloader?.images || []).filter((url) => url !== light && url !== dark),
    portraitUrl('light', theme, light),
    portraitUrl('dark', theme, dark),
  ].filter(Boolean);

  // The constellation follows a visitor's own template; otherwise the saved colour.
  const particles = theme.visitor ? { ...site.particles, color: theme.secondaryColor } : site.particles || {};

  return (
    <ThemeProvider
      dayStartHour={theme.dayStartHour ?? 6}
      nightStartHour={theme.nightStartHour ?? 18}
      visitorPreset={theme.visitor ? theme.preset : null}
    >
      <MotionProvider>
        {/* `.vx-site` scopes the redesign's element-level styling, so the admin
            panel (which shares the root layout's stylesheets) is untouched. */}
        <div className="vx-site">
          <a className="vx-skip" href="#main">
            Skip to content
          </a>
          <ParticlesBG config={particles} />
          <Header brand={site.brand} nav={nav} />
          <Preloader enabled={site.preloader?.enabled ?? true} images={preloadImages}>
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
