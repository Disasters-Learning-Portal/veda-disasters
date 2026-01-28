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
      // {
      //   id: 'eventGallery',
      //   title: 'Activation Event Gallery',
      //   to: '/data-catalog',
      //   type: 'internalLink',
      // },
      {
        id: 'dataViz',
        title: 'Data Visualization',
        to: '/exploration',
        type: 'internalLink',
      },
      {
        id: 'notebooks',
        title: 'Jupyter Notebooks / Data Processing',
        to: '/about',
        type: 'internalLink',
      },
      {
        id: 'data-demo',
        title: 'Demo Visualization Updates',
        to: 'https://deploy-preview-966--visex.netlify.app/exploration?datasets=%5B%7B%22id%22%3A%22landsat-demo%22%2C%22settings%22%3A%7B%22isVisible%22%3Atrue%2C%22opacity%22%3A100%2C%22analysisMetrics%22%3A%5B%7B%22id%22%3A%22mean%22%2C%22label%22%3A%22Average%22%2C%22chartLabel%22%3A%22Average%22%2C%22themeColor%22%3A%22infographicB%22%7D%2C%7B%22id%22%3A%22std%22%2C%22label%22%3A%22St+Deviation%22%2C%22chartLabel%22%3A%22St+Deviation%22%2C%22themeColor%22%3A%22infographicD%22%7D%5D%7D%7D%5D&taxonomy=%7B%7D',
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
        to: '/about',
        type: 'internalLink',
      },
      {
        id: 'resources',
        title: 'Resources',
        to: '/about',
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
          title={'Disasters Program'}
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
