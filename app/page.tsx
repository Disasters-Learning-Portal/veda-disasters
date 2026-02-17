import React from 'react';
import Link from 'next/link';
import { getStoriesMetadata } from 'app/content/utils/mdx';
import DisastersWhiteMark from 'app/components/disasters-white-mark.js';
import HeroVideo from 'app/components/hero-video';

const storyIds = ['respond-featured-story', 'respond-mapping-flood-impacts', 'respond-news-update'];

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
        className="position-relative margin-bottom-4"
        aria-labelledby="hero-heading"
        style={{
          minHeight: '60vh',
          overflow: 'hidden',
        }}
      >
        {/* video background */}
        <HeroVideo src="/images/homepage/video_fire.mp4" />

        {/* overlay for contrast */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(12,49,61,1) 0%, rgba(12,49,61,1) 30%, rgba(12,49,61,0) 100%)',
            zIndex: 1,
          }}
        />

        {/* text */}
        <div className="position-relative" style={{ zIndex: 2, paddingLeft: '3rem', paddingRight: '3rem' }}>
          <br/><br/>
          <div style={{ width: '125px' }}>
            <DisastersWhiteMark />
          </div>
          <h2 className="text-white" style={{ fontWeight: 700, fontSize: '4.5rem', marginTop: '2rem', marginBottom: '2rem' }}>
            Disasters PORTAL
          </h2>
          <p
            className="text-white line-height-sans-4"
            style={{ fontSize: '1.5rem', maxWidth: '600px', margin: 0 }}
          >
            A community-driven hub translating NASA Earth science into actionable insights for disaster decision-making
          </p>
          <a
            href="/about"
            className="hero-learn-more-button"
            style={{
              display: 'inline-block',
              marginTop: '2rem',
              padding: '1rem 2rem',
              backgroundColor: '#0D7482',
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s',
            }}
          >
            Learn about us
          </a>
        </div>

        {/* Action Cards - full width across hero, outside grid-container */}
        <div className="position-relative" style={{ zIndex: 2, marginTop: '9rem', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', width: '100%' }}>
            <a href="/themes/prepare" style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textDecoration: 'none', transition: 'transform 0.2s', backgroundColor: '#003736', position: 'relative' }}>
              <img src="/images/event/blue-card.png" alt="Prepare" style={{ width: '100%', height: '160px', objectFit: 'cover', opacity: 0.3 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '1.5rem', textAlign: 'left' }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: '700', margin: 0, marginBottom: '0.5rem' }}>PREPARE</h3>
                <p style={{ color: 'white', fontSize: '1.2rem', margin: 0, lineHeight: 2.4 }}>Advancing science for disaster resilience</p>
              </div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E23C2E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', transform: 'rotate(-45deg)', display: 'inline-block' }}>→</span>
              </div>
            </a>
            <a href="/themes/respond" style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textDecoration: 'none', transition: 'transform 0.2s', backgroundColor: '#003736', position: 'relative' }}>
              <img src="/images/event/blue-card.png" alt="Respond" style={{ width: '100%', height: '160px', objectFit: 'cover', opacity: 0.3 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '1.5rem', textAlign: 'left' }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: '700', margin: 0, marginBottom: '0.5rem' }}>RESPOND</h3>
                <p style={{ color: 'white', fontSize: '1.2rem', margin: 0, lineHeight: 2.4 }}>Advancing science for disaster resilience</p>
              </div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E23C2E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', transform: 'rotate(-45deg)', display: 'inline-block' }}>→</span>
              </div>
            </a>
            <a href="/themes/recover" style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textDecoration: 'none', transition: 'transform 0.2s', backgroundColor: '#003736', position: 'relative' }}>
              <img src="/images/event/blue-card.png" alt="Recover" style={{ width: '100%', height: '160px', objectFit: 'cover', opacity: 0.3 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '1.5rem', textAlign: 'left' }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: '700', margin: 0, marginBottom: '0.5rem' }}>RECOVER</h3>
                <p style={{ color: 'white', fontSize: '1.2rem', margin: 0, lineHeight: 2.4 }}>Advancing science for disaster resilience</p>
              </div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E23C2E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', transform: 'rotate(-45deg)', display: 'inline-block' }}>→</span>
              </div>
            </a>
            <a href="/themes/resilience" style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textDecoration: 'none', transition: 'transform 0.2s', backgroundColor: '#003736', position: 'relative' }}>
              <img src="/images/event/blue-card.png" alt="Resilience" style={{ width: '100%', height: '160px', objectFit: 'cover', opacity: 0.3 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '1.5rem', textAlign: 'left' }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: '700', margin: 0, marginBottom: '0.5rem' }}>RESILIENCE</h3>
                <p style={{ color: 'white', fontSize: '1.2rem', margin: 0, lineHeight: 2.4 }}>Advancing science for disaster resilience</p>
              </div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E23C2E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', transform: 'rotate(-45deg)', display: 'inline-block' }}>→</span>
              </div>
            </a>
          </div>
        </div>
      </div>


      {/* Full-width Data Portal Visualization */}
      <div style={{ width: '80%', margin: '0 auto', marginTop: '11rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'left' }}>
          Data Portal Visualization
        </h2>
        <iframe
          id="data-portal-visualization"
          style={{ height: '700px', width: '100%', display: 'block', border: 'none', overflow: 'hidden' }}
          src="https://nasa.maps.arcgis.com/apps/webappviewer/index.html?id=7f9055f1e97f45f696e7a34bc4bd0002"
          title="Tropical Cyclone Interactive Dashboard showing current activations"
        />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'left', marginTop: '10rem' }}>
          Recent DRCS Activations
        </h2>
        <a href="/data-catalog/hurricane-helene-2024" style={{ display: 'block' }}>
          <img
            src="/images/homepage/tropical-cyclone-small.png"
            alt="Tropical cyclone visualization"
            style={{ width: '100%', height: 'auto', display: 'block', marginTop: '2rem' }}
          />
        </a>
      </div>

      {/* Full-width Resources & Learnings */}
      <div style={{ width: '80%', margin: '0 auto', marginTop: '9rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'left' }}>
          Resources & Learnings
        </h2>
        <img
          src="/images/homepage/resources-learnings.png"
          alt="Resources & Learnings section"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Homepage Connect */}
      <div style={{ width: '90%', margin: '0 auto', marginTop: '14rem' }}>
        <img
          src="/images/homepage/homepage-connect.png"
          alt="Connect with the Disasters community"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

    </section>
  );
}
