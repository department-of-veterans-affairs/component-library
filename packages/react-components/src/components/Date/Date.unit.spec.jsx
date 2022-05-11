import React from 'react';
// import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import i18next from 'i18next';
import { render } from '@testing-library/react';
import Date from './Date';
import { makeField } from '../../helpers/fields.js';

import { minYear, maxYear } from '../../helpers/validations';

describe('<Date>', () => {
  // Mock a translation so that we can test for interpolation
  before(() => {
    i18next.init({
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            'year-range': 'year-range {{start}} {{end}}',
          },
        },
      },
    });
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

    const { getByText } = render(
      <Date required date={date} onValueChange={() => {}} />,
    );

    expect(getByText(/Please provide a response/)).to.not.be.null;
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

    expect(getByText(/Please provide a valid date/)).to.not.be.null;
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
    const { getByRole, getByText } = render(
      <Date date={date} onValueChange={() => {}} />,
    );

    expect(getByRole('alert')).to.not.be.null;
    expect(getByText(`year-range ${minYear} ${maxYear}`)).to.not.be.null;
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
    const { getByText, getByRole } = render(
      <Date date={date} onValueChange={() => {}} />,
    );

    expect(getByRole('alert')).to.not.be.null;
    expect(getByText(`year-range ${minYear} ${maxYear}`)).to.not.be.null;
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

    expect(getByText('Test')).to.not.be.null;
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

    expect(getByText('Test')).to.not.be.null;
  });
});
