import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const maxYear = new Date().getFullYear() + 100;

describe('va-memorable-date', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date></va-memorable-date>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class='hydrated'>
      <mock:shadow-root>
        <fieldset>
          <legend>
            <div id='dateHint'>date-hint.</div>
          </legend>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <div class='date-container'>
            <va-text-input aria-describedby='dateHint' class='hydrated input-month'></va-text-input>
            <va-text-input aria-describedby='dateHint' class='hydrated input-day'></va-text-input>
            <va-text-input aria-describedby='dateHint' class='hydrated input-year' value=''></va-text-input>
          </div>
        </fieldset>
      </mock:shadow-root>
    </va-memorable-date>
  `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-memorable-date day="5" label="Test Label" month="3" name="test" year="2000"></va-memorable-date>
      `,
    );
    await axeCheck(page);
  });

  it('renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="Label" hint="hint text" required></va-memorable-date>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class='hydrated' label='Label' hint='hint text' required=''>
      <mock:shadow-root>
        <fieldset>
          <legend>
            Label
            <span class="required">required</span>
            <div id="hint">hint text</div>
            <div id='dateHint'>date-hint.</div>
          </legend>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <div class='date-container'>
            <va-text-input aria-describedby='dateHint hint' class='hydrated input-month'></va-text-input>
            <va-text-input aria-describedby='dateHint hint' class='hydrated input-day'></va-text-input>
            <va-text-input aria-describedby='dateHint hint' class='hydrated input-year' value=''></va-text-input>
          </div>
        </fieldset>
      </mock:shadow-root>
    </va-memorable-date>
  `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-memorable-date >>> span#error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date label="This is a field" required />',
    );

    const requiredSpan = await page.find('va-memorable-date >>> span.required');
    expect(requiredSpan).not.toBeNull();
  });

  describe('validation', () => {
    it('does year validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(`year-range`);
    });

    it('does month validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleMonth = await page.$('pierce/[name="testMonth"]');

      // Click three times to select all text in input
      await handleMonth.click({ clickCount: 3 });
      await handleMonth.type('50');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual("month-range");
    });

    it('does day validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleDay = await page.$('pierce/[name="testDay"]');

      // Click three times to select all text in input
      await handleDay.click({ clickCount: 3 });
      await handleDay.type('50');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual("day-range");
    });

   it('does validation for required components', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date name="test" required />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Trigger Blur
      await handleYear.press('Tab');
      await page.waitForChanges();

      expect(date.getAttribute('error')).toEqual("date-error");
    });

    it('allows for a custom required message', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-memorable-date value="2000-01-01" name="test" label="This is a field" required />');

      // Act
      const handleYear = await page.$('pierce/[name="testYear"]');
      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      await handleYear.press('Tab');
      // This would be done in the onDateChange handler
      await page.$eval('va-memorable-date', (elm: any) => {
        elm.error= 'Fill me out';
      });
      await page.waitForChanges();

      // Assert
      const errorSpan = await page.find('va-memorable-date >>> span#error-message');
      expect(errorSpan.textContent).toContain("Fill me out");
    });

    it('resets error to null when fixed', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" required="true" />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(`year-range`);

      await handleYear.press('0');
      await handleYear.press('2');
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');
      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(null);
    });

    describe('invalid subcomponents', () => {
      it('correctly indicates an invalid year', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleYear.click({ clickCount: 3 });
        await handleYear.press('2');
        // Trigger Blur
        await handleYear.press('Tab');

        // Year only has one character - should be invalid
        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('true');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');

        await handleYear.press('0');
        await handleYear.press('2');
        await handleYear.press('2');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('correctly indicates an invalid month', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleMonth.click({ clickCount: 3 });
        await handleMonth.press('3');
        await handleMonth.press('9');
        // Trigger Blur
        await handleYear.press('Tab');

        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('true');
        // Day is invalid because we don't know the upper limit based on a valid month
        expect(invalidDay).toEqual('true');

        await handleMonth.press('Backspace');
        await handleMonth.press('Backspace');
        await handleMonth.press('4');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('correctly indicates an invalid day', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleDay.click({ clickCount: 3 });
        await handleDay.press('3');
        await handleDay.press('9');
        // Trigger Blur
        await handleYear.press('Tab');

        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('true');

        await handleDay.press('Backspace');
        await handleDay.press('1');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('passes the invalidDay prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-day />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('true');
     });

      it('passes the invalidMonth prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-month />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('true');
        expect(invalidDay).toEqual('false');
     });

      it('passes the invalidYear prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-year />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('true');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
     });
    });
  });

  it('sets a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="This is a label" />');

    const label = await page.find('va-memorable-date >>> legend');
    expect(label.innerText).toContain('This is a label');
  });

  it('sets a default date', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date value="1999-05-03" />');

    const month = await page.find('va-memorable-date >>> .input-month');
    const day = await page.find('va-memorable-date >>> .input-day');
    const year = await page.find('va-memorable-date >>> .input-year');

    expect(month.getAttribute('value')).toBe('05');
    expect(day.getAttribute('value')).toBe('03');
    expect(year.getAttribute('value')).toBe('1999');
  });

  it('updates date based on input fields', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" />',
    );

    const date = await page.find('va-memorable-date');
    const elementMonth = await page.find('va-memorable-date >>> .input-month');
    const elementDay = await page.find('va-memorable-date >>> .input-day');
    const elementYear = await page.find('va-memorable-date >>> .input-year');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Click three times to select all text in input
    await handleMonth.click({ clickCount: 3 });
    await handleMonth.press('0');
    await handleMonth.press('7');
    // Click three times to select all text in input
    await handleDay.click({ clickCount: 3 });
    await handleDay.press('2');
    await handleDay.press('1');
    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    await page.waitForChanges();

    expect(elementMonth.getAttribute('value')).toBe('07');
    expect(elementDay.getAttribute('value')).toBe('21');
    expect(elementYear.getAttribute('value')).toBe('2022');
    expect(date.getAttribute('value')).toBe('2022-07-21');
  });

  it('year input only allows for 4 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" />');

    const elementYear = await page.find('va-memorable-date >>> .input-year');
    const handleYear = await page.$('pierce/[name="testYear"]');
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    await handleYear.press('3');

    await page.waitForChanges();
    expect(elementYear.getAttribute('value')).toBe('2022');
  });

  it('day and month input field only allows for a maximum of 2 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" />');

    const elementMonth = await page.find('va-memorable-date >>> .input-month');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    await handleMonth.press('2');
    await handleMonth.press('0');
    await handleMonth.press('2');
    await handleMonth.press('2');
    await handleMonth.press('3');

    const elementDay = await page.find('va-memorable-date >>> .input-day');
    const handleDay = await page.$('pierce/[name="testDay"]');
    await handleDay.press('1');
    await handleDay.press('2');
    await handleDay.press('3');
    await handleDay.press('4');
    await handleDay.press('5');

    await page.waitForChanges();
    expect(elementMonth.getAttribute('value')).toBe('20');
    expect(elementDay.getAttribute('value')).toBe('12');
  });

  it('emits dateBlur event', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" />',
    );

    const handleYear = await page.$('pierce/[name="testYear"]');
    const blurSpy = await page.spyOnEvent('dateBlur');
    // Trigger Blur
    await handleYear.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits dateChange event when input value is updated', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" />',
    );

    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    const spy = await page.spyOnEvent('dateChange');

    await handleMonth.press('7');
    // Click three times to select all text in input
    await handleDay.click({ clickCount: 3 });
    await handleDay.press('1');
    await handleDay.press('2');

    expect(spy).toHaveReceivedEventTimes(2);

    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');

    expect(spy).toHaveReceivedEventTimes(6);
  });

  it('formats single digit days and months into 2 digits with a leading 0', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test"/>');
    const date = await page.find('va-memorable-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.press('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('2');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('2022-01-02');
  });

  it('only allows specific keys to be used inside input fields', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test"/>');
    const date = await page.find('va-memorable-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.press('a');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('b');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('`');
    await handleYear.press(']');
    await handleYear.press('/');
    await handleYear.press(',');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('');
  });

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date enable-analytics name="test" label="Example label" />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Month
    await handleMonth.press('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('2');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-memorable-date',
      details: {
        label: 'Example label',
        year: 2022,
        month: 1,
        day: 2,
      },
    });
  });

  // Begin USWDS v3 test
  it('uswds v3 renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" uswds/>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class="hydrated" name="test" uswds="">
        <mock:shadow-root>
          <fieldset class="usa-fieldset usa-form">
          <legend class="usa-legend" part="legend"></legend>
          <span class="usa-hint" id="dateHint">
              date-hint.
          </span>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <div class="usa-memorable-date">
            <div class="usa-form-group usa-form-group--month">
              <va-text-input aria-describedby="dateHint" class="hydrated usa-form-group--month-input" uswds=""></va-text-input>
            </div>
            <div class="usa-form-group usa-form-group--day">
              <va-text-input aria-describedby="dateHint" class="hydrated usa-form-group--day-input" uswds=""></va-text-input>
            </div>
            <div class="usa-form-group usa-form-group--year">
              <va-text-input aria-describedby="dateHint" class="hydrated usa-form-group--year-input" uswds="" value=""></va-text-input>
            </div>
          </div>
          </fieldset>
        </mock:shadow-root>
      </va-memorable-date>
    `);
  });

  it('uswds v3 passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-memorable-date day="5" label="Test Label" month="3" name="test" year="2000" uswds></va-memorable-date>
      `,
    );
    await axeCheck(page);
  });

  it('uswds v3 renders hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="Label" hint="hint text" required uswds></va-memorable-date>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class='hydrated' label='Label' hint='hint text' required='' uswds=''>
      <mock:shadow-root>
        <fieldset class="usa-fieldset usa-form">
          <legend class="usa-legend" part="legend">
            Label
            <span class="usa-label--required">
              required
            </span>
            <div id="hint">
              hint text
            </div>
          </legend>
          <span class="usa-hint" id="dateHint">
            date-hint.
          </span>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <div class="usa-memorable-date">
            <div class="usa-form-group usa-form-group--month">
              <va-text-input aria-describedby="dateHint hint" class="hydrated usa-form-group--month-input" uswds=""></va-text-input>
            </div>
            <div class="usa-form-group usa-form-group--day">
              <va-text-input aria-describedby="dateHint hint" class="hydrated usa-form-group--day-input" uswds=""></va-text-input>
            </div>
            <div class="usa-form-group usa-form-group--year">
              <va-text-input aria-describedby="dateHint hint" class="hydrated usa-form-group--year-input" uswds="" value=""></va-text-input>
            </div>
          </div>
        </fieldset>
      </mock:shadow-root>
    </va-memorable-date>
    `);
  });

  it('uswds v3 renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date error="This is a mistake" uswds />');

    // Render the error message text
    const error = await page.find('va-memorable-date >>> span#error-message');
    // expect(error).toEqualHtml('test');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('uswds v3 renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date label="This is a field" required uswds />',
    );

    const requiredSpan = await page.find('va-memorable-date >>> span.usa-label--required');
    expect(requiredSpan).not.toBeNull();
  });

  describe('uswds v3 validation', () => {
    it('uswds v3 does year validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" uswds />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(`year-range`);
    });

    it('uswds v3 does month validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" uswds />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleMonth = await page.$('pierce/[name="testMonth"]');

      // Click three times to select all text in input
      await handleMonth.click({ clickCount: 3 });
      await handleMonth.type('50');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual("month-range");
    });

    it('uswds v3 does day validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" uswds />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleDay = await page.$('pierce/[name="testDay"]');

      // Click three times to select all text in input
      await handleDay.click({ clickCount: 3 });
      await handleDay.type('50');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual("day-range");
    });

   it('uswds v3 does validation for required components', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date name="test" required uswds />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Trigger Blur
      await handleYear.press('Tab');
      await page.waitForChanges();

      expect(date.getAttribute('error')).toEqual("date-error");
    });

    it('uswds v3 allows for a custom required message', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-memorable-date value="2000-01-01" name="test" label="This is a field" required uswds />');

      // Act
      const handleYear = await page.$('pierce/[name="testYear"]');
      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      await handleYear.press('Tab');
      // This would be done in the onDateChange handler
      await page.$eval('va-memorable-date', (elm: any) => {
        elm.error= 'Fill me out';
      });
      await page.waitForChanges();

      // Assert
      const errorSpan = await page.find('va-memorable-date >>> span#error-message');
      expect(errorSpan.textContent).toContain("Fill me out");
    });

    it('uswds v3 resets error to null when fixed', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" required="true" uswds />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(`year-range`);

      await handleYear.press('0');
      await handleYear.press('2');
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');
      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(null);
    });

    describe('uswds v3 invalid subcomponents', () => {
      it('uswds v3 correctly indicates an invalid year', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" uswds />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleYear.click({ clickCount: 3 });
        await handleYear.press('2');
        // Trigger Blur
        await handleYear.press('Tab');

        // Year only has one character - should be invalid
        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('true');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');

        await handleYear.press('0');
        await handleYear.press('2');
        await handleYear.press('2');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 correctly indicates an invalid month', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" uswds />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleMonth.click({ clickCount: 3 });
        await handleMonth.press('3');
        await handleMonth.press('9');
        // Trigger Blur
        await handleYear.press('Tab');

        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('true');
        // Day is invalid because we don't know the upper limit based on a valid month
        expect(invalidDay).toEqual('true');

        await handleMonth.press('Backspace');
        await handleMonth.press('Backspace');
        await handleMonth.press('4');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 correctly indicates an invalid day', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" uswds />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleDay.click({ clickCount: 3 });
        await handleDay.press('3');
        await handleDay.press('9');
        // Trigger Blur
        await handleYear.press('Tab');

        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('true');

        await handleDay.press('Backspace');
        await handleDay.press('1');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 passes the invalidDay prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-day uswds />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('true');
      });

      it('uswds v3 passes the invalidMonth prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-month uswds />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('true');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 passes the invalidYear prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-year uswds />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('true');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });
    });
  });

  it('uswds v3 sets a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="This is a label" uswds />');

    const label = await page.find('va-memorable-date >>> legend');
    expect(label.innerText).toContain('This is a label');
  });

  it('uswds v3 sets a default date', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date value="1999-05-03" uswds />');

    const month = await page.find('va-memorable-date >>> .usa-form-group--month-input');
    const day = await page.find('va-memorable-date >>> .usa-form-group--day-input');
    const year = await page.find('va-memorable-date >>> .usa-form-group--year-input');

    expect(month.getAttribute('value')).toBe('05');
    expect(day.getAttribute('value')).toBe('03');
    expect(year.getAttribute('value')).toBe('1999');
  });

  it('uswds v3 updates date based on input fields', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" uswds />',
    );

    const date = await page.find('va-memorable-date');
    const elementMonth = await page.find('va-memorable-date >>> .usa-form-group--month-input');
    const elementDay = await page.find('va-memorable-date >>> .usa-form-group--day-input');
    const elementYear = await page.find('va-memorable-date >>> .usa-form-group--year-input');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Click three times to select all text in input
    await handleMonth.click({ clickCount: 3 });
    await handleMonth.press('0');
    await handleMonth.press('7');
    // Click three times to select all text in input
    await handleDay.click({ clickCount: 3 });
    await handleDay.press('2');
    await handleDay.press('1');
    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    await page.waitForChanges();

    expect(elementMonth.getAttribute('value')).toBe('07');
    expect(elementDay.getAttribute('value')).toBe('21');
    expect(elementYear.getAttribute('value')).toBe('2022');
    expect(date.getAttribute('value')).toBe('2022-07-21');
  });

  it('uswds v3 year input only allows for 4 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" uswds />');

    const elementYear = await page.find('va-memorable-date >>> .usa-form-group--year-input');
    const handleYear = await page.$('pierce/[name="testYear"]');
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    await handleYear.press('3');

    await page.waitForChanges();
    expect(elementYear.getAttribute('value')).toBe('2022');
  });

  it('uswds v3 day and month input field only allows for a maximum of 2 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" uswds />');

    const elementMonth = await page.find('va-memorable-date >>> .usa-form-group--month-input');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    await handleMonth.press('2');
    await handleMonth.press('0');
    await handleMonth.press('2');
    await handleMonth.press('2');
    await handleMonth.press('3');

    const elementDay = await page.find('va-memorable-date >>> .usa-form-group--day-input');
    const handleDay = await page.$('pierce/[name="testDay"]');
    await handleDay.press('1');
    await handleDay.press('2');
    await handleDay.press('3');
    await handleDay.press('4');
    await handleDay.press('5');

    await page.waitForChanges();
    expect(elementMonth.getAttribute('value')).toBe('20');
    expect(elementDay.getAttribute('value')).toBe('12');
  });

  it('uswds v3 emits dateBlur event', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" uswds />',
    );

    const handleYear = await page.$('pierce/[name="testYear"]');
    const blurSpy = await page.spyOnEvent('dateBlur');
    // Trigger Blur
    await handleYear.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds v3 emits dateChange event when input value is updated', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" uswds />',
    );

    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    const spy = await page.spyOnEvent('dateChange');

    await handleMonth.press('7');
    // Click three times to select all text in input
    await handleDay.click({ clickCount: 3 });
    await handleDay.press('1');
    await handleDay.press('2');

    expect(spy).toHaveReceivedEventTimes(2);

    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');

    expect(spy).toHaveReceivedEventTimes(6);
  });

  it('uswds v3 formats single digit days and months into 2 digits with a leading 0', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test" uswds />');
    const date = await page.find('va-memorable-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.press('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('2');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('2022-01-02');
  });

  it('uswds v3 only allows specific keys to be used inside input fields', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test" uswds />');
    const date = await page.find('va-memorable-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.press('a');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('b');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('`');
    await handleYear.press(']');
    await handleYear.press('/');
    await handleYear.press(',');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('');
  });

  it('uswds v3 fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date enable-analytics name="test" label="Example label" uswds />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Month
    await handleMonth.press('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('2');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-memorable-date',
      details: {
        label: 'Example label',
        year: 2022,
        month: 1,
        day: 2,
      },
    });
  });

  // Begin USWDS v3 test with monthSelect prop
  it('uswds v3 renders with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" uswds month-select />');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class="hydrated" month-select="" name="test" uswds="">
        <mock:shadow-root>
          <fieldset class="usa-fieldset usa-form">
          <legend class="usa-legend" part="legend"></legend>
          <span class="usa-hint" id="dateHint">
              date-hint-with-select.
          </span>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <div class="usa-memorable-date">
            <div class="usa-form-group usa-form-group--month usa-form-group--select">
              <va-select aria-describedby="dateHint" class="hydrated usa-form-group--month-select" uswds="">
                <option value="1">
                  January
                </option>
                <option value="2">
                  February
                </option>
                <option value="3">
                  March
                </option>
                <option value="4">
                  April
                </option>
                <option value="5">
                  May
                </option>
                <option value="6">
                  June
                </option>
                <option value="7">
                  July
                </option>
                <option value="8">
                  August
                </option>
                <option value="9">
                  September
                </option>
                <option value="10">
                  October
                </option>
                <option value="11">
                  November
                </option>
                <option value="12">
                  December
                </option>
              </va-select>
            </div>
            <div class="usa-form-group usa-form-group--day">
              <va-text-input aria-describedby="dateHint" class="hydrated usa-form-group--day-input" uswds=""></va-text-input>
            </div>
            <div class="usa-form-group usa-form-group--year">
              <va-text-input aria-describedby="dateHint" class="hydrated usa-form-group--year-input" uswds="" value=""></va-text-input>
            </div>
          </div>
          </fieldset>
        </mock:shadow-root>
      </va-memorable-date>
    `);
  });

  it('uswds v3 passes an axe check with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-memorable-date day="5" label="Test Label" month="3" name="test" year="2000" uswds month-select></va-memorable-date>
      `,
    );
    await axeCheck(page);
  });

  it('uswds v3 renders hint text with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="Label" hint="hint text" required uswds month-select></va-memorable-date>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class='hydrated' label='Label' hint='hint text' month-select='' required='' uswds=''>
      <mock:shadow-root>
        <fieldset class="usa-fieldset usa-form">
          <legend class="usa-legend" part="legend">
            Label
            <span class="usa-label--required">
              required
            </span>
            <div id="hint">
              hint text
            </div>
          </legend>
          <span class="usa-hint" id="dateHint">
            date-hint-with-select.
          </span>
          <slot></slot>
          <span id="error-message" role="alert"></span>
          <div class="usa-memorable-date">
            <div class="usa-form-group usa-form-group--month usa-form-group--select">
              <va-select aria-describedby="dateHint hint" class="hydrated usa-form-group--month-select" uswds="">
                <option value="1">
                  January
                </option>
                <option value="2">
                  February
                </option>
                <option value="3">
                  March
                </option>
                <option value="4">
                  April
                </option>
                <option value="5">
                  May
                </option>
                <option value="6">
                  June
                </option>
                <option value="7">
                  July
                </option>
                <option value="8">
                  August
                </option>
                <option value="9">
                  September
                </option>
                <option value="10">
                  October
                </option>
                <option value="11">
                  November
                </option>
                <option value="12">
                  December
                </option>
              </va-select>
            </div>
            <div class="usa-form-group usa-form-group--day">
              <va-text-input aria-describedby="dateHint hint" class="hydrated usa-form-group--day-input" uswds=""></va-text-input>
            </div>
            <div class="usa-form-group usa-form-group--year">
              <va-text-input aria-describedby="dateHint hint" class="hydrated usa-form-group--year-input" uswds="" value=""></va-text-input>
            </div>
          </div>
        </fieldset>
      </mock:shadow-root>
    </va-memorable-date>
    `);
  });

  it('uswds v3 renders an error message with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date error="This is a mistake" uswds month-select />');

    // Render the error message text
    const error = await page.find('va-memorable-date >>> span#error-message');
    // expect(error).toEqualHtml('test');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('uswds v3 renders a required span with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date label="This is a field" required uswds month-select />',
    );

    const requiredSpan = await page.find('va-memorable-date >>> span.usa-label--required');
    expect(requiredSpan).not.toBeNull();
  });

  describe('uswds v3 validation with monthSelect', () => {
    it('uswds v3 does year validation without required prop with monthSelect', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" uswds month-select />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(`year-range`);
    });

    it('uswds v3 does day validation without required prop with monthSelect', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" uswds month-select />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleDay = await page.$('pierce/[name="testDay"]');

      // Click three times to select all text in input
      await handleDay.click({ clickCount: 3 });
      await handleDay.type('50');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual("day-range");
    });

   it('uswds v3 does validation for required components with monthSelect', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date name="test" required uswds month-select />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Trigger Blur
      await handleYear.press('Tab');
      await page.waitForChanges();

      expect(date.getAttribute('error')).toEqual("date-error");
    });

    it('uswds v3 allows for a custom required message with monthSelect', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-memorable-date value="2000-01-01" name="test" label="This is a field" required uswds month-select />');

      // Act
      const handleYear = await page.$('pierce/[name="testYear"]');
      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      await handleYear.press('Tab');
      // This would be done in the onDateChange handler
      await page.$eval('va-memorable-date', (elm: any) => {
        elm.error= 'Fill me out';
      });
      await page.waitForChanges();

      // Assert
      const errorSpan = await page.find('va-memorable-date >>> span#error-message');
      expect(errorSpan.textContent).toContain("Fill me out");
    });

    it('uswds v3 resets error to null when fixed with monthSelect', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" required="true" uswds month-select />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');

      // Click three times to select all text in input
      await handleYear.click({ clickCount: 3 });
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(`year-range`);

      await handleYear.press('0');
      await handleYear.press('2');
      await handleYear.press('2');
      // Trigger Blur
      await handleYear.press('Tab');
      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual(null);
    });

    describe('uswds v3 invalid subcomponents with monthSelect', () => {
      it('uswds v3 correctly indicates an invalid year with monthSelect', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" uswds month-select />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleYear.click({ clickCount: 3 });
        await handleYear.press('2');
        // Trigger Blur
        await handleYear.press('Tab');

        // Year only has one character - should be invalid
        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('true');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');

        await handleYear.press('0');
        await handleYear.press('2');
        await handleYear.press('2');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 correctly indicates an invalid day with monthSelect', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" uswds month-select />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Click three times to select all text in input
        await handleDay.click({ clickCount: 3 });
        await handleDay.press('3');
        await handleDay.press('9');
        // Trigger Blur
        await handleYear.press('Tab');

        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('true');

        await handleDay.press('Backspace');
        await handleDay.press('1');
        // Trigger Blur
        await handleYear.press('Tab');
        await page.waitForChanges();

        invalidYear = await handleYear.evaluate(getAriaInvalid);
        invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 passes the invalidDay prop correctly with monthSelect', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-day uswds month-select />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('true');
      });

      it('uswds v3 passes the invalidMonth prop correctly with monthSelect', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-month uswds month-select />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('true');
        expect(invalidDay).toEqual('false');
      });

      it('uswds v3 passes the invalidYear prop correctly with monthSelect', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-year uswds month-select />',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid =
          (element: HTMLElement) => element.getAttribute('aria-invalid');

        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('true');
        expect(invalidMonth).toEqual('false');
        expect(invalidDay).toEqual('false');
      });
    });
  });

  it('uswds v3 sets a label with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="This is a label" uswds month-select />');

    const label = await page.find('va-memorable-date >>> legend');
    expect(label.innerText).toContain('This is a label');
  });

  it('uswds v3 emits dateBlur event with monthSelect', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" uswds month-select />',
    );

    const handleYear = await page.$('pierce/[name="testYear"]');
    const blurSpy = await page.spyOnEvent('dateBlur');
    // Trigger Blur
    await handleYear.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('uswds v3 formats single digit days and months into 2 digits with a leading 0 with monthSelect', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test" uswds month-select />');
    const date = await page.find('va-memorable-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.select('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('2');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('2022-01-02');
  });

  it('uswds v3 only allows specific keys to be used inside input fields with monthSelect', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test" uswds month-select />');
    const date = await page.find('va-memorable-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.select('a');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('b');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('`');
    await handleYear.press(']');
    await handleYear.press('/');
    await handleYear.press(',');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('');
  });

  it('uswds v3 fires an analytics event when enableAnalytics is true with monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date enable-analytics name="test" label="Example label" uswds month-select />',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Month
    await handleMonth.select('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('2');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-memorable-date',
      details: {
        label: 'Example label',
        year: 2022,
        month: 1,
        day: 2,
      },
    });
  });
});
