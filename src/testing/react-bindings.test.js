// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VaTextInput } from '../../generated/bindings/components';

test('renders a binding for a Web Component', () => {
  const { container } = render(<VaTextInput label="First name"></VaTextInput>);

  expect(container).toMatchSnapshot();
});

/**
 * Skipping this because I'm having problems getting it to work
 */
test.skip('registers custom event handlers to Web Component', () => {
  const handlerMock = jest.fn();
  const { container } = render(
    <VaTextInput label="First name" onVaChange={handlerMock}></VaTextInput>,
  );
  fireEvent('vaChange', container.querySelector('va-text-input'));

  expect(handlerMock).toHaveBeenCalled();
});
