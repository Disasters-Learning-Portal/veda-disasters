'use client';
import React from 'react';
import { CatalogContent } from '@lib';
import { useFiltersWithQSNextJS } from '../../../hooks/use-filters-with-qs-nextjs';
import Providers from '../../providers';
import './dataset-layers.css';

/**
 * Dataset Layers component that displays filtered layers for a single dataset
 * @param layers - Array of layer objects to display as datasets
 */
export default function DatasetLayers({ layers }: { layers: any }) {
  const controlVars = useFiltersWithQSNextJS();

  // Transform layers to match the dataset format expected by CatalogContent
  const transformedLayers = layers.map((layer) => ({
    ...layer,
    // Ensure all required fields are present
    id: layer.id || layer.stacCol,
    name: layer.name,
    description: layer.description,
    taxonomy: layer.taxonomy || [],
  }));

  return (
    <Providers>
      <CatalogContent
        datasets={transformedLayers}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
      />
    </Providers>
  );
}
