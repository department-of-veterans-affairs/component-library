import React from 'react';
import { generateEventsDescription } from './events';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
} from './wc-helpers';

const accordionDocs = getWebComponentDocs('va-table');
// const accordionItem = getWebComponentDocs('va-accordion-item');

export default {
  title: 'Components/va-table',
  // subcomponents: componentStructure(accordionItem),
};

const Template = args => {
  const { data, ...rest } = args;
  return (
    <va-table {...rest}>
      {data.map(row => (
        <tr>
          {row.map(item => (
            <td>{item}</td>
          ))}
        </tr>
      ))}
    </va-table>
  );
};

const defaultArgs = {
  title: 'My table',
  col1: 'Document title',
  col2: 'Description',
  col3: 'Year',
  data: [
    [
      'Declaration of Independence',
      'Statement adopted by the Continental Congress declaring independence from the British Empire',
      '1776',
    ],
    [
      'Bill of Rights',
      'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
      '1791',
    ],
    [
      'Declaration of Sentiments',
      'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.',
      '1848',
    ],
    [
      'Emancipation Proclamation',
      'An executive order granting freedom to slaves in designated southern states.',
      '1863',
    ],
  ],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(accordionDocs);
