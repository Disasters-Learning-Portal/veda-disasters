import React from 'react';
import Link from 'next/link';
import { getStoriesMetadata } from 'app/content/utils/mdx';
import DisastersWhiteMark from 'app/components/disasters-white-mark.js';
import HeroVideo from 'app/components/hero-video';

const storyIds = [
  'respond-featured-story',
  'respond-mapping-flood-impacts',
  'respond-news-update',
];

const featuredStories = getStoriesMetadata()
  .filter((d) => storyIds.includes(d.slug))
  .sort((a, b) => storyIds.indexOf(a.slug) - storyIds.indexOf(b.slug))
  .map((d) => ({
    ...d.metadata,
    slug: d.slug,
    path: `events/${d.slug}`,
  }));

export default function HomePage() {
  return (
    <section>
      {/* HERO */}
      <div
        className='position-relative margin-bottom-4'
        aria-labelledby='hero-heading'
        style={{
          minHeight: '60vh',
          overflow: 'hidden',
          paddingBottom: '50px',
          backgroundImage: `url(https://placehold.co/1000x750)`,
        }}
      >
        {/* video background */}
        {/* <HeroVideo src='/images/homepage/video_fire.mp4' /> */}

        {/* overlay for contrast */}
        <div
          aria-hidden='true'
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(20,20,20,1) 0%,  rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />

        {/* text */}
        <div
          className='position-relative'
          style={{ zIndex: 2, paddingLeft: '3rem', paddingRight: '3rem' }}
        >
          <br />
          <br />
          <div style={{ width: '125px' }}>
            <DisastersWhiteMark />
          </div>
          <h2
            className='text-white'
            style={{
              fontWeight: 700,
              fontSize: '4.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Disasters PORTAL
          </h2>
          <p
            className='text-white line-height-sans-4'
            style={{ fontSize: '1.5rem', maxWidth: '600px', margin: 0 }}
          >
            A community-driven hub translating NASA Earth science into
            actionable insights for disaster decision-making
          </p>
        </div>

        {/* Action Cards - full width across hero, outside grid-container */}
        <div
          className='position-relative'
          style={{
            zIndex: 2,
            marginTop: '9rem',
            paddingLeft: '3rem',
            paddingRight: '3rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              width: '100%',
            }}
          >
            <a
              href='/themes/prepare'
              style={{
                display: 'block',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                backgroundColor: 'gray',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                  }}
                >
                  PREPARE
                </h3>
                <p
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: 0,
                    lineHeight: 2.4,
                  }}
                >
                  Advancing science for disaster resilience
                </p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#565c65',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transform: 'rotate(-45deg)',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </div>
            </a>
            <a
              href='/themes/respond'
              style={{
                display: 'block',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                backgroundColor: 'gray',
                position: 'relative',
              }}
            >

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                  }}
                >
                  RESPOND
                </h3>
                <p
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: 0,
                    lineHeight: 2.4,
                  }}
                >
                  Advancing science for disaster resilience
                </p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#E23C2E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transform: 'rotate(-45deg)',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </div>
            </a>
            <a
              href='/themes/recover'
              style={{
                display: 'block',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                backgroundColor: 'gray',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                  }}
                >
                  RECOVER
                </h3>
                <p
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: 0,
                    lineHeight: 2.4,
                  }}
                >
                  Advancing science for disaster resilience
                </p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#E23C2E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transform: 'rotate(-45deg)',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </div>
            </a>
            <a
              href='/themes/resilience'
              style={{
                display: 'block',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                backgroundColor: 'gray',
                position: 'relative',
                minHeight: '160px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                  }}
                >
                  RESILIENCE
                </h3>
                <p
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: 0,
                    lineHeight: 2.4,
                  }}
                >
                  Advancing science for disaster resilience
                </p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#E23C2E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transform: 'rotate(-45deg)',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className='grid-container'>
        <div className='grid-row margin-top-5'>
          <h2> Data Portal Visualization</h2>
        </div>
        <div className='grid-row grid-gap-md  margin-top-2'>
          <div className='tablet:grid-col-8'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(https://placehold.co/490x390)` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> Lorem ipsum dolor sit amet</h3>
                <p className='margin-top-1'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <Link className='link--block' href='#' />
            </div>
          </div>

          <div className='tablet:grid-col-4'>
            <div className='grid-row'>
              <div className='tablet:grid-col'>
                <div
                  className='card--homepage-substory text-base-lightest radius-md display-flex flex-align-end padding-2'
                  style={{
                    backgroundImage: `url(https://placehold.co/490x390)`,
                  }}
                >
                  <div className='card--homepage-topstory-text'>
                    <h3> Lorem ipsum dolor sit amet</h3>
                    <p className='margin-top-1'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <Link className='link--block' href='#' />
                </div>
              </div>
            </div>

            <div className='grid-row'>
              <div className='tablet:grid-col'>
                <div
                  className='card--homepage-substory text-base-lightest radius-md display-flex flex-align-end padding-2'
                  style={{
                    backgroundImage: `url(https://placehold.co/490x390)`,
                  }}
                >
                  <div className='card--homepage-topstory-text'>
                    <h3> Lorem ipsum dolor sit amet</h3>
                    <p className='margin-top-1'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <Link className='link--block' href='#' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid-row margin-top-5'>
          <h2>Resources & Learnings</h2>
        </div>
        <div className='grid-row grid-gap-md  margin-top-2'>
          <div className='tablet:grid-col-3'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(https://placehold.co/490x390)` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> Lorem ipsum dolor sit amet</h3>
                <p className='margin-top-1'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <Link className='link--block' href='#' />
            </div>
          </div>

          <div className='tablet:grid-col-3'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(https://placehold.co/490x390)` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> Lorem ipsum dolor sit amet</h3>
                <p className='margin-top-1'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <Link className='link--block' href='#' />
            </div>
          </div>
          <div className='tablet:grid-col-3'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(https://placehold.co/490x390)` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> Lorem ipsum dolor sit amet</h3>
                <p className='margin-top-1'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <Link className='link--block' href='#' />
            </div>
          </div>
          <div className='tablet:grid-col-3'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(https://placehold.co/490x390)` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> Lorem ipsum dolor sit amet</h3>
                <p className='margin-top-1'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <Link className='link--block' href='#' />
            </div>
          </div>
        </div>

        {/* Homepage Connect */}
        <div style={{ width: '90%', margin: '0 auto', marginTop: '9rem' }}>
          <img
            src='/images/homepage/homepage-connect.png'
            alt='Connect with the Disasters community'
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}
