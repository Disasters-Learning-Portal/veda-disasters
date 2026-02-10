import React from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getThemes } from 'app/content/utils/mdx';
import { PageHero, LegacyGlobalStyles } from '@lib';
import Providers from 'app/(datasets)/providers';
import './Pagehero.scss';
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
         
          <>
            <div className='page-hero__PageHeroSelf'>
              <div className='constrainer__Constrainer page-hero__PageHeroInner'>
                <div className='page-hero__PageHeroBlockAlpha'>
                  <div className='page-hero__PageHeroHGroup'>
                    <h1
                      className={`Heading variable-components__VarHeading page__PageMainTitle font-mono-3xl text-uppercase `}
                      style={{
                        width: 'fit-content',
                        backgroundColor: `#${theme.metadata.backgroundColor}`,
                        color: `${theme.metadata.name === 'Prepare' ? '#0D313D' : '#ffffff'}`,
                      }}
                    >
                      {theme.metadata.name}
                    </h1>
                  </div>
                  <p className='Heading__Lead variable-components__VarLead page__PageLead'>
                    {theme.metadata.description}
                  </p>
                </div>
                <figure className='figure__Figure page-hero__PageHeroCover'>
                  <img
                    src={theme.metadata.media?.src}
                    alt={theme.metadata.media?.alt}
                  />
                  <figcaption className='figure__Figcaption'></figcaption>
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
