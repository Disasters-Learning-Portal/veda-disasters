import React from 'react';
import Link from 'next/link';
import { getDatasets } from 'app/content/utils/mdx';
import { notFound } from 'next/navigation';
import LayerCardsGrid from './layer-cards-grid';

export default function IndividualDatasetsPage({ params }: { params: any }) {
  const datasets = getDatasets();
  const dataset = datasets.find((d) => d.slug === params.slug);

  if (!dataset) {
    notFound();
  }

  const { metadata } = dataset;
  const layers = metadata.layers || [];

  return (
    <div className="grid-container">
      <section>
        <div className="margin-top-8 margin-bottom-5">
          <h1 className="font-sans-xl">{metadata.name}</h1>
          <p className="font-sans-md margin-top-1">{metadata.description}</p>
        </div>

        <LayerCardsGrid layers={layers} parentMedia={metadata.media} />

        {/* Back link */}
        <div className="margin-bottom-5">
          <Link href="/data-catalog" className="usa-button usa-button--outline">
            ← Back to Event Catalog
          </Link>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all datasets
export async function generateStaticParams() {
  const datasets = getDatasets();
  return datasets.map((dataset) => ({
    slug: dataset.slug,
  }));
}
