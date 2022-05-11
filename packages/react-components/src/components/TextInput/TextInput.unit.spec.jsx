import React from 'react';
import { shallow, mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import { expect } from 'chai';
import i18next from 'i18next';
import TextInput from './TextInput.jsx';
import { makeField } from '../../helpers/fields.js';
import sinon from 'sinon';
import { testAnalytics } from '../../helpers/test-helpers';

describe('<TextInput>', () => {
  before(() => {
    i18next.init({
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            required: 'Required',
          },
        },
      },
    });
  });
  it('calls onValueChange with input value and dirty state', () => {
    let valueChanged;
    // shallowly render component with callback that alters valueChanged with passed argument
    const wrapper = mount(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => {
          valueChanged = value;
        }}
      />,
    );

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'hello' } });
    expect(valueChanged.value).to.eql('hello');
    expect(valueChanged.dirty).to.eql(false);
    wrapper.unmount();
  });

  it('calls onValueChange with dirty state on blur', () => {
    let valueChanged;
    // shallowly render component with callback that alters valueChanged with passed argument
    const wrapper = mount(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => {
          valueChanged = value;
        }}
      />,
    );

    wrapper.find('input').first().simulate('blur');
    expect(valueChanged.dirty).to.eql(true);
    wrapper.unmount();
  });

  it('renders a label and a placeholder', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        placeholder="Placeholder"
        onValueChange={value => value}
      />,
    );

    const label = wrapper.find('label');
    const input = wrapper.find('input');

    expect(label.first().text()).to.eql('test');
    expect(input.first().prop('placeholder')).to.eql('Placeholder');
    wrapper.unmount();
  });

  it('renders error styling when errorMessage attribute is present', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        errorMessage="errorMessage"
        onValueChange={value => value}
      />,
    );

    const errorStyles = [
      '.usa-input-error-label',
      '.usa-input-error',
      '.usa-input-error-message',
    ];
    // assert that each error style corresponds to one component
    errorStyles.forEach(style =>
      expect(wrapper.find(style)).to.have.lengthOf(1),
    );
    wrapper.unmount();
  });

  it('renders aria-describedby attribute when errorMessage attribute is present', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        errorMessage="errorMessage"
        onValueChange={value => value}
      />,
    );

    const input = wrapper.find('input');
    const errorMessageId = wrapper
      .find('.usa-input-error-message')
      .first()
      .prop('id');
    expect(input.prop('aria-describedby')).to.eql(errorMessageId);
    wrapper.unmount();
  });

  it('renders an error message when errorMessage attribute is present', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        errorMessage="errorMessage"
        onValueChange={value => value}
      />,
    );

    const errorMessage = wrapper.find('.usa-input-error-message');
    expect(errorMessage).to.have.lengthOf(1);
    expect(errorMessage.text()).to.eql('Error errorMessage');
    wrapper.unmount();
  });

  it('renders no error styling when errorMessage attribute is not present', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => value}
      />,
    );

    const errorStyles = [
      '.usa-input-error-label',
      '.usa-input-error',
      '.usa-input-error-message',
    ];
    // assert that each error style corresponds to one component
    errorStyles.forEach(style =>
      expect(wrapper.find(style)).to.have.lengthOf(0),
    );
    wrapper.unmount();
  });

  it('renders no aria-describedby attribute when errorMessage attribute is not present', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => value}
      />,
    );

    expect(wrapper.find('input').prop('aria-describedby')).to.not.exist;
    wrapper.unmount();
  });

  it('renders no error message when errorMessage attribute is not present', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => value}
      />,
    );

    expect(wrapper.find('.usa-input-error-message')).to.have.lengthOf(0);
    wrapper.unmount();
  });

  it('renders a required asterisk when required is true', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        required
        onValueChange={value => value}
      />,
    );

    expect(wrapper.find('label').text()).to.eql('test(*Required)');
    wrapper.unmount();
  });

  it('renders no required asterisk when required is false', () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => value}
      />,
    );

    expect(wrapper.find('label').text()).to.eql('test');
    wrapper.unmount();
  });

  it("renders the input id as label's for attribute value", () => {
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => value}
      />,
    );

    const inputId = wrapper.find('input').first().prop('id');
    const labelFor = wrapper.find('label').first().prop('htmlFor');
    expect(inputId).to.eql(labelFor);
    wrapper.unmount();
  });

  it('passes aXe check when no error present', () => {
    const check = axeCheck(
      <TextInput
        field={makeField('')}
        label="test"
        placeholder="Placeholder"
        onValueChange={value => value}
      />,
    );

    return check;
  });

  it('passes aXe check when error present', () => {
    const check = axeCheck(
      <TextInput
        field={makeField('')}
        label="test"
        placeholder="Placeholder"
        errorMessage="error"
        onValueChange={value => value}
      />,
    );

    return check;
  });

  it('passes aXe check when error and ariaDescribedBy present', () => {
    const check = axeCheck(
      <TextInput
        field={makeField('')}
        label="test"
        placeholder="Placeholder"
        errorMessage="error"
        onValueChange={value => value}
        ariaDescribedBy="described-by-this-id"
      />,
    );

    return check;
  });

  it('renders ariaDescribedBy as aria-describedby attribute when errorMessage attribute is not present', () => {
    const describedById = 'described-by-this-id';
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        onValueChange={value => value}
        ariaDescribedBy={describedById}
      />,
    );

    const attribute = wrapper.find('input').prop('aria-describedby');
    expect(attribute).to.eql(describedById);
    wrapper.unmount();
  });

  it('renders concatenated aria-describedby attribute when errorMessage attribute and ariaDescribedBy is present', () => {
    const describedById = 'described-by-this-id';
    const wrapper = shallow(
      <TextInput
        field={makeField('')}
        label="test"
        errorMessage="errorMessage"
        onValueChange={value => value}
        ariaDescribedBy={describedById}
      />,
    );

    const input = wrapper.find('input');
    const errorMessageId = wrapper
      .find('.usa-input-error-message')
      .first()
      .prop('id');
    const concatenatedAriaDescribedByIds = `${describedById} ${errorMessageId}`;
    const ariaDescribedBy = input.prop('aria-describedby');
    expect(ariaDescribedBy).to.eql(concatenatedAriaDescribedByIds);
    wrapper.unmount();
  });

  describe('analytics event', function () {
    it('should NOT be triggered when enableAnalytics is not true', () => {
      const wrapper = mount(
        <TextInput
          field={makeField('Test Text')}
          label="test"
          onValueChange={() => {}}
        ></TextInput>,
      );

      const spy = testAnalytics(wrapper, () => {
        wrapper.find('input[type="text"]').first().simulate('blur');
      });

      expect(spy.called).to.be.false;
    });

    it('should be triggered when field is blurred', () => {
      const wrapper = mount(
        <TextInput
          field={makeField('Test Text')}
          label="test"
          onValueChange={() => {}}
          enableAnalytics
        ></TextInput>,
      );

      const spy = testAnalytics(wrapper, () => {
        wrapper.find('input[type="text"]').first().simulate('blur');
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'TextInput',
            action: 'blur',
            details: {
              label: 'test',
              value: 'Test Text',
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;
    });
  });
});
