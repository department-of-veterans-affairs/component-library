import React from 'react';
// import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import { render } from '@testing-library/react';
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
    const { container, getByText } = render(
      <SimpleDate date={date} onValueChange={() => {}} />,
    );
    expect(container.querySelectorAll('fieldset')).to.have.lengthOf(1);
    const legend = getByText('Date of birth');
    expect(legend.tagName).to.equal('LEGEND');
  });

  it('renders input elements', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const { getByLabelText } = render(
      <SimpleDate date={date} onValueChange={() => {}} />,
    );
    getByLabelText('Year');
    getByLabelText('Month');
    getByLabelText('Day');
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

    return axeCheck(
      <SimpleDate date={date} errorMessage="Foo" onValueChange={() => {}} />,
    );
  });

  it('renders aria-describedby on elements', () => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const { getByLabelText } = render(
      <SimpleDate
        date={date}
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
    );
    [
      getByLabelText('Year'),
      getByLabelText('Month'),
      getByLabelText('Day'),
    ].forEach(el => {
      expect(el.getAttribute('aria-describedby')).to.equal('test-id');
    });
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

    const { getByLabelText } = render(
      <SimpleDate
        date={date}
        name=""
        errorMessage="foo"
        onValueChange={() => {}}
        ariaDescribedby="test-id"
      />,
    );

    const numberAria = getByLabelText('Year').getAttribute('aria-describedby');
    // "date-input-##-error-message test-id"
    expect(numberAria).to.contain('date-input-');
    expect(numberAria).to.contain('-error-message');
    expect(numberAria).to.contain('test-id');
    [
      getByLabelText('Year'),
      getByLabelText('Month'),
      getByLabelText('Day'),
    ].forEach(el => {
      expect(numberAria).to.contain('date-input-');
      expect(numberAria).to.contain('-error-message');
      expect(el.getAttribute('aria-describedby')).to.contain('test-id');
    });
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
