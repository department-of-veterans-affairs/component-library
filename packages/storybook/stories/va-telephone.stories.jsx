import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

export default {
  title: 'Components/va-telephone',
};

const Template = ({
  contact,
  extension,
  inactive,
  international,
  ariaDescribedby,
}) => {
  return (
    <div>
      {ariaDescribedby && (
        <span id={ariaDescribedby}>Phone number title: </span>
      )}
      <va-telephone
        contact={contact}
        extension={extension}
        inactive={inactive}
        international={international}
        aria-describedby={ariaDescribedby}
      ></va-telephone>
    </div>
  );
};

const defaultArgs = {
  contact: '8773459876',
  inactive: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(telephoneDocs);

export const ThreeDigitNumber = Template.bind({});
ThreeDigitNumber.args = {
  ...defaultArgs,
  contact: '711',
};

export const Extension = Template.bind({});
Extension.args = {
  ...defaultArgs,
  extension: '123',
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...defaultArgs,
  inactive: true,
};

export const International = Template.bind({});
International.args = {
  ...defaultArgs,
  international: true,
};

export const AriaDescribedBy = Template.bind({});
AriaDescribedBy.args = {
  ...defaultArgs,
  ariaDescribedby: 'numberDescription',
};
