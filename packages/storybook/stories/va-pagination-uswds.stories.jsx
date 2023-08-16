import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

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
  page,
  pages,
  'max-page-list-length': maxPageListLength,
  unbounded
}) => {
  return (
    <va-pagination
      page={page}
      pages={pages}
      max-page-list-length={maxPageListLength}
      uswds
      unbounded={unbounded} />
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