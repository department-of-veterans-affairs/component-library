import React from 'react';
// import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import { SimpleDate } from './Date';
import { makeField } from '../../helpers/fields.js';

describe.only('<SimpleDate>', () => {
  it('wraps input elements in a fieldset', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(<SimpleDate date={date} onValueChange={() => {}} />);
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
    const tree = shallow(<SimpleDate date={date} onValueChange={() => {}} />);
    expect(tree.find('NumberInput')).to.have.lengthOf(1);
    expect(tree.find('Select')).to.have.lengthOf(2);
    tree.unmount();
  });

  it('should pass aXe check', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField('1890'),
    };

    return axeCheck(<SimpleDate date={date} onValueChange={() => {}} />);
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

    return axeCheck(<SimpleDate date={date} onValueChange={() => {}} />);
  });

  it('renders aria-describedby on elements', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const tree = shallow(
      <SimpleDate
        date={date}
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
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
      <SimpleDate
        date={date}
        name=""
        errorMessage="foo"
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
      <SimpleDate
        date={date}
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
    );
  });

  it('calls onBlur when the day field is blurred', () => {});
  it('calls onBlur when the month field is blurred', () => {});
  it('calls onBlur when the year field is blurred', () => {});
});
