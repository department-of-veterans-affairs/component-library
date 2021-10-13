import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';

import SearchMenu from './SearchMenu.jsx';

describe('<SearchMenu/>', () => {
  it('should render', () => {
    const tree = mount(
      <SearchMenu
        id="searchmenu"
        title="searchmenu title"
        isOpen
        clickHandler={() => {}}
      />,
    );
    expect(tree.children().text()).to.contain('Search');
    tree.unmount();
  });

  it('should pass aXe check when closed', () =>
    axeCheck(
      <SearchMenu
        id="searchmenu"
        title="searchmenu title"
        isOpen={false}
        clickHandler={() => {}}
      />,
    ));
  it('should pass aXe check when open', () =>
    axeCheck(
      <SearchMenu
        id="searchmenu"
        title="SearchMenu title"
        isOpen
        clickHandler={() => {}}
      />,
    ));
});
