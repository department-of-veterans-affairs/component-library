import React from 'react';
import IconUser from './IconUser.jsx';
import { axeCheck } from '../../helpers/test-helpers';

describe('<IconUser />', () => {
  it('should pass a basic aXe check', () =>
    axeCheck(
      <IconUser
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel="Favorite"
      />,
    ));
});
