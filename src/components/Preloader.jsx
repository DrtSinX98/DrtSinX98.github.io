'use client';

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

/**
 * Warms the browser cache for the site's remote images before revealing the page,
 * reproducing the original client-side loading screen.
 *
 * The page markup is always rendered (just hidden) so the server response still
 * contains the real content for crawlers — only its visibility is deferred.
 * Set `enabled` to false in Admin -> Settings for an instant first paint.
 */
export default function Preloader({ images = [], enabled = true, children }) {
  const [isLoading, setIsLoading] = useState(enabled && images.length > 0);

  useEffect(() => {
    if (!enabled || images.length === 0) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const promises = images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Prevent site from infinite loading on image failure
        }),
    );

    Promise.all(promises).then(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, images]);

  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <Spinner className="spinner" />
        </div>
      )}
      <div hidden={isLoading}>{children}</div>
    </>
  );
}
