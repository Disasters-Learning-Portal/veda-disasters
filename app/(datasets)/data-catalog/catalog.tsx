'use client';
import React, { useMemo } from 'react';
import { CatalogContent } from '@lib';
import { useFiltersWithQSNextJS } from '../../hooks/use-filters-with-qs-nextjs';
import Providers from '../providers';
import './catalog.css';

/**
 * Filters datasets based on search query and taxonomy filters
 * @param datasets - Array of all datasets
 * @param search - Search query string
 * @param taxonomies - Object of taxonomy filters (e.g., { "Topics": ["Wildfires"], "Source": ["NASA"] })
 * @returns Filtered array of datasets
 */
function filterDatasets(
  datasets: any[],
  search: string,
  taxonomies: Record<string, string[]>
) {
  return datasets.filter((dataset) => {
    // Search filter: check name, description, and taxonomy values
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        dataset.name?.toLowerCase().includes(searchLower) ||
        dataset.description?.toLowerCase().includes(searchLower) ||
        dataset.taxonomy?.some((tax: any) =>
          tax.values?.some((val: any) =>
            (typeof val === 'string' ? val : val.name || val.id || '')
              .toLowerCase()
              .includes(searchLower)
          )
        );
      if (!matchesSearch) return false;
    }

    // Taxonomy filters: dataset must match ALL selected taxonomies (AND logic)
    if (taxonomies && Object.keys(taxonomies).length > 0) {
      for (const [taxonomyName, selectedValues] of Object.entries(taxonomies)) {
        if (!selectedValues || selectedValues.length === 0) continue;

        // Find the taxonomy group in the dataset
        const datasetTaxonomy = dataset.taxonomy?.find(
          (tax: any) => tax.name === taxonomyName
        );

        if (!datasetTaxonomy) return false;

        // Check if any of the selected values match the dataset's values
        // Handle both string format and object format {id, name}
        const hasMatch = selectedValues.some((selectedValue) => {
          const lowerSelectedValue = selectedValue.toLowerCase().trim();

          const match = datasetTaxonomy.values?.some((v: any) => {
            if (typeof v === 'string') {
              // Simple string comparison
              return v.toLowerCase().trim() === lowerSelectedValue;
            } else {
              // Object format: check both id and name
              const lowerName = (v.name || '').toLowerCase().trim();
              const lowerId = (v.id || '').toLowerCase().trim();

              // Match against either the name or the id
              // This handles cases where the filter passes "hurricanes_and_cyclones" (id format)
              // or "Hurricanes and Cyclones" (name format)
              return lowerName === lowerSelectedValue || lowerId === lowerSelectedValue;
            }
          });

          if (!match) {
            const valuesList = datasetTaxonomy.values?.map((v: any) =>
              typeof v === 'string' ? v : `${v.name} (id: ${v.id})`
            ).join(', ');
            console.log(`No match found for "${selectedValue}" in [${valuesList}] for dataset:`, dataset.name);
          }
          return match;
        });

        if (!hasMatch) return false;
      }
    }

    return true;
  });
}

/**
 * Catalog component that displays filtered datasets
 * @param datasets - Array of dataset objects to display
 */
export default function Catalog({ datasets }: { datasets: any }) {
  console.log('Catalog render - datasets count:', datasets?.length);

  const controlVars = useFiltersWithQSNextJS();

  console.log('Control vars:', {
    search: controlVars.search,
    taxonomies: controlVars.taxonomies,
    hasOnAction: !!controlVars.onAction,
  });

  // Filter datasets based on current search and taxonomy filters
  const filteredDatasets = useMemo(
    () => {
      if (!datasets || !Array.isArray(datasets)) {
        console.error('Datasets is not an array:', datasets);
        return [];
      }

      console.log('Filtering datasets:', {
        totalDatasets: datasets.length,
        search: controlVars.search,
        taxonomies: controlVars.taxonomies,
      });
      const result = filterDatasets(datasets, controlVars.search, controlVars.taxonomies);
      console.log('Filtered result:', result.length, 'datasets');
      return result;
    },
    [datasets, controlVars.search, controlVars.taxonomies]
  );

  return (
    <Providers>
      <CatalogContent
        datasets={filteredDatasets}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
      />
    </Providers>
  );
}
