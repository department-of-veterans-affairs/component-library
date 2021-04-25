import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import CheckboxGroup from './CheckboxGroup.jsx';
import sinon from 'sinon';
import { testAnalytics } from '../../helpers/test-helpers';

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
      const spy = testAnalytics(wrapper, () => {
        const event = {
          target: {
            value: options[0].value,
            label: options[0].label,
            checked: true,
          },
        };

        wrapper.find('[type="checkbox"]').first().simulate('change', event);
      });

      expect(spy.called).to.be.false;
    });

    it('should be triggered when field is checked', () => {
      const wrapper = mount(
        <CheckboxGroup
          label="my label"
          options={options}
          values={state}
          onValueChange={(option, checked) => {
            state[option.value] = checked;
          }}
          enableAnalytics
          required={false}
        />,
      );

      const spy = testAnalytics(wrapper, () => {
        const event = {
          target: {
            value: options[0].value,
            label: options[0].label,
            checked: true,
          },
        };

        wrapper.find('[type="checkbox"]').first().simulate('change', event);
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'CheckboxGroup',
            action: 'change',
            details: {
              label: 'my label',
              optionLabel: options[0].value,
              required: false,
            },
          }),
        ),
      ).to.be.true;
    });
  });
});
