import React, { useState, useEffect }  from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';

const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'USWDS/Pagination USWDS',
  id: 'uswds/va-pagination',
  parameters: {
    componentSubtitle: 'va-pagination web component',
    docs: {
      page: () => <StoryDocs data={paginationDocs} />,
    }
  }
}

const defaultArgs = {
  page: 1,
  pages: 24,
  'max-page-list-length': 7,
  unbounded: false
}

const Template = ({
  'page': currentPage,
  pages,
  'max-page-list-length': maxPageListLength,
  unbounded
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
}

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);

export const WithMiddle = Template.bind(null);
WithMiddle.args = {
  ...defaultArgs, page: 10
}

export const WithLast = Template.bind(null);
WithLast.args = {
  ...defaultArgs, page: 24
}

export const WithUnboundedFirst = Template.bind(null);
WithUnboundedFirst.args = {
  ...defaultArgs, unbounded: true
}

export const WithUnboundedMiddle = Template.bind(null);
WithUnboundedMiddle.args = {
  ...defaultArgs, unbounded: true, page: 10
}

export const WithSevenOrLess = Template.bind(null);
WithSevenOrLess.args = {
  ...defaultArgs, pages: 7
}

export const WithSevenOrLessMiddle = Template.bind(null);
WithSevenOrLessMiddle.args = {
  ...defaultArgs, pages: 7, page: 3
}

export const WithSevenOrLessLast = Template.bind(null);
WithSevenOrLessLast.args = {
  ...defaultArgs, pages: 7, page: 7
}

export const Internationalization = () => {
  const [lang, setLang] = useState('en');
  const [page1, setPage1] = useState(10);
  const [page2, setPage2] = useState(10);

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button onClick={() => setLang('es')} text="Español"/>
      <va-button onClick={() => setLang('en')} text="English"/>
      <div style={{ marginTop: '20px' }}>
        <h4>Default</h4>
        <VaPagination page={page1} pages={24} maxPageListLength={7} onPageSelect={(event) => setPage1(event.detail.page) }/>
        <h4>Unbounded</h4>
        <VaPagination page={page2} pages={24} maxPageListLength={7} unbounded onPageSelect={(event) => setPage2(event.detail.page)}/>
      </div>
    </div>
)};