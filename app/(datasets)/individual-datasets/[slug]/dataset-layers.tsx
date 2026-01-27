'use client';
import React from 'react';
import LayerCardsGrid from './layer-cards-grid';
import './dataset-layers.css';

/**
 * Dataset Layers component that displays filtered layers for a single dataset
 * @param layers - Array of layer objects to display as datasets
 */
export default function DatasetLayers({ layers }: { layers: any }) {
  return (
    <LayerCardsGrid
      layers={layers}
      parentMedia={null}
    />
  );
}
