import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import CheckboxGroup from './CheckboxGroup.jsx';

describe('<CheckboxGroup>', () => {
  const options = [
    { value: 'yes', label: 'Yes', additional: <p>additional content</p> },
    { value: 'no', label: 'No' },
  ];

  it('should render', () => {
    const state = { yes: false, no: false };
    const tree = mount(
      <CheckboxGroup
        label="my label"
        options={options}
        values={state}
        onValueChange={(option, checked) => {
          state[option.value] = checked;
        }}
      />,
    );

    expect(tree.find('input').length).to.equal(2);
    expect(
      tree
        .find('label')
        .at(0)
        .text(),
    ).to.equal('Yes');
    expect(
      tree
        .find('label')
        .at(1)
        .text(),
    ).to.equal('No');
    expect(tree.find('legend').text()).to.equal('my label');
    tree.unmount();
  });

  it('should reveal additional content', () => {
    const state = { yes: true, no: false };
    const tree = mount(
      <CheckboxGroup
        label="my label"
        options={options}
        values={state}
        onValueChange={(option, checked) => {
          state[option.value] = checked;
        }}
      />,
    );

    expect(tree.find('p').text()).to.equal('additional content');
    tree.unmount();
  });

  it('should pass aXe check', () => {
    const state = { yes: false, no: false };

    return axeCheck(
      <CheckboxGroup
        label="my label"
        options={options}
        values={state}
        onValueChange={(option, checked) => {
          state[option.value] = checked;
        }}
      />,
    );
  });
});
