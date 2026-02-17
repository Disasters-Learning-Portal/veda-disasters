import React from 'react';
import Link from 'next/link';
import { NavItem } from '@lib';
import NasaLogoColor from './nasa-logo-color';
import { PageFooter } from '@lib';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';

export const navItems: NavItem[] = [
  {
    id: 'contact',
    title: 'Contact Us',
    href: 'mailto:hq-disasters-gis@mail.nasa.gov',
    type: 'externalLink',
  },
  {
    id: 'newsletter',
    title: 'Newsletter Signup',
    href: 'https://lp.constantcontactpages.com/su/tn3iEZN',
    type: 'externalLink',
  },
];

export const subNavItems: NavItem[] = [
  {
    id: 'nasa',
    title: 'NASA Earth Science Division',
    href: 'https://science.nasa.gov/earth-science',
    type: 'externalLink',
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0C313D',
        width: '100%',
        padding: '19rem 3rem',
        marginTop: '4rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Logo in top left */}
        <div style={{ position: 'absolute', top: '6rem', left: '3rem' }}>
          <img
            src="/images/disasters-logos/Disasters_White_Mark.svg"
            alt="NASA Disasters"
            style={{ width: '150px', height: 'auto' }}
          />
          <div style={{ marginTop: '3rem', marginLeft: '0.5rem' }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 700,
              margin: 0
            }}>
              Disasters PORTAL
            </h2>
            <p style={{
              color: 'white',
              fontSize: '1.1rem',
              margin: '1rem 0 0 0',
              lineHeight: 1.8,
              maxWidth: '500px'
            }}>
              Platform for Observations, Research,<br />
              Translation, Application & Learning
            </p>

            <p style={{
              color: 'white',
              fontSize: '1.1rem',
              margin: '-5rem 0 0 85rem',
              lineHeight: 1.8,
              maxWidth: '500px'
            }}>
              About us
            </p>

            <p style={{
              color: 'white',
              fontSize: '1.1rem',
              margin: '-2rem 0 0 94rem',
              lineHeight: 1.8,
              maxWidth: '500px'
            }}>
              Explore Themes
            </p>

            <p style={{
              color: 'white',
              fontSize: '1.1rem',
              margin: '-2rem 0 0 107rem',
              lineHeight: 1.8,
              maxWidth: '500px'
            }}>
              Data Portal
            </p>

            <p style={{
              color: 'white',
              fontSize: '1.1rem',
              margin: '-2rem 0 0 118rem',
              lineHeight: 1.8,
              maxWidth: '500px'
            }}>
              Resources & Learning
            </p>
          </div>
        </div>

        {/* Footer content will go here */}
      </div>

      {/* Horizontal line spanning 95% of screen */}
      <hr style={{
        border: 'none',
        borderTop: '1px solid #254650',
        position: 'absolute',
        top: '27rem',
        left: '2.5%',
        width: '95%'
      }} />

      {/* Footer links below horizontal line */}
      <div style={{ position: 'absolute', top: '29.5rem', left: '3rem' }}>
        <div style={{ display: 'flex', gap: '3rem', marginLeft: '0.5rem' }}>
          <a
            href="#"
            style={{
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1rem'
            }}
          >
            Image Use Policy
          </a>
          <a
            href="#"
            style={{
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1rem'
            }}
          >
            Site Map
          </a>
          <a
            href="#"
            style={{
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1rem'
            }}
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Horizontal line spanning 95% of screen */}
      <hr style={{
        border: 'none',
        borderTop: '1px solid #254650',
        position: 'absolute',
        top: '32rem',
        left: '2.5%',
        width: '95%'
      }} />

      {/* Visit nasa.gov link below second horizontal line */}
      <div style={{ position: 'absolute', top: '34.5rem', left: '3rem' }}>
        <a
          href="https://www.nasa.gov"
          style={{
            color: 'white',
            textDecoration: 'underline',
            fontSize: '1rem',
            marginLeft: '0.5rem'
          }}
        >
          Visit nasa.gov
        </a>
      </div>

      {/* Page last updated text - positioned separately */}
      <div style={{ position: 'absolute', top: '34.5rem', left: '50%' }}>
        <span style={{ color: 'white', fontSize: '1rem' }}>
          Page last updated: February 1, 2026
        </span>
      </div>

      {/* Page Manager text - positioned to the right */}
      <div style={{ position: 'absolute', top: '34.5rem', right: '36rem' }}>
        <span style={{ color: 'white', fontSize: '1rem' }}>
          Page Manager: Jacob Reed
        </span>
      </div>

      {/* NASA Responsible Official - positioned to the right */}
      <div style={{ position: 'absolute', top: '34.5rem', right: '10rem' }}>
        <span style={{ color: 'white', fontSize: '1rem' }}>
          NASA Responsible Official: Shanna McClain
        </span>
      </div>
    </footer>
  );
}
