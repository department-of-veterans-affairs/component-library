import React from 'react';
import { shallow } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import { expect } from 'chai';
import sinon from 'sinon';

import ErrorableFileInput from './ErrorableFileInput';

describe('<ErrorableFileInput>', () => {
  it('no error styles when errorMessage undefined', () => {
    const tree = shallow(
      <ErrorableFileInput buttonText="my label" onChange={_update => {}} />,
    );

    // No error classes.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-label')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-message')).to.have.lengthOf(0);
    tree.unmount();
  });

  it('has error styles when errorMessage is set', () => {
    const tree = shallow(
      <ErrorableFileInput
        buttonText="my label"
        errorMessage="error message"
        onChange={_update => {}}
      />,
    );

    expect(tree.find('.usa-input-error-message').text()).to.equal(
      'Error error message',
    );
    tree.unmount();
  });

  it('onChange fires and clears input', () => {
    const onChange = sinon.spy();
    const tree = shallow(
      <ErrorableFileInput buttonText="my label" onChange={onChange} />,
    );

    const event = {
      target: {
        files: [{}],
        value: 'asdfasdf',
      },
    };

    tree.instance().handleChange(event);

    expect(onChange.called).to.be.true;
    expect(event.target.value).to.be.null;
    tree.unmount();
  });

  it('passes aXe check', () => {
    const check = axeCheck(<ErrorableFileInput buttonText="my label" />, [
      'aria-allowed-role',
    ]);
    return check;
  });
});
