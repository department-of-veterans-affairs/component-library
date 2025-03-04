import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';

const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'Components/Pagination USWDS',
  id: 'uswds/va-pagination',
  parameters: {
    componentSubtitle: 'va-pagination web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={paginationDocs} />,
    },
  },
};

const defaultArgs = {
  'page': 1,
  'pages': 24,
  'max-page-list-length': 10,
  'unbounded': false,
};

const Template = ({
  'page': currentPage,
  pages,
  'max-page-list-length': maxPageListLength,
  unbounded,
}) => {
  const [page, setPage] = useState(currentPage);
  const handlePageSelect = event => {
    setPage(event.detail.page);
  };
  return (
    <VaPagination
      page={page}
      pages={pages}
      max-page-list-length={maxPageListLength}
      unbounded={unbounded}
      onPageSelect={handlePageSelect}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);

export const WithMiddle = Template.bind(null);
WithMiddle.args = {
  ...defaultArgs,
  page: 10,
};

export const WithLast = Template.bind(null);
WithLast.args = {
  ...defaultArgs,
  page: 24,
};

export const WithUnboundedFirst = Template.bind(null);
WithUnboundedFirst.args = {
  ...defaultArgs,
  unbounded: true,
};

export const WithUnboundedMiddle = Template.bind(null);
WithUnboundedMiddle.args = {
  ...defaultArgs,
  unbounded: true,
  page: 10,
};

export const WithSixOrLess = Template.bind(null);
WithSixOrLess.args = {
  ...defaultArgs,
  pages: 6,
};

export const WithSixOrLessMiddle = Template.bind(null);
WithSixOrLessMiddle.args = {
  ...defaultArgs,
  pages: 6,
  page: 3,
};

export const WithSixOrLessLast = Template.bind(null);
WithSixOrLessLast.args = {
  ...defaultArgs,
  pages: 6,
  page: 6,
};

export const Internationalization = () => {
  const [lang, setLang] = useState('en');
  const [page1, setPage1] = useState(10);
  const [page2, setPage2] = useState(10);

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button onClick={() => setLang('es')} text="Español" />
      <va-button onClick={() => setLang('en')} text="English" />
      <div style={{ marginTop: '20px' }}>
        <h4>Default</h4>
        <VaPagination
          page={page1}
          pages={24}
          maxPageListLength={10}
          onPageSelect={event => setPage1(event.detail.page)}
        />
        <h4>Unbounded</h4>
        <VaPagination
          page={page2}
          pages={24}
          maxPageListLength={10}
          unbounded
          onPageSelect={event => setPage2(event.detail.page)}
        />
      </div>
    </div>
  );
};
