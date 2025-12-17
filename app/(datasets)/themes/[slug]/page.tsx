import React from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getThemes } from 'app/content/utils/mdx';
import { PageHero, LegacyGlobalStyles } from '@lib';
import Providers from 'app/(datasets)/providers';

export default function ThemePage({ params }: { params: any }) {
  const theme = getThemes().find((theme) => theme.slug === params.slug);

  if (!theme) {
    notFound();
  }

  return (
    <section>
      <article className='prose'>
        <Providers>
          <LegacyGlobalStyles />
          <PageHero
            title={theme.metadata.name}
            description={theme.metadata.description}
            coverSrc={theme.metadata.media?.src}
            coverAlt={theme.metadata.media?.alt}
          />
        </Providers>
        <CustomMDX source={theme.content} />
      </article>
    </section>
  );
}
