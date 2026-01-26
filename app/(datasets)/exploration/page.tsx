import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getTransformedDatasetMetadata } from 'app/content/utils/mdx';
import { PageHero } from 'app/lib';

const ExplorationAnalysis = dynamic(
  () => import('./exploration'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  },
);

export default function Page() {
  const datasets: any[] = getTransformedDatasetMetadata();
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <ExplorationAnalysis datasets={datasets} />
      </Suspense>
    </section>
  );
}
