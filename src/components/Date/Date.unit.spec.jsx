import React from 'react';
// import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import Date from './Date';
import { makeField } from '../../helpers/fields.js';

import { minYear, maxYear } from '../../helpers/validations';

describe('<Date>', () => {
  it('wraps input elements in a fieldset', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(<Date date={date} onValueChange={() => {}} />);
    expect(tree.find('fieldset')).to.have.lengthOf(1);
    const legend = tree.find('legend');
    expect(legend).to.have.lengthOf(1);
    expect(legend.text()).to.equal('Date of birth');
    tree.unmount();
  });
  it('renders input elements', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(<Date date={date} onValueChange={() => {}} />);
    expect(tree.find('NumberInput')).to.have.lengthOf(1);
    expect(tree.find('Select')).to.have.lengthOf(2);
    tree.unmount();
  });
  it('displays required message', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField(''),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = shallow(
      <Date required date={date} onValueChange={() => {}} />,
    );

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.equal(
      'Error Please provide a response',
    );
    tree.unmount();
  });
  it('displays invalid message', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField('1890'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = shallow(<Date date={date} onValueChange={() => {}} />);

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.equal(
      'Error Please provide a valid date',
    );
    tree.unmount();
  });
  it('displays invalid year message for years < min', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField((minYear - 20).toString()),
    };
    date.year.dirty = true;
    date.month.dirty = false;
    date.day.dirty = false;
    const tree = shallow(<Date date={date} onValueChange={() => {}} />);

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.contain(
      `Please enter a year between ${minYear} and ${maxYear}`,
    );
    tree.unmount();
  });
  it('displays invalid year message for years > max', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField((maxYear + 20).toString()),
    };
    date.year.dirty = true;
    date.month.dirty = false;
    date.day.dirty = false;
    const tree = shallow(<Date date={date} onValueChange={() => {}} />);

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.contain(
      `Please enter a year between ${minYear} and ${maxYear}`,
    );
    tree.unmount();
  });

  it('does not show invalid message for month year date', () => {
    const date = {
      day: makeField(''),
      month: makeField('12'),
      year: makeField('2003'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = shallow(<Date date={date} onValueChange={() => {}} />);
    expect(tree.find('.usa-input-error')).to.have.length(0);
    tree.unmount();
  });

  it('displays custom message', () => {
    const date = {
      day: makeField('3'),
      month: makeField(''),
      year: makeField('2010'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = shallow(
      <Date
        date={date}
        validation={{ valid: false, message: 'Test' }}
        onValueChange={() => {}}
      />,
    );

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.equal('Error Test');
    tree.unmount();
  });
  it('displays custom message from array', () => {
    const date = {
      day: makeField('3'),
      month: makeField(''),
      year: makeField('2010'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = shallow(
      <Date
        date={date}
        validation={[
          { valid: true, message: 'NotShownMessage' },
          { valid: false, message: 'Test' },
        ]}
        onValueChange={() => {}}
      />,
    );

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.equal('Error Test');
    tree.unmount();
  });

  it('should pass aXe check', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField('1890'),
    };

    return axeCheck(<Date date={date} onValueChange={() => {}} />);
  });

  it('should pass aXe check when errorMessage is set', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField('1890'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    return axeCheck(<Date date={date} onValueChange={() => {}} />);
  });

  it('renders aria-describedby on elements', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(
      <Date date={date} onValueChange={() => {}} ariaDescribedby="test-id" />,
    );
    expect(tree.find('NumberInput').props().ariaDescribedby).to.equal(
      'test-id',
    );
    tree.find('Select').forEach(select => {
      expect(select.props().ariaDescribedby).to.equal('test-id');
    });
    tree.unmount();
  });
  it('renders aria-describedby and invalid message id on all elements', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField('1890'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = shallow(
      <Date
        date={date}
        name=""
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
    );

    const numberAria = tree.find('NumberInput').props().ariaDescribedby;
    // "date-input-##-error-message test-id"
    expect(numberAria).to.contain('date-input-');
    expect(numberAria).to.contain('-error-message');
    expect(numberAria).to.contain('test-id');
    tree.find('Select').forEach(select => {
      const selectAria = select.props().ariaDescribedby;
      expect(numberAria).to.contain('date-input-');
      expect(numberAria).to.contain('-error-message');
      expect(selectAria).to.contain('test-id');
    });
    tree.unmount();
  });
  it('should pass aXe check when multiple aria-describedby ids are set', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField('1890'),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    return axeCheck(
      <Date date={date} onValueChange={() => {}} ariaDescribedby="test-id" />,
    );
  });
});
