'use client';
import React from 'react';
import Link from 'next/link';

interface LayerCardsGridProps {
  layers: any[];
  parentMedia: any;
}

export default function LayerCardsGrid({ layers, parentMedia }: LayerCardsGridProps) {
  return (
    <div className="layer-cards-grid">
      {layers.map((layer: any, index: number) => {
        const media = layer.media || parentMedia || {
          src: '/images/event/data-view.png',
          alt: layer.name || 'Dataset layer'
        };

        // Construct the exploration URL with the correct format
        // Format: /exploration?datasets=[{"id":"parent-dataset-id","layer":"layer-id"}]
        // Pass both the parent dataset ID and the layer ID to ensure correct dataset is loaded
        const datasetParam = JSON.stringify([{
          id: layer.parentDataset?.id || layer.id,
          layer: layer.id
        }]);
        const explorationUrl = `/exploration?datasets=${encodeURIComponent(datasetParam)}`;

        return (
          <div key={layer.id || index} className="layer-card">
            <div className="layer-card-image">
              <img src={media.src} alt={media.alt || layer.name} />
            </div>
            <div className="layer-card-content">
              <h3 className="layer-card-title">{layer.name}</h3>
              <p className="layer-card-description">{layer.description}</p>
              <div className="layer-card-actions">
                <div className="layer-card-action-button">Access data in GIS</div>
                <Link
                  href={explorationUrl}
                  className="layer-card-action-button"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Access data in VEDA
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
