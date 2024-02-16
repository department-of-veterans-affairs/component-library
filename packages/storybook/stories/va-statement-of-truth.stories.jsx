import React, { useState, useEffect } from 'react';
import { VaStatementOfTruth } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaStatementOfTruth.displayName = 'VaStatementOfTruth';

const statementOfTruthDocs = getWebComponentDocs('va-statement-of-truth');

export default {
  title: 'Components/Statement of Truth USWDS',
  id: 'uswds/va-statement-of-truth',
  parameters: {
    componentSubtitle: `va-statement-of-truth web component`,
    docs: {
      page: () => <StoryDocs data={statementOfTruthDocs} />,
    },
  },
};

const defaultArgs = {
  heading: 'Statement of Truth',
  inputValue: '',
  inputError: '',
  checkboxError: '',
  inputMessageAriaDescribedy: '',
  checked: false,
  inputLabel: 'Your full name',
  checkboxLabel: 'I certify the information above is correct and true to the best of my knowledge and belief.',
};

const Template = ({
  heading,
  inputValue,
  inputError,
  checkboxError,
  inputMessageAriaDescribedy,
  checked,
  inputLabel,
  checkboxLabel
 }) => {
  return (
    <div style={{ maxWidth: 600 }}>
      <VaStatementOfTruth
        heading={heading}
        inputValue={inputValue}
        inputError={inputError}
        checkboxError={checkboxError}
        inputMessageAriaDescribedby={inputMessageAriaDescribedy}
        checked={checked}
        inputLabel={inputLabel}
        checkboxLabel={checkboxLabel}
        onVaInputChange={e => console.log(e, 'vaInputChange fired')}
        onVaInputBlur={e => console.log(e, 'vaInputBlur fired')}
        onVaCheckboxChange={e => console.log(e, 'vaCheckboxChange fired')}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere architecto sequi minus. Ab iusto adipisci natus error repudiandae totam quo earum dolorum ullam sed, dicta quidem quod at sapiente. Obcaecati?
        </VaStatementOfTruth>
    </div>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const WithInputError = Template.bind(null);
WithInputError.args = { ...defaultArgs, inputError: 'Please enter your name exactly as it appears on your application: John Smith' }

export const WithCheckboxError = Template.bind(null);
WithCheckboxError.args = { ...defaultArgs, checkboxError: 'You must certify by checking the box' }

export const WithCustomHeading = Template.bind(null);
WithCustomHeading.args = { ...defaultArgs, heading: 'This is a custom heading' }

export const WithPrefilling = Template.bind(null);
WithPrefilling.args = { ...defaultArgs, inputValue: 'Jane Doe', checked: true }