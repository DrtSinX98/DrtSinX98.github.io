'use client';

import { useState, useEffect } from 'react';

/**
 * Warms the browser cache for the site's remote images before revealing the page,
 * reproducing the original client-side loading screen.
 *
 * The page markup is always rendered (just hidden) so the server response still
 * contains the real content for crawlers — only its visibility is deferred.
 * Set `enabled` to false in Admin -> Settings for an instant first paint.
 *
 * Two changes from the original, both about not letting a slow CDN hold the
 * whole site hostage:
 *   - there is now a ceiling (`MAX_WAIT_MS`); past it the page shows anyway and
 *     the remaining images finish loading in the background.
 *   - the spinner is the site's own mark — an orbiting electron — rather than a
 *     generic ring.
 */
const MAX_WAIT_MS = 2500;

export default function Preloader({ images = [], enabled = true, children }) {
  const [isLoading, setIsLoading] = useState(enabled && images.length > 0);

  useEffect(() => {
    if (!enabled || images.length === 0) {
      setIsLoading(false);
      return undefined;
    }

    let cancelled = false;
    const finish = () => {
      if (!cancelled) setIsLoading(false);
    };

    const promises = images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Prevent site from infinite loading on image failure
        }),
    );

    Promise.all(promises).then(finish);
    const timer = setTimeout(finish, MAX_WAIT_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled, images]);

  return (
    <>
      {isLoading && (
        <div className="vx-loader" role="status" aria-live="polite">
          <div className="vx-loader__mark" aria-hidden="true">
            <span className="vx-loader__ring" />
            <span className="vx-loader__dot" />
            <span className="vx-loader__core">Pr</span>
          </div>
          <span className="vx-sr-only">Loading</span>
        </div>
      )}
      <div hidden={isLoading}>{children}</div>
    </>
  );
}
