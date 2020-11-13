import React from 'react';

import SortableTable from './SortableTable';

export default {
  title: 'Library/SortableTable',
  component: SortableTable,
};

const Template = args => <SortableTable {...args} />;

const defaultArgs = {
  currentSort: {
    value: 'year',
    order: 'ASC',
  },
  data: [
    {
      title: 'Declaration of Independence',
      description:
        'Statement adopted by the Continental Congress declaring independence from the British Empire',
      year: '1776',
    },
    {
      title: 'Bill of Rights',
      description:
        'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
      year: '1791',
    },
    {
      title: 'Declaration of Sentiments',
      description:
        'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.',
      year: '1848',
    },
    {
      title: 'Emancipation Proclamation',
      description:
        'An executive order granting freedom to slaves in designated southern states.',
      year: '1863',
    },
  ],
  fields: [
    {
      label: 'Document title',
      value: 'title',
    },
    {
      label: 'Description',
      value: 'description',
    },
    {
      label: 'Year',
      value: 'year',
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
      label: 'Document title',
      value: 'title',
      nonSortable: true,
    },
    defaultArgs.fields[1],
    defaultArgs.fields[2],
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
      title: 'A document',
      description: null,
      year: null,
    },
    defaultArgs.data[1],
  ],
};

export const CustomComponents = Template.bind({});
CustomComponents.args = {
  ...defaultArgs,
  data: [
    ...defaultArgs.data,
    {
      title: 'Social Security Act',
      description: (
        <>
          <div>
            An act to provide for the general welfare by establishing a system
            of Federal old-age benefits. Enables provisions for:
          </div>

          <ul>
            <li>aged persons</li>
            <li>blind persons</li>
            <li>dependent and crippled children</li>
            <li>maternal and child welfare</li>
            <li>public health</li>
            <li>unemployment compensation</li>
          </ul>
        </>
      ),
      year: '1935',
    },
  ],
};
