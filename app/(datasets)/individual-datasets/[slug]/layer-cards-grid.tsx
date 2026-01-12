'use client';
import React from 'react';

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
                <div className="layer-card-action-button">Access data in VEDA</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
