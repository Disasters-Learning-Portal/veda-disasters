'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ExplorationAnalysis = dynamic(
  () => import('app/(datasets)/exploration/exploration'),
  {
    ssr: false,
  }
);

export default function ExplorationEmbed({ datasets }: { datasets: any }) {
  return (
    <div style={{ height: '800px', width: '100%' }}>
      <ExplorationAnalysis datasets={datasets} />
    </div>
  );
}
