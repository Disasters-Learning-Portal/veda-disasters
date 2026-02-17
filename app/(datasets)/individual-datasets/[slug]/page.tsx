import React from 'react';
import dynamic from 'next/dynamic';
import { getDatasets } from 'app/content/utils/mdx';
import { notFound } from 'next/navigation';

// @NOTE: Dynamically load to ensure only CSR since this depends ContextProviders for routing and etc...
const DatasetLayers = dynamic(() => import('./dataset-layers'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

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
        <div className="margin-top-8 margin-bottom-3">
          <h1 className="font-sans-xl">{metadata.name}</h1>
          <p className="font-sans-md margin-top-1">{metadata.description}</p>
        </div>

        <DatasetLayers layers={layers} />
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
