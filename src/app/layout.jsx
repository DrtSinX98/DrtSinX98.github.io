import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { getContent } from '@/lib/content';
import { themeInitScript } from '@/lib/theme';

// Font Awesome injects its own <style> at runtime; Next already ships the CSS above.
config.autoAddCss = false;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript(t.dayStartHour ?? 6, t.nightStartHour ?? 18),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
