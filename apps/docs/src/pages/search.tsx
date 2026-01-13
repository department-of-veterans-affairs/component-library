import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';

import styles from './search.module.css';

// Mock search results to demonstrate the integration
const mockDocsResults = [
  {
    title: 'Button Component',
    description: 'Buttons allow users to trigger actions with a single tap or click.',
    url: '/docs/components/button',
    category: 'Components',
    site: 'design-system',
    siteName: 'Design System',
  },
  {
    title: 'Form Patterns',
    description: 'Patterns for building accessible, user-friendly forms on VA.gov.',
    url: '/docs/patterns/ask-users-for',
    category: 'Patterns',
    site: 'design-system',
    siteName: 'Design System',
  },
  {
    title: 'Typography',
    description: 'Typography guidelines and type scale for VA.gov applications.',
    url: '/docs/foundation/typography',
    category: 'Foundation',
    site: 'design-system',
    siteName: 'Design System',
  },
  {
    title: 'Accessibility Checklist',
    description: 'Comprehensive accessibility requirements for VA.gov components.',
    url: '/docs/accessibility/checklist',
    category: 'Accessibility',
    site: 'design-system',
    siteName: 'Design System',
  },
];

const mockTeamDocsResults = [
  {
    title: 'Sprint Planning Guide',
    description: 'How to run effective sprint planning sessions for the DS team.',
    url: 'http://localhost:3003/docs/processes/sprint-planning',
    category: 'Processes',
    site: 'team-docs',
    siteName: 'Team Docs',
  },
  {
    title: 'Component Review Process',
    description: 'Steps for reviewing and approving new component contributions.',
    url: 'http://localhost:3003/docs/processes/component-review',
    category: 'Processes',
    site: 'team-docs',
    siteName: 'Team Docs',
  },
  {
    title: 'Release Workflow',
    description: 'How to prepare and publish new releases of the component library.',
    url: 'http://localhost:3003/docs/releases/workflow',
    category: 'Releases',
    site: 'team-docs',
    siteName: 'Team Docs',
  },
];

// Documentation sites configuration - add new sites here as the monorepo grows
const docsSites = [
  {
    id: 'design-system',
    name: 'Design System',
    description: 'Components, patterns, and guidelines for VA.gov',
    icon: '🎨',
    url: '/',
    color: '#2e8555',
  },
  {
    id: 'team-docs',
    name: 'Team Docs',
    description: 'Internal processes and team resources',
    icon: '👥',
    url: 'http://localhost:3003',
    color: '#1a73e8',
  },
  // Add more sites as the monorepo grows:
  // {
  //   id: 'platform-docs',
  //   name: 'Platform Docs',
  //   description: 'Platform infrastructure and DevOps guides',
  //   icon: '⚙️',
  //   url: 'http://localhost:3004',
  //   color: '#7c3aed',
  // },
];

type SearchResult = {
  title: string;
  description: string;
  url: string;
  category: string;
  site: string;
  siteName: string;
};

type FilterType = 'all' | string;

function SearchResultItem({result}: {result: SearchResult}) {
  const isExternal = result.url.startsWith('http');
  const site = docsSites.find(s => s.id === result.site);

  return (
    <div className={styles.resultItem}>
      <div className={styles.resultMeta}>
        <span
          className={styles.siteBadge}
          style={{backgroundColor: site?.color ? `${site.color}20` : undefined, color: site?.color}}
        >
          {result.siteName}
        </span>
        <span className={styles.categoryBadge}>{result.category}</span>
      </div>
      <h3 className={styles.resultTitle}>
        {isExternal ? (
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            {result.title}
            <span className={styles.externalIcon}>↗</span>
          </a>
        ) : (
          <Link to={result.url}>{result.title}</Link>
        )}
      </h3>
      <p className={styles.resultDescription}>{result.description}</p>
    </div>
  );
}

function SearchPage(): ReactNode {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Combine all mock results
  const allResults = [...mockDocsResults, ...mockTeamDocsResults];
  const filteredResults = filter === 'all'
    ? allResults
    : allResults.filter(r => r.site === filter);

  // Count results per site
  const resultCounts = docsSites.reduce((acc, site) => {
    acc[site.id] = allResults.filter(r => r.site === site.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <Head>
        <title>Search | VA.gov Platform</title>
        <meta name="description" content="Search across all VA.gov platform documentation" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <div className={styles.pageWrapper}>
        {/* Minimal Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <a href="/" className={styles.logo}>
              <img src="/img/logo.svg" alt="" className={styles.logoImg} />
              <span className={styles.logoText}>VA.gov Platform</span>
            </a>
            <nav className={styles.headerNav}>
              <a href="https://github.com/department-of-veterans-affairs/component-library" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
              <h1 className={styles.heroTitle}>
                VA.gov Platform Documentation
              </h1>
              <p className={styles.heroSubtitle}>
                Search across all documentation, guides, and resources
              </p>
            </section>

            {/* Search Input */}
            <section className={styles.searchSection}>
              <div className={styles.searchInputWrapper}>
                <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search documentation..."
                  value={query}
                  onChange={handleInputChange}
                  autoFocus
                />
                <div className={styles.searchShortcut}>
                  <kbd>⌘</kbd>
                  <kbd>K</kbd>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className={styles.filterTabs}>
                <button
                  className={clsx(styles.filterTab, filter === 'all' && styles.active)}
                  onClick={() => setFilter('all')}
                >
                  All
                  {showResults && <span className={styles.count}>{allResults.length}</span>}
                </button>
                {docsSites.map(site => (
                  <button
                    key={site.id}
                    className={clsx(styles.filterTab, filter === site.id && styles.active)}
                    onClick={() => setFilter(site.id)}
                    style={filter === site.id ? {backgroundColor: site.color, borderColor: site.color} : undefined}
                  >
                    <span className={styles.tabIcon}>{site.icon}</span>
                    {site.name}
                    {showResults && <span className={styles.count}>{resultCounts[site.id]}</span>}
                  </button>
                ))}
              </div>
            </section>

            {/* Search Results */}
            {showResults ? (
              <section className={styles.resultsSection}>
                <div className={styles.resultsHeader}>
                  <p className={styles.resultsCount}>
                    {filteredResults.length} results for "<strong>{query || 'button'}</strong>"
                  </p>
                </div>
                <div className={styles.resultsList}>
                  {filteredResults.map((result, idx) => (
                    <SearchResultItem key={idx} result={result} />
                  ))}
                </div>
              </section>
            ) : (
              /* Documentation Sites Grid */
              <section className={styles.sitesSection}>
                <h2 className={styles.sitesTitle}>Documentation Sites</h2>
                <div className={styles.sitesGrid}>
                  {docsSites.map(site => (
                    <a
                      key={site.id}
                      href={site.url}
                      className={styles.siteCard}
                      style={{'--site-color': site.color} as React.CSSProperties}
                    >
                      <span className={styles.siteIcon}>{site.icon}</span>
                      <h3 className={styles.siteName}>{site.name}</h3>
                      <p className={styles.siteDescription}>{site.description}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Algolia Info */}
            <section className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h2>🔍 Unified Search with Algolia</h2>
                <p>
                  This search page demonstrates a unified search experience across all platform documentation.
                  In production, this will be powered by Algolia DocSearch.
                </p>
                <div className={styles.infoNote}>
                  <strong>To enable:</strong> Configure Algolia to crawl all documentation sites
                  and use a single search index with faceted filtering by site.
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>An official website of the United States government</p>
            <nav className={styles.footerNav}>
              <a href="https://va.gov" target="_blank" rel="noopener noreferrer">VA.gov</a>
              <a href="https://github.com/department-of-veterans-affairs" target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}

export default SearchPage;
