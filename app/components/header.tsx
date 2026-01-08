import React from 'react';
import { PageHeader } from '@lib';
import { NavItem } from '@lib';
import NasaLogoColor from 'app/components/nasa-logo-color.js';
//Official Disasters logo coloring
//import DisastersLogoColor from 'app/components/nasa-disasters-logo-color.js';
//Alternate blackout Disasters logo for example
import {
  DATASET_CATALOG_PATH,
  THEMES_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from 'app/config';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';

const createTaxonomyUrl = (disaster: string) => {
  const taxonomy = JSON.stringify({ Disaster: [disaster] });
  return `/${DATASET_CATALOG_PATH}?taxonomy=${encodeURIComponent(taxonomy)}`;
};

const createExplorationUrl = (product: string) => {
  const exploreTaxonomy = JSON.stringify({ 'Product Type': [product] });
  return `/${EXPLORATION_PATH}?taxonomy=${encodeURIComponent(exploreTaxonomy)}`;
};

export const navItems: NavItem[] = [
  {
    id: 'about',
    title: 'About Us',
    // @ts-expect-error until veda-ui fixes its types: NavItem type enum (see https://github.com/NASA-IMPACT/veda-ui/issues/1882)
    type: 'dropdown',
    children: [
      {
        id: 'disasters-science-to-action',
        title: 'Disasters Science to Action',
        to: '/about',
        type: 'internalLink',
      },
      {
        id: 'disasters-response',
        title: 'Disasters Response Coordination System',
        to: '/about',
        type: 'internalLink',
      },
      {
        id: 'disasters-portal',
        title: 'Portal',
        to: '/about',
        type: 'internalLink',
      },
    ]
  },
  {
    id: 'themes',
    title: 'Explore Themes',
    // @ts-expect-error until veda-ui fixes its types: NavItem type enum (see https://github.com/NASA-IMPACT/veda-ui/issues/1882)
    type: 'dropdown',
    children: [
      {
        id: 'prepare',
        title: 'Prepare',
        to: '/themes/prepare',
        type: 'internalLink',
      },
      {
        id: 'respond',
        title: 'Respond',
        to: '/themes/respond',
        type: 'internalLink',
      },
      {
        id: 'recover',
        title: 'Recover',
        to: '/themes/recover',
        type: 'internalLink',
      },
      {
        id: 'resilience',
        title: 'Resilience',
        to: '/themes/resilience',
        type: 'internalLink',
      },
    ],
  },
  {
    id: 'data-portal',
    title: 'Data Portal',
    // @ts-expect-error until veda-ui fixes its types: NavItem type enum (see https://github.com/NASA-IMPACT/veda-ui/issues/1882)
    type: 'dropdown',
    children: [
      {
        id: 'dataViz',
        title: 'Data Visualization',
        to: '/themes/prepare',
        type: 'internalLink',
      },
      {
        id: 'notebooks',
        title: 'Jupyter Notebooks / Data Processing',
        to: '/themes/respond',
        type: 'internalLink',
      },
    ],
  },
  {
    id: 'resource-learning',
    title: 'Resources & Learning',
    // @ts-expect-error until veda-ui fixes its types: NavItem type enum (see https://github.com/NASA-IMPACT/veda-ui/issues/1882)
    type: 'dropdown',
    children: [
      {
        id: 'learning',
        title: 'Learning',
        to: '/themes/prepare',
        type: 'internalLink',
      },
      {
        id: 'resources',
        title: 'Resources',
        to: '/themes/respond',
        type: 'internalLink',
      },
    ],
  },
];

export default function Header() {
  return (
    <VedaUIConfigProvider>
      <div className="custom-header-size">
        <PageHeader
          title={'NASA Disasters Program'}
          mainNavItems={navItems}
          subNavItems={[]}
          logoSvg={
            <div id='logo-container-link'>
              {/*
                USWDS targets only <a> tags for styling links. However when the text is a <span>
                instead of a link, it does not inherit the color styling (it ends up being white).
                To fix this, we must add the color inline like this.
                TODO: Ideally we can address this on the veda-ui side so that the color applies to all elements within the logo.
              */}
              <NasaLogoColor />
            </div>
          }
        />
      </div>
    </VedaUIConfigProvider>
  );
}
