import { Container } from 'react-bootstrap';
import { getContent } from '@/lib/content';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ParticlesBG from '@/components/ParticlesBg';

export default async function SiteLayout({ children }) {
  const site = await getContent('site');
  const theme = site.theme || {};

  return (
    <ThemeProvider dayStartHour={theme.dayStartHour ?? 6} nightStartHour={theme.nightStartHour ?? 18}>
      <div>
        <Header brand={site.brand} nav={site.nav || []} />
        <Preloader enabled={site.preloader?.enabled ?? true} images={site.preloader?.images || []}>
          <Container>
            <ParticlesBG config={site.particles || {}} />
            {children}
          </Container>
        </Preloader>
        <Footer owner={site.footer?.owner} writtenIn={site.footer?.writtenIn} />
      </div>
    </ThemeProvider>
  );
}
