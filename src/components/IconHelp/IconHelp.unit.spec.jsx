import React from 'react';
import IconHelp from './IconHelp.jsx';
import { axeCheck } from '../../helpers/test-helpers';

describe('<IconHelp />', () => {
  it('should pass a basic aXe check', () =>
    axeCheck(
      <IconHelp
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel="Favorite"
      />,
    ));
});
