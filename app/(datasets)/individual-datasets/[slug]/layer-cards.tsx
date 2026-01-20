'use client';
import React from 'react';

interface LayerCardsProps {
  layers: any[];
  parentMedia: any;
}

export default function LayerCards({ layers, parentMedia }: LayerCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
      {layers.map((layer: any, index: number) => {
        const media = layer.media || parentMedia || {
          src: 'https://placehold.co/409x285',
          alt: layer.name || 'Dataset layer'
        };

        return (
          <div
            key={layer.id || index}
            className="layer-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
            }}
          >
            {/* Layer image */}
            {media?.src && (
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={media.src}
                  alt={media.alt || layer.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Action buttons in top right */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}>
                  <button
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#1a4480',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#162e51';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a4480';
                    }}
                  >
                    Access GIS Data
                  </button>
                  <button
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#e23c2e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#c42919';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#e23c2e';
                    }}
                  >
                    Access VEDA Data
                  </button>
                </div>
              </div>
            )}

            {/* Layer content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: '#2c3d4f' }}>
                {layer.name}
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#5a5a5a', marginBottom: '1rem', flex: 1 }}>
                {layer.description}
              </p>

              {/* Metadata */}
              {layer.info && (
                <div style={{ fontSize: '0.85rem', color: '#6b6b6b', borderTop: '1px solid #e5e5e5', paddingTop: '0.75rem' }}>
                  {layer.info.source && (
                    <div style={{ marginBottom: '0.25rem' }}>
                      <strong>Source:</strong> {layer.info.source}
                    </div>
                  )}
                  {layer.info.spatialExtent && (
                    <div style={{ marginBottom: '0.25rem' }}>
                      <strong>Spatial Extent:</strong> {layer.info.spatialExtent}
                    </div>
                  )}
                  {layer.info.temporalResolution && (
                    <div style={{ marginBottom: '0.25rem' }}>
                      <strong>Temporal Resolution:</strong> {layer.info.temporalResolution}
                    </div>
                  )}
                  {layer.info.unit && (
                    <div>
                      <strong>Unit:</strong> {layer.info.unit}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
