'use client';
import React from 'react';
import { CatalogContent } from '@lib';
import { useFiltersWithQSNextJS } from '../../../hooks/use-filters-with-qs-nextjs';
import Providers from '../../providers';

/**
 * Layer Catalog component that displays layers as cards
 * @param datasets - Array of layer objects transformed into dataset format
 */
export default function LayerCatalog({ datasets }: { datasets: any }) {
  const controlVars = useFiltersWithQSNextJS();

  // Ensure taxonomies is always a valid object
  const taxonomies = controlVars.taxonomies ?? {};

  return (
    <Providers>
      <CatalogContent
        datasets={datasets}
        search={controlVars.search ?? ''}
        onAction={controlVars.onAction}
        taxonomies={taxonomies}
      />
    </Providers>
  );
}
