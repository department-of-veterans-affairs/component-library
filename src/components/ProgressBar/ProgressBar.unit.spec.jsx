import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';

import ProgressBar from './ProgressBar.jsx';

describe('<ProgressBar/>', () => {
  it('should render', () => {
    const tree = shallow(<ProgressBar percent={35} />);
    expect(tree.find('.progress-bar-inner')).to.have.length(1);
    tree.unmount();
  });

  it('should pass aXe check', () => axeCheck(<ProgressBar percent={35} label="aria label here"/>));
});
