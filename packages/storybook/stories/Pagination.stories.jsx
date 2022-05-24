import React, { useState } from 'react';
import Pagination from '../../react-components/src/components/Pagination/Pagination';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    componentSubtitle: 'Pagination React component',
    docs: {
      page: () => (
        <StoryDocs
          data={{
            componentName: 'Pagination',
          }}
        />
      ),
    },
  },
};

const Template = args => {
  const [page, setPage] = useState(args.page);
  const onPageSelect = pageNumber => setPage(pageNumber);
  return <Pagination {...args} page={page} onPageSelect={onPageSelect} />;
};

const defaultArgs = {
  page: 3,
  pages: 5,
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const ShowLastPage = Template.bind({});
ShowLastPage.args = { ...defaultArgs, pages: 100, showLastPage: true };
