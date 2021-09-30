import React from 'react';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import { expect } from 'chai';
import sinon from 'sinon';

import ProcessList from './ProcessList.jsx';

const crumbs = [
  <a href="/" key="1">
    Link 1
  </a>,
  <a href="/test1" key="2">
    Link 2
  </a>,
  <a href="/test2" key="3">
    Link 3
  </a>,
];

describe('<ProcessList>', () => {
  it('renders', () => {
    const tree = shallow(<ProcessList>{crumbs}</ProcessList>);

    expect(tree).to.exist;
    tree.unmount();
  });

  it('should render list items with correct props', () => {
    const tree = shallow(<ProcessList>{crumbs}</ProcessList>);

    const olItem = tree.find('ol');
    const listItems = tree.find('li');
    const aItems = tree.find('a');

    expect(olItem.props()['role']).to.equal('list');

    expect(olItem.length).to.equal(1);
    expect(listItems.length).to.equal(3);
    expect(aItems.length).to.equal(3);
    expect(listItems.at(0).props()['className']).to.equal(
      'process-step list-one',
    );
    expect(listItems.at(1).props()['className']).to.equal(
      'process-step list-two',
    );
    expect(listItems.at(2).props()['className']).to.equal(
      'process-step list-three',
    );
    expect(listItems.at(0).text()).to.equal('Link 1');
    expect(listItems.at(1).text()).to.equal('Link 2');
    expect(listItems.at(2).text()).to.equal('Link 3');

    tree.unmount();
  });

  it('should pass aXe check when showing full breadcrumb', () =>
    axeCheck(<ProcessList>{crumbs}</ProcessList>));
});
