import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import RadioButtons from './RadioButtons.jsx';
import { makeField } from '../../helpers/fields.js';
import sinon from 'sinon';
import { testAnalytics } from '../../helpers/test-helpers';

describe('<RadioButtons>', () => {
  const nonExpandingOptions = ['yes', 'no'];
  const allExpandingOptions = [
    { value: 'yes', label: 'Yes', additional: 'Yes addtional' },
    { value: 'no', label: 'No', additional: 'No additional' },
  ];
  const someExpandingOptions = [
    'yes',
    { value: 'no', label: 'No', additional: 'No additional' },
    'maybe',
  ];
  const someExpandingOptionsWithId = [
    'yes',
    { value: 'no', label: 'No', additional: <span id="nope">Nope</span> },
    'maybe',
  ];

  it('calls onValueChange with value and dirty state', () => {
    let valueChanged;
    // shallowly render component with callback that alters valueChanged with passed argument
    const wrapper = mount(
      <RadioButtons
        label="test"
        options={nonExpandingOptions}
        value={makeField('test')}
        onValueChange={value => {
          valueChanged = value;
        }}
      />,
    );

    // simulate change event on first input
    wrapper.find('input').first().simulate('change');

    // verify that change event value matches first value in options passed to component
    expect(valueChanged.value).to.eql(nonExpandingOptions[0]);
    expect(valueChanged.dirty).to.eql(true);
    wrapper.unmount();
  });

  it('renders label htmlFor attribute with correct input id attribute value', () => {
    const wrapper = shallow(
      <RadioButtons
        label="test"
        options={nonExpandingOptions}
        value={makeField('test')}
        onValueChange={value => value}
      />,
    );

    // gather input id and label for attributes from render component
    const inputIds = wrapper.find('input').map(inputId => inputId.prop('id'));
    const labelFors = wrapper
      .find('label')
      .map(labelFor => labelFor.prop('htmlFor'));

    // assert each input id attribute value matches respective label for attribute value
    inputIds.forEach((inputId, index) =>
      expect(inputId).to.eql(labelFors[index]),
    );
    wrapper.unmount();
  });

  it('renders a legend tag with the label attribute', () => {
    const labelValue = 'test';
    const wrapper = shallow(
      <RadioButtons
        label={labelValue}
        options={nonExpandingOptions}
        value={makeField('test')}
        onValueChange={value => value}
      />,
    );

    // assert that legend element was rendered with label value as its text
    const legendText = wrapper.find('legend').text();
    expect(legendText).to.eql(labelValue);
    wrapper.unmount();
  });

  it('renders a aria-describedby when option is selected', () => {
    const wrapper = shallow(
      <RadioButtons
        label="test"
        options={someExpandingOptionsWithId}
        value={makeField('no')}
        onValueChange={value => value}
        ariaDescribedby={['yep', 'nope', 'maybep']}
      />,
    );

    // Only the selected radio should have an aria-describedby defined
    const result = [null, 'nope', null];
    wrapper.find('input').forEach((input, index) => {
      expect(input.prop('aria-describedby')).to.eql(result[index]);
    });
    wrapper.unmount();
  });

  it('passes aXe check when only non-expanding options are rendered', () => {
    const check = axeCheck(
      <RadioButtons
        label="test"
        options={nonExpandingOptions}
        value={makeField('test')}
        onValueChange={value => value}
      />,
    );
    return check;
  });

  it('passes aXe check when only expanding options are rendered', () => {
    const check = axeCheck(
      <RadioButtons
        label="test"
        options={allExpandingOptions}
        value={makeField('test')}
        onValueChange={value => value}
      />,
    );
    return check;
  });

  it('passes aXe check when non-expanding and expanding options rendered', () => {
    const check = axeCheck(
      <RadioButtons
        label="test"
        options={someExpandingOptions}
        value={makeField('test')}
        onValueChange={value => value}
      />,
    );
    return check;
  });

  it('passes aXe check when aria-describedby targets expanding id', () => {
    const check = axeCheck(
      <RadioButtons
        label="test"
        options={someExpandingOptionsWithId}
        value={makeField('no')}
        onValueChange={value => value}
        ariaDescribedby={[null, 'nope', null]}
      />,
    );
    return check;
  });
  it('passes aXe check when aria-describedby does not target expanding id', () => {
    const check = axeCheck(
      <RadioButtons
        label="test"
        options={someExpandingOptionsWithId}
        value={makeField('maybe')}
        onValueChange={value => value}
        ariaDescribedby={[null, 'nope', null]}
      />,
    );
    return check;
  });

  describe('analytics event', function () {
    it('should NOT be triggered when enableAnalytics is not true', () => {
      const wrapper = mount(
        <RadioButtons
          label="test"
          options={nonExpandingOptions}
          value={makeField('test')}
          onValueChange={value => value}
        />,
      );

      const spy = testAnalytics(wrapper, () => {
        wrapper.find('[type="radio"]').first().simulate('change');
      });

      expect(spy.called).to.be.false;

      wrapper.unmount();
    });

    it('should be triggered when RadioButton is selected', () => {
      const wrapper = mount(
        <RadioButtons
          label="test"
          options={nonExpandingOptions}
          value={makeField('test')}
          onValueChange={value => value}
          enableAnalytics
          required={false}
        />,
      );

      const spy = testAnalytics(wrapper, () => {
        wrapper.find('[type="radio"]').first().simulate('change');
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'RadioButtons',
            action: 'change',
            details: {
              label: 'test',
              optionLabel: nonExpandingOptions[0],
              required: false,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      wrapper.unmount();
    });
  });
});
