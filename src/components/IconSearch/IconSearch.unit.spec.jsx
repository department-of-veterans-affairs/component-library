import React from 'react';
import IconSearch from './IconSearch.jsx';
import { axeCheck } from '../../helpers/test-helpers';

describe('<IconSearch />', () => {
  it('should pass a basic aXe check', () =>
    axeCheck(
      <IconSearch
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel="Favorite"
      />,
    ));
});
