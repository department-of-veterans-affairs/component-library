import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import SystemDownView from './SystemDownView.jsx';

describe('<SystemDownView>', () => {
  it('should render', () => {
    const tree = shallow(
      <SystemDownView
        messageLine1="This is the first line"
        messageLine2="This is the second line"
      />,
    );
    expect(tree.text()).to.contain('This is the first line');
    tree.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(
      <SystemDownView
        messageLine1="This is the first line"
        messageLine2="This is the second line"
      />,
    ));
});
