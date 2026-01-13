'use client';
import React, { useState } from 'react';
import { useFiltersWithQSNextJS } from '../../../hooks/use-filters-with-qs-nextjs';
import Providers from '../../providers';

/**
 * Layer Catalog with Actions component
 * Displays layers in a card grid with filtering and action buttons
 */
export default function LayerCatalogWithActions({ layers }: { layers: any }) {
  const controlVars = useFiltersWithQSNextJS();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Transform layers to match the dataset format
  const transformedLayers = layers.map((layer) => ({
    ...layer,
    id: layer.id || layer.stacCol,
    name: layer.name,
    description: layer.description,
    taxonomy: layer.taxonomy || [],
  }));

  // Apply search and taxonomy filters
  const filteredLayers = transformedLayers.filter((layer) => {
    // Search filter
    const searchTerm = controlVars.search?.toLowerCase() || '';
    if (searchTerm) {
      const matchesSearch =
        layer.name?.toLowerCase().includes(searchTerm) ||
        layer.description?.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }

    // Taxonomy filters
    const taxonomies = controlVars.taxonomies || {};
    for (const [taxonomyKey, selectedValues] of Object.entries(taxonomies)) {
      if (selectedValues.length > 0) {
        const layerTaxonomy = layer.taxonomy?.find((t) => t.name === taxonomyKey);
        if (!layerTaxonomy) return false;

        const hasMatchingValue = selectedValues.some((selectedValue) =>
          layerTaxonomy.values?.some((v) => v.id === selectedValue || v.name === selectedValue)
        );
        if (!hasMatchingValue) return false;
      }
    }

    return true;
  });

  const handleGISAccess = (layer) => {
    // TODO: Implement GIS access functionality
    console.log('Access GIS for layer:', layer.id);
  };

  const handleVEDAAccess = (layer) => {
    // TODO: Implement VEDA access functionality
    console.log('Access VEDA for layer:', layer.id);
  };

  return (
    <Providers>
      <div className="layer-catalog-with-actions">
        {/* Filter controls would go here - for now showing just the cards */}

        <div className="grid-row grid-gap-lg margin-top-3">
          {filteredLayers.map((layer) => {
            const media = layer.media || {
              src: '/images/event/data-view.png',
              alt: layer.name || 'Dataset layer'
            };

            return (
              <div key={layer.id} className="tablet:grid-col-6 margin-bottom-4">
                <div
                  className="card-container border border-base-light"
                  onMouseEnter={() => setHoveredCard(layer.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Action buttons overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      zIndex: 10,
                      display: 'flex',
                      gap: '8px',
                      opacity: hoveredCard === layer.id ? 1 : 0,
                      transition: 'opacity 0.2s ease-in-out'
                    }}
                  >
                    <button
                      className="usa-button usa-button--outline"
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.875rem',
                        minHeight: 'unset'
                      }}
                      onClick={() => handleGISAccess(layer)}
                    >
                      GIS
                    </button>
                    <button
                      className="usa-button usa-button--outline"
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.875rem',
                        minHeight: 'unset'
                      }}
                      onClick={() => handleVEDAAccess(layer)}
                    >
                      VEDA
                    </button>
                  </div>

                  {/* Card image */}
                  <div style={{ overflow: 'hidden', height: '200px' }}>
                    <img
                      src={media.src}
                      alt={media.alt || layer.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div className="padding-3" style={{ flex: 1 }}>
                    <h3 className="font-sans-md margin-top-0 margin-bottom-1">
                      {layer.name}
                    </h3>
                    <p className="font-sans-sm text-base-dark margin-bottom-0">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLayers.length === 0 && (
          <div className="padding-5 text-center">
            <p className="font-sans-lg text-base">No layers match your search criteria.</p>
          </div>
        )}
      </div>
    </Providers>
  );
}
