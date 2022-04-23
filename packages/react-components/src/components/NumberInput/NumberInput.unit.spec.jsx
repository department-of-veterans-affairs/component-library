import React from 'react';
import { shallow } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';

import { makeField } from '../../helpers/fields.js';

import ReactTestUtils from 'react-dom/test-utils';
import NumberInput from './NumberInput';

chai.use(chaiAsPromised);

describe('<NumberInput>', () => {
  const testValue = makeField('');

  it('ensure value changes propagate', () => {
    let errorableInput;

    const updatePromise = new Promise(resolve => {
      errorableInput = ReactTestUtils.renderIntoDocument(
        <NumberInput
          field={testValue}
          label="test"
          onValueChange={update => {
            resolve(update);
          }}
        />,
      );
    });

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(
      errorableInput,
      'input',
    );
    input.value = '1';
    ReactTestUtils.Simulate.change(input);

    return expect(updatePromise).to.eventually.eql(makeField('1', false));
  });

  it('blurring the field calls the onBlur function', () => {
    let errorableInput;

    const updatePromise = new Promise(resolve => {
      errorableInput = ReactTestUtils.renderIntoDocument(
        <NumberInput
          field={testValue}
          label="test"
          onBlur={() => {
            resolve();
          }}
        />,
      );
    });

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(
      errorableInput,
      'input',
    );
    ReactTestUtils.Simulate.blur(input);

    return expect(updatePromise).to.eventually.be.fulfilled;
  });

  it('no error styles when errorMessage undefined', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        onValueChange={() => {}}
      />,
    );

    // No error classes.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-label')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-message')).to.have.lengthOf(0);

    // Ensure no unnecessary class names on label w/o error..
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.hasClass('foo')).to.be.false;

    // No error means no aria-describedby to not confuse screen readers.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-describedby')).to.be.undefined;
    tree.unmount();
  });

  it('no error styles when errorMessage is an empty string', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        errorMessage=""
        onValueChange={() => {}}
      />,
    );

    // No error classes.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-label')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-message')).to.have.lengthOf(0);

    // Ensure no unnecessary class names on label w/o error..
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.hasClass('foo')).to.be.false;

    // No error means no aria-describedby to not confuse screen readers.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-describedby')).to.be.undefined;
    tree.unmount();
  });

  it('has error styles when errorMessage is set', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        errorMessage="error message"
        onValueChange={() => {}}
      />,
    );

    // Ensure all error classes set.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(1);

    const labels = tree.find('.usa-input-error-label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.text()).to.equal('my label');

    const errorMessages = tree.find('.usa-input-error-message');
    expect(errorMessages).to.have.lengthOf(1);
    expect(errorMessages.text()).to.equal('Error error message');

    // No error means no aria-describedby to not confuse screen readers.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-describedby')).to.not.be.undefined;
    expect(inputs.prop('aria-describedby')).to.equal(errorMessages.prop('id'));
    tree.unmount();
  });

  it('required=false does not have required span', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        onValueChange={() => {}}
      />,
    );

    const label = tree.find('label');
    expect(label.text()).to.equal('my label');
    expect(label.find('span.required')).to.be.empty;
    tree.unmount();
  });

  it('required=true has required span', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        required
        onValueChange={() => {}}
      />,
    );

    const label = tree.find('label');
    expect(label.text()).to.contain('my label');
    expect(label.find('span.required')).to.exist;
    tree.unmount();
  });

  it('label attribute propagates', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        onValueChange={() => {}}
      />,
    );

    // Ensure label text is correct.
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.text()).to.equal('my label');

    // Ensure label htmlFor is attached to input id.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('id')).to.not.be.undefined;
    expect(inputs.prop('id')).to.equal(labels.prop('htmlFor'));
    tree.unmount();
  });

  it('has aria-describedby attribute when ariaDescribedby is set', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        ariaDescribedby="some-id"
        onValueChange={() => {}}
      />,
    );

    // Ensure no error.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);

    // No error, but ariaDescribedby contains an ID. It should exactly equal the
    // ID
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-describedby')).to.equal('some-id');
    tree.unmount();
  });

  it('has aria-described by attribute with id & errorMessage when set', () => {
    const tree = shallow(
      <NumberInput
        field={testValue}
        label="my label"
        ariaDescribedby="some-id"
        errorMessage="error message"
        onValueChange={() => {}}
      />,
    );

    // Ensure all error classes set.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(1);

    const errorMessages = tree.find('.usa-input-error-message');
    expect(errorMessages).to.have.lengthOf(1);
    expect(errorMessages.text()).to.equal('Error error message');

    const inputs = tree.find('input');
    // expect both the error span ID and the ariaDescribedby prop ID
    expect(inputs.prop('aria-describedby')).to.contain('some-id');
    expect(inputs.prop('aria-describedby')).to.contain(
      errorMessages.prop('id'),
    );
    tree.unmount();
  });

  it('passes aXe check', () => {
    const check = axeCheck(
      <NumberInput
        field={testValue}
        label="my label"
        onValueChange={() => {}}
      />,
    );
    return check;
  });
  it('passes aXe check with aria-describedby attribute', () => {
    const check = axeCheck(
      <NumberInput
        field={testValue}
        label="my label"
        onValueChange={() => {}}
        ariaDescribedby="some-id"
        errorMessage="error message"
      />,
    );
    return check;
  });
});
