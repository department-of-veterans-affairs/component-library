import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';

import Select from './Select.jsx';
import { makeField } from '../../helpers/fields.js';
import sinon from 'sinon';
import { testAnalytics } from '../../helpers/test-helpers';

chai.use(chaiAsPromised);

describe('<Select>', () => {
  const testValue = makeField('');
  const options = [
    { value: 1, label: 'first' },
    { value: 2, label: 'second' },
  ];

  it('calls onValueChange with input value', () => {
    let valueChanged;
    // render component with callback that alters valueChanged with passed argument
    const wrapper = mount(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={value => {
          valueChanged = value;
        }}
      />,
    );

    wrapper
      .find('select')
      .first()
      .simulate('change', { target: { value: 'hello' } });
    expect(valueChanged.value).to.eql('hello');
    wrapper.unmount();
  });

  it('no error styles when errorMessage undefined', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    );

    // No error classes.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-label')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-message')).to.have.lengthOf(0);

    // Ensure no unnecessary class names on label w/o error.
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.hasClass('')).to.be.true;

    // No error means no aria-describedby to not confuse screen readers.
    const selects = tree.find('select');
    expect(selects).to.have.lengthOf(1);
    expect(selects.find('aria-describedby')).to.have.lengthOf(0);
    tree.unmount();
  });

  it('no error styles when errorMessage is null', () => {
    const tree = shallow(
      <Select
        errorMessage={null}
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    );

    // No error classes.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-label')).to.have.lengthOf(0);
    expect(tree.find('.usa-input-error-message')).to.have.lengthOf(0);

    // Ensure no unnecessary class names on label w/o error.
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.hasClass('')).to.be.true;

    // No error means no aria-describedby to not confuse screen readers.
    const selects = tree.find('select');
    expect(selects).to.have.lengthOf(1);
    expect(selects.find('aria-describedby')).to.have.lengthOf(0);
    tree.unmount();
  });

  it('should pass aXe check when errorMessage is undefined', () =>
    axeCheck(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    ));

  it('has error styles when errorMessage is set', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        errorMessage="error message"
        value={testValue}
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
    expect(errorMessages.text()).to.equal('error message');

    // No error means no aria-describedby to not confuse screen readers.
    const selects = tree.find('select');
    expect(selects).to.have.lengthOf(1);

    const idNum = selects.props().id.split('-')[2];
    expect(selects.prop('aria-describedby')).to.not.be.undefined;
    expect(selects.prop('aria-describedby')).to.equal(
      `errorable-select-${idNum}-error-message`,
    );
    tree.unmount();
  });

  it('should pass aXe check when errorMessage is set', () =>
    axeCheck(
      <Select
        label="my label"
        options={options}
        errorMessage="error message"
        value={testValue}
        onValueChange={() => {}}
      />,
    ));

  it('required=false does not have required asterisk', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    );
    expect(tree.find('label').text()).to.equal('my label');
    tree.unmount();
  });

  it('span should exist when ariaLiveRegionText is populated', () => {
    const tree = shallow(
      <Select
        ariaLiveRegionText="The following option was selected: "
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    );
    expect(tree.find('span').html()).to.include(`role="region"`);
    expect(tree.find('span').text()).to.include(
      'The following option was selected: ',
    );
    tree.unmount();
  });

  it('should pass aXe check when it is not required', () =>
    axeCheck(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    ));

  it('required=true has required asterisk', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        required
        value={testValue}
        onValueChange={() => {}}
      />,
    );
    expect(tree.find('label').text()).to.equal('my label(*Required)');
    tree.unmount();
  });

  it('should pass aXe check when it is required', () =>
    axeCheck(
      <Select
        label="my label"
        options={options}
        required
        value={testValue}
        onValueChange={() => {}}
      />,
    ));

  it('label attribute propagates', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
      />,
    );

    // Ensure label text is correct.
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.text()).to.equal('my label');

    // Ensure label htmlFor is attached to select id.
    const selects = tree.find('select');
    const idNum = selects.props().id.split('-')[2];
    expect(selects).to.have.lengthOf(1);
    expect(selects.find('id')).to.not.be.undefined;
    expect(selects.prop('id')).to.equal(`errorable-select-${idNum}`);
    tree.unmount();
  });

  it('has error styles when errorMessage is set', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        value={testValue}
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
    );

    // Ensure all error classes set.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(0);

    // No error means no aria-describedby to not confuse screen readers.
    const selects = tree.find('select');
    expect(selects).to.have.lengthOf(1);

    expect(selects.prop('aria-describedby')).to.equal('test-id');
    tree.unmount();
  });

  it('has error styles when errorMessage is set', () => {
    const tree = shallow(
      <Select
        label="my label"
        options={options}
        errorMessage="error message"
        value={testValue}
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
    );

    // Ensure all error classes set.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(1);

    // No error means no aria-describedby to not confuse screen readers.
    const selects = tree.find('select');
    expect(selects).to.have.lengthOf(1);

    const idNum = selects.props().id.split('-')[2];
    expect(selects.prop('aria-describedby')).to.contain('test-id');
    expect(selects.prop('aria-describedby')).to.contain(
      `errorable-select-${idNum}-error-message`,
    );
    tree.unmount();
  });

  describe('analytics event', function () {
    it('should NOT be triggered when enableAnalytics is not true', () => {
      const wrapper = shallow(
        <Select
          label="my label"
          options={options}
          value={testValue}
          onValueChange={() => {}}
        />,
      );

      const spy = testAnalytics(wrapper, () => {
        wrapper
          .find('select')
          .first()
          .simulate('change', { target: { value: 'first' } });
      });

      expect(spy.called).to.be.false;

      wrapper.unmount();
    });

    it('should be triggered when Select option is changed', () => {
      const wrapper = shallow(
        <Select
          label="my label"
          options={options}
          value={testValue}
          onValueChange={() => {}}
          enableAnalytics
        />,
      );

      const spy = testAnalytics(wrapper, () => {
        wrapper
          .find('select')
          .first()
          .simulate('change', { target: { value: 'first' } });
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'Select',
            action: 'change',
            details: {
              label: 'my label',
              selectLabel: 'first',
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      wrapper.unmount();
    });
  });
});
