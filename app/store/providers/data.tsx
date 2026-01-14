'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReactQueryProvider } from '@lib';
import { DatasetMetadata } from 'app/types/content';

interface DataStore {
  datasets?: DatasetMetadata[];
  setDatasets?: React.Dispatch<
    React.SetStateAction<DatasetMetadata[] | undefined>
  >;
}

export const DataContext = createContext<DataStore>({});

export function useDataStore() {
  return useContext<DataStore>(DataContext);
}

// @TODO: Decided how to handle function as mapLabel from VEDA UI
// https://github.com/NASA-IMPACT/veda-ui/issues/1377
function updateMapLabels(data) {
  if (!data || !Array.isArray(data)) {
    return data;
  }

  return data.map((dataset) => {
    if (dataset.metadata && dataset.metadata.layers) {
      dataset.metadata.layers.forEach((layer) => {
        if (layer.mapLabel) {
          // Use Function constructor instead of eval for better scoping
          layer.mapLabel = new Function('return ' + layer.mapLabel)();
        }
        if (layer.compare && layer.compare.mapLabel) {
          // Use Function constructor instead of eval for better scoping
          layer.compare.mapLabel = new Function('return ' + layer.compare.mapLabel)();
        }
      });
    }
    return dataset;
  });
}

function DataProvider({
  initialDatasets = undefined,
  children,
}: {
  children: JSX.Element | ReactNode;
  initialDatasets: any[] | undefined;
}) {
  const [datasets, setDatasets] = useState<any[] | undefined>(
    updateMapLabels(initialDatasets),
  );
  const value = {
    datasets,
    setDatasets,
  };

  return (
    <DataContext.Provider value={value}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </DataContext.Provider>
  );
}

export default DataProvider;
