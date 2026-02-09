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
          {/* PLEASE READ: Hiding page hero component to avoid duplicate title and description. Need to persist imported component to import proper style.div classes for new adjusted header
          
          THIS IS NOT A LONG TERM SOLUTION AND SHOULD BE REVISITED IN FINAL IMPLEMENTATION.
          */}
          <div className='display-none'>
            <PageHero
              title={theme.metadata.name}
              description={theme.metadata.description}
              coverSrc={theme.metadata.media?.src}
              coverAlt={theme.metadata.media?.alt}
            />
          </div>
          <>
            <div className='page-hero__PageHeroSelf-sc-1k71sqn-0 eZuInp'>
              <div className='constrainer__Constrainer-sc-46sav1-0 page-hero__PageHeroInner-sc-1k71sqn-1 cZpbqa eMgvmm'>
                <div className='page-hero__PageHeroBlockAlpha-sc-1k71sqn-4 hxJPlw'>
                  <div className='page-hero__PageHeroHGroup-sc-1k71sqn-2 iyFmPL'>
                    <h1
                      className={`Heading-sc-17hljlf-0 variable-components__VarHeading-sc-8uk1h5-0 page__PageMainTitle-sc-16vqilt-1 eVTsfW joiwiz font-mono-3xl text-uppercase `}
                      style={{
                        width: 'fit-content',
                        backgroundColor: `#${theme.metadata.backgroundColor}`,
                        color: `${theme.metadata.name === 'Prepare' ? '#0D313D' : '#ffffff'}`,
                      }}
                    >
                      {theme.metadata.name}
                    </h1>
                  </div>
                  <p className='Heading__Lead-sc-17hljlf-2 variable-components__VarLead-sc-8uk1h5-1 page__PageLead-sc-16vqilt-3 hPkhEe ffwKhm hcZAwH'>
                    {theme.metadata.description}
                  </p>
                </div>
                <figure className='figure__Figure-sc-myzzxa-0 page-hero__PageHeroCover-sc-1k71sqn-3 bNcInL eMxvZS'>
                  <img
                    src={theme.metadata.media?.src}
                    alt={theme.metadata.media?.alt}
                  />
                  <figcaption className='figure__Figcaption-sc-myzzxa-1 DtNHj'></figcaption>
                </figure>
              </div>
            </div>
          </>
        </Providers>
        <CustomMDX source={theme.content} />
      </article>
    </section>
  );
}
