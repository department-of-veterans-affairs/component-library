import React from 'react';
import AcceptTermsPrompt from './AcceptTermsPrompt';

export default {
  title: 'Library/AcceptTermsPrompt',
  component: AcceptTermsPrompt,
};

const Template = (args) => <AcceptTermsPrompt terms={{ ...args }} />;

const defaultArgs = {
  title: 'Terms and Conditions',
  headerContent: 'test header content',
  footerContent: 'test footer content',
  yesContent: 'accept terms and conditions',
  termsContent: `<div>
      <p>
        <strong>Terms and Conditions for Medical Information</strong>
      </p>
      <p>
        The Department of Veterans Affairs (VA) owns and manages the website
        VA.gov. VA.gov allows you to use online tools that display parts of your
        personal health information. This health information is only displayed
        on VA.gov—the information is stored on VA protected federal computer
        systems and networks. VA supports the secure storage and transmission of
        all information on VA.gov.
      </p>
      <p>
        <strong>Terms and Conditions for Medical Information</strong>
      </p>
      <p>
        The Department of Veterans Affairs (VA) owns and manages the website
        VA.gov. VA.gov allows you to use online tools that display parts of your
        personal health information. This health information is only displayed
        on VA.gov—the information is stored on VA protected federal computer
        systems and networks. VA supports the secure storage and transmission of
        all information on VA.gov.
      </p>
      <p>
        <strong>Terms and Conditions for Medical Information</strong>
      </p>
      <p>
        The Department of Veterans Affairs (VA) owns and manages the website
        VA.gov. VA.gov allows you to use online tools that display parts of your
        personal health information. This health information is only displayed
        on VA.gov—the information is stored on VA protected federal computer
        systems and networks. VA supports the secure storage and transmission of
        all information on VA.gov.
      </p>
    </div>`,
};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
};
