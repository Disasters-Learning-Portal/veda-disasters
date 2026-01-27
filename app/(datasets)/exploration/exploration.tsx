'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  ExplorationAndAnalysis,
  DatasetSelectorModal,
  useTimelineDatasetAtom,
  externalDatasetsAtom,
  LegacyGlobalStyles,
} from '@lib';
import { useSetAtom } from 'jotai';
import { useSearchParams, useRouter } from 'next/navigation';
import useElementHeight from '@utils/hooks/use-element-height';
import Providers from '../providers';

// Deep clone and remove all undefined values recursively
function deepRemoveUndefined(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepRemoveUndefined(item)).filter(item => item !== null && item !== undefined);
  }

  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (value !== undefined && value !== null) {
          result[key] = deepRemoveUndefined(value);
        }
      }
    }
    return result;
  }

  return obj;
}

export default function ExplorationAnalysis({ datasets }: { datasets: any }) {
  const setExternalDatasets = useSetAtom(externalDatasetsAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  // Clear any persisted Jotai atom state that might have invalid dataset IDs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear the timeline datasets from localStorage on mount
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('jotai') || key.includes('timeline') || key.includes('dataset')) {
          try {
            localStorage.removeItem(key);
            console.log('Cleared localStorage key:', key);
          } catch (e) {
            console.error('Failed to clear localStorage key:', key, e);
          }
        }
      });
    }
  }, []);

  // Set external datasets in an effect to avoid render phase updates
  useEffect(() => {
    setExternalDatasets(datasets);
  }, [datasets, setExternalDatasets]);

  const [timelineDatasets, setTimelineDatasets] = useTimelineDatasetAtom();
  const [datasetModalRevealed, setDatasetModalRevealed] = useState(false);

  // Initialize timeline datasets from URL parameters
  useEffect(() => {
    if (isInitialized) return;
    if (typeof window === 'undefined') return;

    // Read directly from window.location to avoid Next.js routing conflicts
    const urlParams = new URLSearchParams(window.location.search);
    const datasetsParam = urlParams.get('datasets');
    console.log('Initializing from URL, datasets param:', datasetsParam);
    console.log('Full URL:', window.location.href);
    console.log('Available datasets count:', datasets.length);

    if (datasetsParam) {
      // Clear any existing timeline datasets first to avoid conflicts
      setTimelineDatasets([]);

      try {
        const parsedDatasets = JSON.parse(decodeURIComponent(datasetsParam));
        console.log('Parsed datasets:', parsedDatasets);

        if (Array.isArray(parsedDatasets) && parsedDatasets.length > 0) {
          // Find the matching datasets from the available datasets
          const initialDatasets = parsedDatasets
            .map(({ id, layer }) => {
              const dataset = datasets.find((d: any) => d.id === id);

              console.log(`Looking for dataset with id: ${id}, found:`, dataset ? 'YES' : 'NO');
              if (!dataset) {
                console.log('Available dataset IDs:', datasets.map((d: any) => d.id).slice(0, 10));
                return null;
              }

              // Create a clean dataset object with only the necessary properties
              // to avoid serialization errors with incomplete layer objects
              // Only include essential properties to prevent undefined value errors
              const cleanDataset: any = {
                id: dataset.id,
                name: dataset.name,
                description: dataset.description,
                layers: dataset.layers?.map((l: any) => {
                  // Only include properties that are defined to avoid serialization errors
                  const cleanLayer: any = {
                    id: l.id,
                    name: l.name,
                    type: l.type,
                    stacCol: l.stacCol,
                  };

                  // Add optional properties only if they're defined
                  if (l.stacApiEndpoint) cleanLayer.stacApiEndpoint = l.stacApiEndpoint;
                  if (l.tileApiEndpoint) cleanLayer.tileApiEndpoint = l.tileApiEndpoint;
                  if (l.description) cleanLayer.description = l.description;
                  if (l.initialDatetime) cleanLayer.initialDatetime = l.initialDatetime;
                  if (l.sourceParams) cleanLayer.sourceParams = l.sourceParams;
                  if (l.zoomExtent) cleanLayer.zoomExtent = l.zoomExtent;
                  if (l.legend) cleanLayer.legend = l.legend;
                  if (l.info) cleanLayer.info = l.info;
                  if (l.compare) cleanLayer.compare = l.compare;
                  if (l.analysis) cleanLayer.analysis = l.analysis;
                  if (l.media) cleanLayer.media = l.media;

                  return cleanLayer;
                }) || [],
              };

              // Add optional dataset-level properties only if defined
              if (dataset.media) cleanDataset.media = dataset.media;
              if (dataset.taxonomy) cleanDataset.taxonomy = dataset.taxonomy;
              if (layer) cleanDataset.selectedLayer = layer;

              console.log('Clean dataset created:', cleanDataset.id, 'with layers:', cleanDataset.layers.length);
              return cleanDataset;
            })
            .filter(Boolean);

          console.log('Initial datasets to load:', initialDatasets.length, 'datasets');

          if (initialDatasets.length > 0) {
            // Apply deep cleaning to remove all undefined values
            const cleanedDatasets = deepRemoveUndefined(initialDatasets);
            console.log('Cleaned datasets (after deep undefined removal):', JSON.stringify(cleanedDatasets, null, 2));

            // Small delay to ensure state is cleared
            setTimeout(() => {
              try {
                setTimelineDatasets(cleanedDatasets);
                setDatasetModalRevealed(false);
                console.log('Timeline datasets set successfully');
              } catch (error) {
                console.error('Error setting timeline datasets:', error);
                console.error('Error details:', error);
                // If there's an error, try loading without the selectedLayer
                const datasetsWithoutSelection = cleanedDatasets.map((d: any) => {
                  const { selectedLayer, ...rest } = d;
                  return rest;
                });
                console.log('Retrying without selectedLayer:', JSON.stringify(datasetsWithoutSelection, null, 2));
                try {
                  setTimelineDatasets(datasetsWithoutSelection);
                  setDatasetModalRevealed(false);
                  console.log('Timeline datasets set without selection');
                } catch (retryError) {
                  console.error('Failed to set timeline datasets even without selection:', retryError);
                }
              }
            }, 100);
          }
        }
      } catch (e) {
        console.error('Failed to parse datasets from URL:', e);
      }
    } else if (timelineDatasets.length === 0) {
      setDatasetModalRevealed(true);
    }
    setIsInitialized(true);
  }, [datasets, isInitialized, setTimelineDatasets, timelineDatasets.length]);

  // Monitor timeline datasets changes
  useEffect(() => {
    console.log('Timeline datasets changed, count:', timelineDatasets.length);
  }, [timelineDatasets]);

  const openModal = () => {
    setDatasetModalRevealed(true);
  };
  const closeModal = () => {
    setDatasetModalRevealed(false);
  };
  // On landing, measure the height of Header and fill up the rest of the space with E&A
  const offsetHeight = useElementHeight({ queryToSelect: 'header' });

  return (
    <Providers datasets={datasets}>
      <LegacyGlobalStyles />
      <div
        id='ea-wrapper'
        // The below styles adjust the E&A page to match what we have on earthdata.nasa.gov
        // E&A is supposed to fill up whichever space given
        // Adjusting the container's height so the page with E&A doesn't overflow.
        style={{
          width: '100%',
          height: `calc(100vh - ${offsetHeight}px)`,
        }}
      >
        <DatasetSelectorModal
          revealed={datasetModalRevealed}
          close={closeModal}
          timelineDatasets={timelineDatasets}
          setTimelineDatasets={setTimelineDatasets}
          datasets={datasets}
        />
        <ExplorationAndAnalysis
          datasets={timelineDatasets}
          setDatasets={setTimelineDatasets}
          openDatasetsSelectionModal={openModal}
        />
      </div>
    </Providers>
  );
}
