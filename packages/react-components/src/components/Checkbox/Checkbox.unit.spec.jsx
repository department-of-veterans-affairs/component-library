import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import Checkbox from './Checkbox.jsx';
import sinon from 'sinon';
import { testAnalytics } from '../../helpers/test-helpers';

describe('<Checkbox/>', () => {
  it('should render without the labelAboveCheckbox', () => {
    const tree = shallow(<Checkbox label="test" onValueChange={() => {}} />);
    expect(tree.text()).to.contain('test');
    tree.unmount();
  });

  it('should render with the labelAboveCheckbox', () => {
    const tree = shallow(
      <Checkbox
        label="test"
        labelAboveCheckbox="this is a checkbox"
        onValueChange={() => {}}
      />,
    );
    expect(tree.text()).to.contain('test');
    expect(tree.text()).to.contain('this is a checkbox');
    tree.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(<Checkbox label="test" onValueChange={() => {}} />));
  it('ensure checked changes propagate', () => {
    const handleChangeSpy = sinon.spy(Checkbox.prototype, 'handleChange');
    const tree = shallow(<Checkbox label="test" onValueChange={() => {}} />);
    const event = { target: { checked: true } };

    const checkBox = () => tree.find('[type="checkbox"]');
    checkBox().simulate('change', event);
    expect(handleChangeSpy.calledOnce).to.be.true;
    tree.unmount();
  });
  it('no error styles when errorMessage undefined', () => {
    const tree = shallow(
      <Checkbox label="my label" onValueChange={() => {}} />,
    );

    // No error classes.
    expect(tree.children('.usa-input-error')).to.have.lengthOf(0);
    expect(tree.children('.usa-input-error-label')).to.have.lengthOf(0);
    expect(tree.children('.usa-input-error-message')).to.have.lengthOf(0);

    // Ensure no unnecessary class names on label w/o error..
    const labels = tree.children('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.prop('className')).to.be.equal(
      undefined,
      'Unnecessary class names on label without error',
    );

    // No error means no aria-describedby to not confuse screen readers.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-describedby')).to.be.equal(
      undefined,
      'Unnecessary aria-describedby',
    );
    tree.unmount();
  });

  it('has error styles when errorMessage is set', () => {
    const tree = shallow(
      <Checkbox
        label="my label"
        errorMessage="error message"
        onValueChange={() => {}}
      />,
    );

    // Ensure all error classes set.
    expect(tree.find('.usa-input-error')).to.have.lengthOf(1);

    const labels = tree.find('.usa-input-error-label');
    expect(labels).to.have.lengthOf(1);

    const errorMessages = tree.find('.usa-input-error-message');
    expect(errorMessages).to.have.lengthOf(1);
    expect(errorMessages.text()).to.equal('Error error message');

    // No error means no aria-describedby to not confuse screen readers.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-describedby')).to.not.be.equal(undefined);
    expect(inputs.prop('aria-describedby')).to.equal(errorMessages.prop('id'));
    tree.unmount();
  });

  it('required=false does not have required asterisk', () => {
    const tree = shallow(
      <Checkbox label="my label" onValueChange={() => {}} />,
    );

    expect(tree.find('label').text()).to.equal('my label');
    tree.unmount();
  });

  it('required=true has required asterisk', () => {
    const tree = shallow(
      <Checkbox label="my label" required onValueChange={() => {}} />,
    );

    const label = tree.find('label');
    expect(label.text()).to.equal('my label(*Required)');
    tree.unmount();
  });

  it('label attribute propagates', () => {
    const tree = shallow(
      <Checkbox label="my label" onValueChange={() => {}} />,
    );

    // Ensure label text is correct.
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.text()).to.equal('my label');

    // Ensure label htmlFor is attached to input id.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('id')).to.not.be.equal(undefined);
    expect(inputs.prop('id')).to.equal(labels.prop('htmlFor'));
    tree.unmount();
  });

  it('adds aria-labelledby attribute', () => {
    const tree = shallow(
      <Checkbox ariaLabelledBy="headingId" onValueChange={() => {}} />,
    );

    // Ensure label text is empty string.
    const labels = tree.find('label');
    expect(labels).to.have.lengthOf(1);
    expect(labels.text()).to.equal('');

    // Ensure label aria-labelledby is attached to input id.
    const inputs = tree.find('input');
    expect(inputs).to.have.lengthOf(1);
    expect(inputs.prop('aria-labelledby')).to.equal('headingId');
    tree.unmount();
  });

  describe('analytics event', function () {
    it('should NOT be triggered when enableAnalytics is not true', () => {
      const wrapper = shallow(
        <Checkbox
          label="test"
          labelAboveCheckbox="this is a checkbox"
          onValueChange={() => {}}
        />,
      );

      const spy = testAnalytics(wrapper, () => {
        const event = { target: { checked: true } };
        wrapper.find('[type="checkbox"]').simulate('change', event);
      });

      expect(spy.called).to.be.false;

      wrapper.unmount();
    });

    it('should be triggered when Checkbox is checked', () => {
      const wrapper = mount(
        <Checkbox
          label="test"
          labelAboveCheckbox="this is a checkbox"
          onValueChange={() => {}}
          enableAnalytics
          required={false}
        />,
      );

      const spy = testAnalytics(wrapper, wrapper => {
        const event = { target: { checked: true } };
        wrapper.find('[type="checkbox"]').simulate('change', event);
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'Checkbox',
            action: 'change',
            details: {
              label: 'test',
              labelAboveCheckbox: 'this is a checkbox',
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
