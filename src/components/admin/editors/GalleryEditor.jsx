'use client';

import React from 'react';
import EditorPage from '../EditorPage';
import { Card, Text } from '../ui';
import RichTextEditor from '../RichTextEditor';
import ImageField from '../ImageField';

const TABS = [
  { key: 'intro', label: 'Intro' },
  { key: 'map', label: 'Map & labels' },
];

export default function GalleryEditor() {
  return (
    <EditorPage
      section="gallery"
      title="Gallery"
      subtitle="Intro copy and the globe's labels — countries and photos have their own screens"
      tabs={TABS}
      render={(data, set, active) => (
        <>
          {active === 'intro' && (
            <>
              <Card title="Illustration">
                <ImageField value={data.image} onChange={(v) => set('image', v)} />
              </Card>
              <Card title="Heading and lead">
                <RichTextEditor label="Heading" value={data.heading} onChange={(v) => set('heading', v)} rows={2} />
                <RichTextEditor label="Lead paragraph" value={data.lead} onChange={(v) => set('lead', v)} rows={6} />
              </Card>
            </>
          )}

          {active === 'map' && (
            <>
              <Card title="Globe" hint="The visited count is derived from the countries list.">
                <Text
                  label="Total countries in the world"
                  type="number"
                  hint="The denominator in the counter badge."
                  value={data.totalCountries}
                  onChange={(v) => set('totalCountries', v)}
                />
                <Text label="Headline" value={data.mapHeadline} onChange={(v) => set('mapHeadline', v)} />
                <Text label="Sub-line" value={data.mapSubline} onChange={(v) => set('mapSubline', v)} />
                <Text label="Visited list modal title" value={data.visitedListTitle} onChange={(v) => set('visitedListTitle', v)} />
              </Card>

              <Card title="Labels">
                <div className="admin-grid cols-2">
                  <Text label="Back button" value={data.backLabel} onChange={(v) => set('backLabel', v)} />
                  <Text label="Weather loading text" value={data.weatherLoadingLabel} onChange={(v) => set('weatherLoadingLabel', v)} />
                </div>
                <Text
                  label="Empty country message"
                  hint="{country} is replaced with the country name."
                  value={data.emptyLabel}
                  onChange={(v) => set('emptyLabel', v)}
                />
              </Card>
            </>
          )}
        </>
      )}
    />
  );
}
