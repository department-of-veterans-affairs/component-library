import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';

import MonthYear from './MonthYear';
import { makeField } from '../../helpers/fields.js';

import { minYear, maxYear } from '../../helpers/validations';

describe('<MonthYear>', () => {
  it('wraps input elements in a fieldset', () => {
    const date = {
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );
    expect(tree.find('fieldset')).to.have.lengthOf(1);
    const legend = tree.find('legend');
    expect(legend).to.have.lengthOf(1);
    expect(legend.text()).to.equal('Date');
    tree.unmount();
  });
  it('renders input elements', () => {
    const date = {
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );
    expect(tree.find('NumberInput')).to.have.lengthOf(1);
    expect(tree.find('Select')).to.have.lengthOf(1);
    tree.unmount();
  });
  it('displays required message', () => {
    const date = {
      month: makeField(''),
      year: makeField(''),
    };
    date.year.dirty = true;
    date.month.dirty = true;

    const tree = shallow(
      <MonthYear required date={date} onValueChange={_update => {}} />,
    );

    expect(tree.find('.usa-input-error').length).to.equal(1);
    expect(
      tree
        .find('.usa-input-error-message')
        .first()
        .text(),
    ).to.equal('Error Please provide a response');
    tree.unmount();
  });
  it('displays invalid message', () => {
    const date = {
      month: makeField(''),
      year: makeField('1890'),
    };
    date.year.dirty = true;
    date.month.dirty = true;

    const tree = shallow(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );

    expect(tree.find('.usa-input-error').length).to.equal(1);
    expect(
      tree
        .find('.usa-input-error-message')
        .first()
        .text(),
    ).to.equal('Error Please provide a valid month and/or year');
    tree.unmount();
  });
  it('does not show invalid message for partial date', () => {
    const date = {
      month: makeField('12'),
      year: makeField(''),
    };
    date.year.dirty = true;
    date.month.dirty = true;

    const tree = shallow(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );

    expect(tree.find('.usa-input-error').length).to.equal(0);
    tree.unmount();
  });
  it('displays invalid year message for years < min', () => {
    const date = {
      month: makeField(''),
      year: makeField((minYear - 20).toString()),
    };
    date.year.dirty = true;
    date.month.dirty = false;
    const tree = shallow(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.contain(
      `Please enter a year between ${minYear} and ${maxYear}`,
    );
    tree.unmount();
  });
  it('displays invalid year message for years > max', () => {
    const date = {
      month: makeField(''),
      year: makeField((maxYear + 20).toString()),
    };
    date.year.dirty = true;
    date.month.dirty = false;
    const tree = shallow(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );

    expect(tree.find('.usa-input-error').exists()).to.be.true;
    expect(tree.find('.usa-input-error-message').text()).to.contain(
      `Please enter a year between ${minYear} and ${maxYear}`,
    );
    tree.unmount();
  });

  it('displays custom message', () => {
    const date = {
      month: makeField(''),
      year: makeField('2010'),
    };
    date.year.dirty = true;
    date.month.dirty = true;

    const tree = shallow(
      <MonthYear
        date={date}
        validation={{ valid: false, message: 'Test' }}
        onValueChange={_update => {}}
      />,
    );

    expect(tree.find('.usa-input-error').length).to.equal(1);
    expect(
      tree
        .find('.usa-input-error-message')
        .first()
        .text(),
    ).to.equal('Error Test');
    tree.unmount();
  });
  it('displays custom message from array', () => {
    const date = {
      month: makeField(''),
      year: makeField('2010'),
    };
    date.year.dirty = true;
    date.month.dirty = true;

    const tree = shallow(
      <MonthYear
        date={date}
        validation={[
          { valid: true, message: 'NotShownMessage' },
          { valid: false, message: 'Test' },
        ]}
        onValueChange={_update => {}}
      />,
    );

    expect(tree.find('.usa-input-error').length).to.equal(1);
    expect(tree.find('.usa-input-error-message').text()).to.equal('Error Test');
    tree.unmount();
  });
  it('should pass aXe check', () => {
    const date = {
      month: makeField(12),
      year: makeField(2010),
    };
    return axeCheck(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );
  });
  it('should pass aXe check with error displayed', () => {
    const date = {
      month: makeField('12'),
      year: makeField(''),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    return axeCheck(
      <MonthYear date={date} onValueChange={_update => {}} />,
    );
  });
});
