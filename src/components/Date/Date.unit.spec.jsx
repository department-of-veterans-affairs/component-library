import React from 'react';
// import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import Date from './Date';
import { makeField } from '../../helpers/fields.js';

import { minYear, maxYear } from '../../helpers/validations';

describe('<Date>', () => {
  it('displays required message', () => {
    const date = {
      day: makeField(''),
      month: makeField(''),
      year: makeField(''),
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const { getByText } = render(
      <Date required date={date} onValueChange={() => {}} />,
    );

    getByText(/Please provide a response/);
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

    const { getByText } = render(<Date date={date} onValueChange={() => {}} />);

    getByText(/Please provide a valid date/);
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
    const { getByText } = render(<Date date={date} onValueChange={() => {}} />);

    getByText(`Please enter a year between ${minYear} and ${maxYear}`);
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
    const { getByText } = render(<Date date={date} onValueChange={() => {}} />);

    getByText(`Please enter a year between ${minYear} and ${maxYear}`);
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

    const { container } = render(<Date date={date} onValueChange={() => {}} />);
    expect(container.querySelectorAll('.usa-input-error')).to.have.length(0);
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

    const { getByText } = render(
      <Date
        date={date}
        validation={{ valid: false, message: 'Test' }}
        onValueChange={() => {}}
      />,
    );

    getByText('Test');
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

    const { getByText } = render(
      <Date
        date={date}
        validation={[
          { valid: true, message: 'NotShownMessage' },
          { valid: false, message: 'Test' },
        ]}
        onValueChange={() => {}}
      />,
    );

    getByText('Test');
  });
});
