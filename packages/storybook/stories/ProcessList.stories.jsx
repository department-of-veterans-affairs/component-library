import React from 'react';
import {ProcessList} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/ProcessList/ProcessList',
  component: ProcessList,
};

const Template = () => (
  <ProcessList>
    <div key="1">
      <b>Heading for step one.</b>
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
    <div key="2">
      <b>Heading for step two.</b>
      <br />
      Sed sed mi mattis orci posuere suscipit. Nunc eu sapien sit amet nibh
      finibus rutrum. Duis sit amet libero sapien. Nam cursus lobortis
      tincidunt.
    </div>
    <div key="3">
      <b>Heading for step three.</b>
      <br />
      Fusce sit amet egestas elit, id suscipit dolor. Nam sed augue nibh. In
      euismod aliquam lacinia
    </div>
  </ProcessList>
);

export const Default = Template.bind({});
