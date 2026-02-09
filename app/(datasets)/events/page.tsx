import React from 'react';
import dynamic from 'next/dynamic';
import { getStoriesMetadata } from 'app/content/utils/mdx';

// @NOTE: Dynamically load to ensure only CSR since these depends on VedaUI ContextProvider for routing...
const StoriesHub = dynamic(() => import('./hub'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

export default function Page() {
  //TO DO: Revisit long term solution for outward linking story cards.
  const events = getStoriesMetadata().map((d) => ({
    ...d.metadata,
  path: d.metadata.path
  ? d.metadata.path
  : `events/${d.slug}`
  }));

  return (
    <div className='grid-container'>
      <div className='margin-top-8 margin-bottom-3'>
        <h1 className='font-sans-xl'>Activation Summaries</h1>
        <p className='font-sans-md margin-top-1'>
          Explore interactive, data-driven summaries highlighting the Disaster
          Response Coordination Office support for federal, state, and local
          disaster response.
        </p>
      </div>
      <StoriesHub stories={events} />
    </div>
  );
}
