import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import CheckboxGroup from './CheckboxGroup.jsx';
import sinon from 'sinon';

describe('<CheckboxGroup>', () => {
  const options = [
    { value: 'yes', label: 'Yes', additional: <p>additional content</p> },
    { value: 'no', label: 'No' },
  ];

  it('should render', () => {
    const state = { yes: false, no: false };
    const tree = mount(
      <CheckboxGroup
        label="my label"
        options={options}
        values={state}
        onValueChange={(option, checked) => {
          state[option.value] = checked;
        }}
      />,
    );

    expect(tree.find('input').length).to.equal(2);
    expect(tree.find('label').at(0).text()).to.equal('Yes');
    expect(tree.find('label').at(1).text()).to.equal('No');
    expect(tree.find('legend').text()).to.equal('my label');
    tree.unmount();
  });

  it('should reveal additional content', () => {
    const state = { yes: true, no: false };
    const tree = mount(
      <CheckboxGroup
        label="my label"
        options={options}
        values={state}
        onValueChange={(option, checked) => {
          state[option.value] = checked;
        }}
      />,
    );

    expect(tree.find('p').text()).to.equal('additional content');
    tree.unmount();
  });

  it('should pass aXe check', () => {
    const state = { yes: false, no: false };

    return axeCheck(
      <CheckboxGroup
        label="my label"
        options={options}
        values={state}
        onValueChange={(option, checked) => {
          state[option.value] = checked;
        }}
      />,
    );
  });

  describe('analytics event', function () {
    const state = { yes: true, no: false };

    it('should NOT be triggered when enableAnalytics is not true', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const wrapper = mount(
        <CheckboxGroup
          label="my label"
          options={options}
          values={state}
          onValueChange={(option, checked) => {
            state[option.value] = checked;
          }}
        />,
      );

      const event = {
        target: {
          value: options[0].value,
          label: options[0].label,
          checked: true,
        },
      };

      wrapper.find('[type="checkbox"]').first().simulate('change', event);

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      expect(handleAnalyticsEvent.called).to.be.false;
    });

    it('should be triggered when field is checked', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const wrapper = mount(
        <CheckboxGroup
          label="my label"
          options={options}
          values={state}
          onValueChange={(option, checked) => {
            state[option.value] = checked;
          }}
          enableAnalytics
        />,
      );

      const event = {
        target: {
          value: options[0].value,
          label: options[0].label,
          checked: true,
        },
      };

      wrapper.find('[type="checkbox"]').first().simulate('change', event);

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'CheckboxGroup',
            action: 'change',
            details: {
              label: 'my label',
              clickLabel: options[0].value,
            },
          }),
        ),
      ).to.be.true;
    });
  });
});
