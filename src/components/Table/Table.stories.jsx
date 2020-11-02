import React from 'react';

import Table from './Table';

export default {
  title: 'Library/Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

const defaultArgs = {
  currentSort: {
    value: 'column1',
    order: 'ASC',
  },
  data: [
    {
      column1: 'Testing',
      column2: 'Moooore testing',
    },
    {
      column1: 'Second row',
      column2: 'Some things',
    },
  ],
  fields: [
    {
      label: 'Column 1',
      value: 'column1',
    },
    {
      label: 'Column 2',
      value: 'column2',
    },
  ],
};

/**
 * Use this for informational purposes.
 */
export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Unsortable = Template.bind({});
Unsortable.args = {
  ...defaultArgs,
  fields: [
    {
      label: 'Column 1',
      value: 'column1',
      nonSortable: true,
    },
    defaultArgs.fields[1],
  ],
};

/**
 * The first item in the first column is displayed as three dashes for a null value
 */
export const MissingData = Template.bind({});
MissingData.args = {
  ...defaultArgs,
  data: [
    {
      column1: null,
      column2: 'Things',
    },
    defaultArgs.data[1],
  ],
};

export const AlignLeft = Template.bind({});
AlignLeft.args = {
  ...defaultArgs,
  fields: [
    {
      label: 'Cost ($)',
      value: 'cost',
      alignLeft: true,
    },
    defaultArgs.fields[1],
  ],
  data: [
    {
      cost: 50.5,
      column2: 'Food',
    },
    {
      cost: 70.0,
      column2: 'Utilities',
    },
  ],
};
