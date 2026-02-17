'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useQsStateCreator from 'qs-state-hook';
import { omit, set } from 'lodash';

/**
 * Available filter actions for the catalog
 */
export enum FilterActions {
  TAXONOMY_MULTISELECT = 'taxonomy_multiselect',
  CLEAR = 'clear',
  SEARCH = 'search',
  TAXONOMY = 'taxonomy',
  CLEAR_TAXONOMY = 'clear_taxonomy',
  CLEAR_SEARCH = 'clear_search',
}

/**
 * Function type for handling filter actions
 * @param action - The filter action to perform
 * @param value - Optional value for the action
 */
export type FilterAction = (action: FilterActions, value?: any) => void;

/**
 * Result interface for the useFiltersWithQSNextJS hook
 */
export interface UseFiltersWithQueryResult {
  /** Current search query string */
  search: string;
  /** Current taxonomy filters as key-value pairs */
  taxonomies: Record<string, string[]> | Record<string, never>;
  /** Function to perform filter actions */
  onAction: FilterAction;
}

const OPTION_ALL = { id: 'all' };

/**
 * Next.js-compatible hook for managing URL-based filters in the data catalog.
 *
 * This hook replaces the original useFiltersWithQS to work properly with Next.js routing.
 * It uses router.push() instead of window.history.pushState() to ensure proper React
 * re-renders and Next.js navigation behavior.
 *
 * @returns Object containing current filter state and action handler
 *
 * @example
 * ```tsx
 * function CatalogPage() {
 *   const { search, taxonomies, onAction } = useFiltersWithQSNextJS();
 *
 *   const handleSearch = (query: string) => {
 *     onAction(FilterActions.SEARCH, query);
 *   };
 *
 *   const handleTaxonomyFilter = (key: string, value: string) => {
 *     onAction(FilterActions.TAXONOMY, { key, value });
 *   };
 * }
 * ```
 */
export function useFiltersWithQSNextJS(): UseFiltersWithQueryResult {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlKey, setUrlKey] = useState(0);

  /**
   * Creates the qs-state hook with Next.js-compatible URL updates
   */
  const useQsState = useQsStateCreator({
    commit: ({ search }) => {
      if (typeof window === 'undefined') return;

      try {
        const currentUrl = new URL(window.location.href);

        // Update URL with new search parameters
        if (search !== undefined && search !== null) {
          const cleanSearch = search.startsWith('?') ? search.slice(1) : search;
          currentUrl.search = cleanSearch || '';
        } else {
          currentUrl.search = '';
        }

        const fullPath =
          currentUrl.pathname + currentUrl.search + currentUrl.hash;

        // Only push if the URL actually changed
        if (fullPath !== window.location.pathname + window.location.search + window.location.hash) {
          router.push(fullPath, { scroll: false });
        }
      } catch (error) {
        console.error('Error updating URL:', error);
      }
    },
  });

  // Search state management
  const [search, setSearch] = useQsState.memo(
    {
      key: FilterActions.SEARCH,
      default: '',
    },
    [urlKey],
  );

  // Taxonomy state management with JSON serialization
  const [taxonomies, setTaxonomies] = useQsState.memo(
    {
      key: FilterActions.TAXONOMY,
      default: {},
      dehydrator: (v) => JSON.stringify(v),
      hydrator: (v) => (v ? JSON.parse(v) : {}),
    },
    [urlKey],
  );

  /**
   * Force re-render when URL search parameters change
   */
  useEffect(() => {
    setUrlKey((prev) => prev + 1);
  }, [searchParams]);

  /**
   * Handles taxonomy multiselect operations
   */
  const handleTaxonomyMultiselect = useCallback(
    (key: string, value: string) => {
      console.log('handleTaxonomyMultiselect called:', { key, value });
      setTaxonomies((currentTaxonomies) => {
        console.log('Current taxonomies before update:', currentTaxonomies);

        if (!currentTaxonomies || !(key in currentTaxonomies)) {
          const result = set({ ...currentTaxonomies }, key, [value]);
          console.log('Setting new taxonomy:', result);
          return result;
        }

        const currentValues = Array.isArray(currentTaxonomies[key])
          ? (currentTaxonomies[key] as string[])
          : [currentTaxonomies[key] as string];

        if (currentValues.includes(value)) {
          // Remove value
          const updatedValues = currentValues.filter((x) => x !== value);
          if (updatedValues.length > 0) {
            const result = set({ ...currentTaxonomies }, key, updatedValues);
            console.log('Updating taxonomy (partial remove):', result);
            return result;
          } else {
            const result = omit(currentTaxonomies, key);
            console.log('Removing taxonomy completely:', result);
            return result;
          }
        } else {
          // Add value
          const result = set({ ...currentTaxonomies }, key, [...currentValues, value]);
          console.log('Adding value to taxonomy:', result);
          return result;
        }
      });
    },
    [setTaxonomies],
  );

  /**
   * Main action handler for all filter operations
   */
  const onAction = useCallback<FilterAction>(
    (action, value) => {
      switch (action) {
        case FilterActions.CLEAR:
          setSearch('');
          setTaxonomies({});
          break;

        case FilterActions.SEARCH:
          setSearch(value);
          break;

        case FilterActions.CLEAR_TAXONOMY:
          setTaxonomies({});
          break;

        case FilterActions.CLEAR_SEARCH:
          setSearch('');
          break;

        case FilterActions.TAXONOMY: {
          const { key, value: val } = value;
          if (val === OPTION_ALL.id) {
            setTaxonomies((current) => omit(current, key));
          } else {
            setTaxonomies((current) => set({ ...current }, key, val));
          }
          break;
        }

        case FilterActions.TAXONOMY_MULTISELECT: {
          const { key, value: val } = value;
          handleTaxonomyMultiselect(key, val);
          break;
        }

        default:
          break;
      }
    },
    [setSearch, setTaxonomies, handleTaxonomyMultiselect],
  );

  return {
    search: search ?? '',
    taxonomies: taxonomies ?? {},
    onAction,
  };
}
