import React from 'react';
import { expect } from 'chai';
import i18next from 'i18next';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { spy } from 'sinon';

import { axeCheck } from '../../helpers/test-helpers';
import { SimpleDate } from './Date';
import { makeField } from '../../helpers/fields.js';

describe('<SimpleDate>', () => {
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
    const legend = getByText('date-of-birth');
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

    // These are the keys for i18next translations
    expect(getByLabelText('year')).to.not.be.null;
    expect(getByLabelText('month')).to.not.be.null;
    expect(getByLabelText('day')).to.not.be.null;
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
      getByLabelText('year'),
      getByLabelText('month'),
      getByLabelText('day'),
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

    const numberAria = getByLabelText('year').getAttribute('aria-describedby');
    // "date-input-##-error-message test-id"
    expect(numberAria).to.contain('date-input-');
    expect(numberAria).to.contain('-error-message');
    expect(numberAria).to.contain('test-id');
    [
      getByLabelText('year'),
      getByLabelText('month'),
      getByLabelText('day'),
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

  describe('calls onBlur', () => {
    const renderDate = () => {
      const date = {
        day: makeField(1),
        month: makeField(12),
        year: makeField(2010),
      };
      const onBlur = spy();
      const { getByLabelText, getByTestId } = render(
        <>
          <p data-testid="foo">Click me to blur the field!</p>
          <SimpleDate date={date} onBlur={onBlur} />,
        </>,
      );
      return { onBlur, getByLabelText, getByTestId };
    };

    it('when the day field is blurred', done => {
      const { onBlur, getByTestId, getByLabelText } = renderDate();
      userEvent.click(getByLabelText('day'));
      userEvent.click(getByTestId('foo'));
      setTimeout(() => {
        expect(onBlur.called).to.be.true;
        done();
      });
    });

    it('when the month field is blurred', done => {
      const { onBlur, getByTestId, getByLabelText } = renderDate();
      userEvent.click(getByLabelText('month'));
      userEvent.click(getByTestId('foo'));
      setTimeout(() => {
        expect(onBlur.called).to.be.true;
        done();
      });
    });

    it('when the year field is blurred', done => {
      const { onBlur, getByTestId, getByLabelText } = renderDate();
      userEvent.click(getByLabelText('year'));
      userEvent.click(getByTestId('foo'));
      setTimeout(() => {
        expect(onBlur.called).to.be.true;
        done();
      });
    });
  });

  it('does not call onBlur when navigating between inputs for the same date', done => {
    const date = {
      day: makeField(1),
      month: makeField(12),
      year: makeField(2010),
    };
    const onBlur = spy();
    const { getByLabelText } = render(
      <>
        <SimpleDate date={date} onBlur={onBlur} />,
      </>,
    );
    // Navigate back and forth through the date fields
    userEvent.click(getByLabelText('month'));
    userEvent.click(getByLabelText('day'));
    userEvent.click(getByLabelText('year'));
    userEvent.click(getByLabelText('month'));
    userEvent.click(getByLabelText('day'));
    userEvent.click(getByLabelText('year'));
    setTimeout(() => {
      expect(onBlur.called).to.be.false;
      done();
    });
  });
});
