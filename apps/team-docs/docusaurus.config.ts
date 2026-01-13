import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'VA Team Documentation',
  tagline: 'Collaborative documentation for VA.gov teams',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  plugins: [
    // Local search - works offline, no external service needed
    // Remove this when switching to Algolia
    [
      'docusaurus-lunr-search',
      {
        languages: ['en'],
        indexBaseUrl: true,
      },
    ],
  ],

  url: 'https://team-docs.va.gov',
  baseUrl: '/',

  organizationName: 'department-of-veterans-affairs',
  projectName: 'va-team-docs',

  onBrokenLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/department-of-veterans-affairs/platform/tree/main/apps/team-docs/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Team Updates',
          blogDescription: 'Updates and announcements from VA.gov teams',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/va-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'VA Team Docs',
      logo: {
        alt: 'VA.gov Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'meetingsSidebar',
          position: 'left',
          label: 'Meetings',
        },
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: 'Architecture',
        },
        {
          type: 'docSidebar',
          sidebarId: 'processesSidebar',
          position: 'left',
          label: 'Processes',
        },
        {
          type: 'docSidebar',
          sidebarId: 'onboardingSidebar',
          position: 'left',
          label: 'Onboarding',
        },
        {
          to: '/blog',
          label: 'Updates',
          position: 'left',
        },
        {
          href: '/admin/',
          label: 'Edit Content',
          position: 'right',
        },
        {
          href: 'https://design.va.gov',
          label: 'Design System',
          position: 'right',
        },
        {
          href: 'https://github.com/department-of-veterans-affairs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Meetings', to: '/docs/meetings'},
            {label: 'Architecture Decisions', to: '/docs/architecture'},
            {label: 'Processes', to: '/docs/processes'},
            {label: 'Onboarding', to: '/docs/onboarding'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'VA Design System', href: 'https://design.va.gov'},
            {label: 'Storybook', href: 'https://design.va.gov/storybook/'},
            {label: 'GitHub', href: 'https://github.com/department-of-veterans-affairs'},
          ],
        },
        {
          title: 'Quick Links',
          items: [
            {label: 'Edit Content', href: '/admin/'},
            {label: 'Team Updates', to: '/blog'},
          ],
        },
      ],
      copyright: `An official website of the United States government.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
    // =================================================================
    // ALGOLIA DOCSEARCH (Recommended for production)
    // =================================================================
    // To enable Algolia DocSearch:
    // 1. Apply at: https://docsearch.algolia.com/apply/
    // 2. Wait for approval (1-3 days)
    // 3. Receive appId, apiKey, and indexName from Algolia
    // 4. Uncomment and fill in the values below
    // 5. Remove the local search theme from the themes array above
    //
    // algolia: {
    //   appId: 'YOUR_APP_ID',           // From Algolia dashboard
    //   apiKey: 'YOUR_SEARCH_API_KEY',  // Public search-only API key
    //   indexName: 'va-team-docs',      // Index name from Algolia
    //   contextualSearch: true,         // Enable version/language filtering
    //   searchPagePath: 'search',       // Enable dedicated search page at /search
    // },
    // =================================================================
  } satisfies Preset.ThemeConfig,
};

export default config;
