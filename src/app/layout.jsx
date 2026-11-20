import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.css';
import '@/styles/components.css';
import '@/styles/cv.css';
import '@/styles/illustrations.css';
import '@/styles/storyset.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { getContent } from '@/lib/content';
import { themeInitScript } from '@/lib/theme';
import { Analytics } from '@vercel/analytics/next';

// Font Awesome injects its own <style> at runtime; Next already ships the CSS above.
config.autoAddCss = false;

/**
 * Three voices, each with one job. All variable fonts, self-hosted by next/font
 * so there is no third-party request and no layout shift.
 *
 *   display  Bricolage Grotesque — headlines, big numbers. Has an optical-size
 *            axis, so large type tightens up on its own.
 *   sans     Geist — body copy and UI.
 *   mono     Geist Mono — labels, tags, the terminal, anything "instrument".
 *
 * `latin-ext` is there for the city names in the gallery (Poznań, Västerås).
 * The CSS custom properties are consumed in styles/index.css.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--nf-display',
});
const sans = Geist({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--nf-sans' });
const mono = Geist_Mono({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--nf-mono' });

/**
 * A fourth face, used only for the biggest headings: Samarkan (Titivillus
 * Foundry, shareware — see src/fonts/Samarkan-README.txt, which must stay with
 * the font). It is a decorative display face, so it is never used for running
 * text or small sizes. Only the Normal is shipped; it covers every heading on
 * the site except "ń" (Poznań), which falls back to the display face.
 *
 * `src/fonts/Samarkan-Normal.woff2` is a lossless re-wrap of the original TTF:
 * same 238 glyphs, no editing or subsetting.
 */
const accent = localFont({
  src: '../fonts/Samarkan-Normal.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--nf-accent',
});

export async function generateMetadata() {
  const site = await getContent('site');
  return {
    title: site.title,
    description: site.description,
    icons: {
      icon: '/favicon.ico',
      apple: '/logo192.png',
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const site = await getContent('site');
  const t = site.theme || {};

  const themeVars = `:root{
  --primary-color: ${t.primaryColor || '#301934'};
  --secondary-color: ${t.secondaryColor || '#c91574'};
  --tertiary-color: ${t.tertiaryColor || '#eeeafc'};
  --primary-color-dark: ${t.primaryColorDark || '#130A15'};
}`;

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript(t.dayStartHour ?? 6, t.nightStartHour ?? 18),
          }}
        />
        {/* Motion server-renders each reveal's `initial` state as inline
            opacity: 0. With JS disabled the animation never runs, so without
            this the content would be in the DOM for crawlers but invisible to
            the reader. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
