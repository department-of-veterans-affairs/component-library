import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-memorable-date', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" month-select />');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class="hydrated" name="test" month-select>
        <mock:shadow-root>
          <div class="input-wrap">
            <fieldset class="usa-fieldset usa-form">
              <legend class="usa-legend" id="input-label" part="legend">
              <span class="usa-hint" id="dateHint">
                date-hint-with-select
              </span>
              </legend>
              <span id="error-message" role="alert"></span>
              <slot></slot>
              <div class="usa-memorable-date">
                <div class="usa-form-group usa-form-group--select usa-form-group--month">
                  <va-select aria-describedby="dateHint" class="hydrated usa-form-group--month-select">
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
                  <va-text-input aria-describedby="dateHint" class="hydrated memorable-date-input usa-form-group--day-input" show-input-error="false"></va-text-input>
                </div>
                <div class="usa-form-group usa-form-group--year">
                  <va-text-input aria-describedby="dateHint" class="hydrated memorable-date-input usa-form-group--year-input" show-input-error="false" value=""></va-text-input>
                </div>
              </div>
            </fieldset>
          </div>
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
    await page.setContent('<va-memorable-date label="Label" hint="hint text" required month-select ></va-memorable-date>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class='hydrated' label='Label' hint='hint text' required='' month-select=''>
      <mock:shadow-root>
        <div class="input-wrap">
          <fieldset class="usa-fieldset usa-form">
            <legend class="usa-legend" id="input-label" part="legend">
              Label
              <span class="usa-label--required">
                required
              </span>
              <div class="usa-hint" id="hint">
                hint text
              </div>
              <span class="usa-hint" id="dateHint">
                date-hint-with-select
              </span>
            </legend>
            <span id="error-message" role="alert"></span>
            <slot></slot>
            <div class="usa-memorable-date">
              <div class="usa-form-group usa-form-group--select usa-form-group--month">
                <va-select aria-describedby="dateHint hint" class="hydrated usa-form-group--month-select">
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
                <va-text-input aria-describedby="dateHint hint" class="hydrated memorable-date-input usa-form-group--day-input" show-input-error="false"></va-text-input>
              </div>
              <div class="usa-form-group usa-form-group--year">
                <va-text-input aria-describedby="dateHint hint" class="hydrated memorable-date-input usa-form-group--year-input" show-input-error="false" value=""></va-text-input>
              </div>
            </div>
          </fieldset>
        </div>
      </mock:shadow-root>
    </va-memorable-date>
    `);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-memorable-date >>> span#error-message');
    // expect(error).toEqualHtml('test');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('maintains custom error message after multiple blurs', async () => {
    const page = await newE2EPage();

    // await page.addScriptTag({ content: ``);
    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" error="custom error" />',
    );
    const date = await page.find('va-memorable-date');

    const handleYear = await page.$('pierce/[name="testYear"]');
    // Trigger Blur
    await handleYear.press('Tab');
    // Trigger Blur twice
    await handleYear.press('Tab');

    expect(date.getAttribute('error')).toEqual('custom error');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date label="This is a field" required />',
    );

    const requiredSpan = await page.find('va-memorable-date >>> span.usa-label--required');
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
        '<va-memorable-date name="test" month-select />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleMonth = await page.$('pierce/[name="testMonth"]');

      // Set an invalid value
      await handleMonth.select('');
      await handleMonth.press('Tab');
      // Trigger Blur
      await handleYear.press('Tab');

      await page.waitForChanges();
      expect(date.getAttribute('error')).toEqual("month-select");
    });

    it('does day validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" month-select/>',
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
      const handleMonth = await page.$('pierce/[name="testMonth"]');

      // Trigger Blur
      await handleMonth.press('Tab');
      await handleYear.press('Tab');
      await page.waitForChanges();

      expect(date.getAttribute('error')).toEqual("month-range");
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
          '<va-memorable-date value="1999-05-03" name="test" required="true" month-select/>',
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
          '<va-memorable-date value="1999-05-03" name="test" required="true" month-select/>',
        );
        const handleYear = await page.$('pierce/[name="testYear"]');
        const handleMonth = await page.$('pierce/[name="testMonth"]');
        const handleDay = await page.$('pierce/[name="testDay"]');
        const getAriaInvalid = (element: HTMLElement) =>
          element.getAttribute('aria-invalid');

        // Select month value that doesn't exist
        await handleMonth.select('39');
        await handleMonth.press('Tab');
        // Trigger Blur
        await handleYear.press('Tab');

        await page.waitForChanges();
        let invalidYear = await handleYear.evaluate(getAriaInvalid);
        let invalidMonth = await handleMonth.evaluate(getAriaInvalid);
        let invalidDay = await handleDay.evaluate(getAriaInvalid);

        expect(invalidYear).toEqual('false');
        expect(invalidMonth).toEqual('true');
        expect(invalidDay).toEqual('false');

        await handleMonth.select('4');
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
          '<va-memorable-date value="1999-05-03" name="test" required="true" month-select />',
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
          '<va-memorable-date name="test" invalid-day month-select />',
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
          '<va-memorable-date name="test" invalid-month month-select/>',
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
          '<va-memorable-date name="test" invalid-year month-select/>',
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
    await page.setContent('<va-memorable-date value="1999-05-03" month-select/>');

    const month = await page.find('va-memorable-date >>> .usa-form-group--month-select');
    const day = await page.find('va-memorable-date >>> .usa-form-group--day-input');
    const year = await page.find('va-memorable-date >>> .usa-form-group--year-input');

    expect(month.getAttribute('value')).toBe('5');
    expect(day.getAttribute('value')).toBe('03');
    expect(year.getAttribute('value')).toBe('1999');
  });

  it('updates date based on input fields', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" month-select />',
    );

    const date = await page.find('va-memorable-date');
    const elementMonth = await page.find('va-memorable-date >>> .usa-form-group--month-select');
    const elementDay = await page.find('va-memorable-date >>> .usa-form-group--day-input');
    const elementYear = await page.find('va-memorable-date >>> .usa-form-group--year-input');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Click three times to select all text in input
    await handleMonth.select('7');
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

    expect(elementMonth.getAttribute('value')).toBe('7');
    expect(elementDay.getAttribute('value')).toBe('21');
    expect(elementYear.getAttribute('value')).toBe('2022');
    expect(date.getAttribute('value')).toBe('2022-7-21');
  });

  it('year input only allows for 4 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" />');

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
      '<va-memorable-date value="1999-05-03" name="test" month-select />',
    );

    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    const spy = await page.spyOnEvent('dateChange');

    await handleMonth.select('7');
    expect(spy).toHaveReceivedEventTimes(1);

    // Click three times to select all text in input
    await handleDay.click({ clickCount: 3 });
    await handleDay.press('1');
    await handleDay.press('2');

    expect(spy).toHaveReceivedEventTimes(3);

    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');

    expect(spy).toHaveReceivedEventTimes(7);
  });

  it('formats single digit days and months into 2 digits with a leading 0', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test" month-select />');
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

  it('fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date enable-analytics name="test" label="Example label" month-select />',
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

  // Begin test without monthSelect prop
  it('renders without monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" month-select="false" />');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class="hydrated" month-select="false" name="test">
        <mock:shadow-root>
          <div class="input-wrap">
            <fieldset class="usa-fieldset usa-form">
              <legend class="usa-legend" id="input-label" part="legend">
              <span class="usa-hint" id="dateHint">
              date-hint
              </span>
              </legend>
              <span id="error-message" role="alert"></span>
              <slot></slot>
              <div class="usa-memorable-date">
                <div class="usa-form-group usa-form-group--month">
                  <va-text-input aria-describedby="dateHint" class="hydrated memorable-date-input usa-form-group--month-input" show-input-error="false"></va-text-input>
                </div>
                <div class="usa-form-group usa-form-group--day">
                  <va-text-input aria-describedby="dateHint" class="hydrated memorable-date-input usa-form-group--day-input" show-input-error="false"></va-text-input>
                </div>
                <div class="usa-form-group usa-form-group--year">
                  <va-text-input aria-describedby="dateHint" class="hydrated memorable-date-input usa-form-group--year-input" show-input-error="false" value=""></va-text-input>
                </div>
              </div>
            </fieldset>
          </div>
        </mock:shadow-root>
      </va-memorable-date>
    `);
  });

  it('passes an axe check without monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-memorable-date day="5" label="Test Label" month="3" name="test" year="2000" month-select="false"></va-memorable-date>
      `,
    );
    await axeCheck(page);
  });

  it('renders hint text without month-select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="Label" hint="hint text" required month-select="false"></va-memorable-date>');

    const element = await page.find('va-memorable-date');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualHtml(`
      <va-memorable-date class='hydrated' label='Label' hint='hint text' month-select='false' required=''>
      <mock:shadow-root>
        <div class="input-wrap">
          <fieldset class="usa-fieldset usa-form">
            <legend class="usa-legend" id="input-label" part="legend">
              Label
              <span class="usa-label--required">
                required
              </span>
              <div class="usa-hint" id="hint">
                hint text
              </div>
              <span class="usa-hint" id="dateHint">
                date-hint
              </span>
            </legend>
            <span id="error-message" role="alert"></span>
            <slot></slot>
            <div class="usa-memorable-date">
              <div class="usa-form-group usa-form-group--month">
                <va-text-input aria-describedby="dateHint hint" class="hydrated memorable-date-input usa-form-group--month-input" show-input-error="false"></va-text-input>
              </div>
              <div class="usa-form-group usa-form-group--day">
                <va-text-input aria-describedby="dateHint hint" class="hydrated memorable-date-input usa-form-group--day-input" show-input-error="false"></va-text-input>
              </div>
              <div class="usa-form-group usa-form-group--year">
                <va-text-input aria-describedby="dateHint hint" class="hydrated memorable-date-input usa-form-group--year-input" show-input-error="false" value=""></va-text-input>
              </div>
            </div>
          </fieldset>
        </div>
      </mock:shadow-root>
    </va-memorable-date>
    `);
  });

  it('renders an error message without monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date error="This is a mistake" month-select="false" />');

    // Render the error message text
    const error = await page.find('va-memorable-date >>> span#error-message');
    // expect(error).toEqualHtml('test');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('renders a required span without monthSelect', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date label="This is a field" required month-select="false" />',
    );

    const requiredSpan = await page.find('va-memorable-date >>> span.usa-label--required');
    expect(requiredSpan).not.toBeNull();
  });

  it('without monthSelect day and month input fields only allows for a maximum of 2 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" month-select="false" />');

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

  describe('validation without monthSelect', () => {
    it('without monthSelect does year validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" month-select="false" />',
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

    it('without monthSelect does day validation without required prop', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" month-select="false" />',
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

   it('without monthSelect does validation for required components and displays the correct error message', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date name="test" required month-select="false" />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleMonth = await page.$('pierce/[name="testMonth"]');

      // Trigger Blur
      await handleMonth.press('Tab');
      await handleYear.press('Tab');
      await page.waitForChanges();

      expect(date.getAttribute('error')).toEqual("month-range");

      const errorSpan = await page.find('va-memorable-date >>> span#error-message');
      expect(errorSpan.textContent).toContain("month-range");
    });

    it('with monthSelect displays the correct error message', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date name="test" required month-select="true" />',
      );
      const date = await page.find('va-memorable-date');
      const handleYear = await page.$('pierce/[name="testYear"]');
      const handleMonth = await page.$('pierce/[name="testMonth"]');

      // Trigger Blur
      await handleMonth.press('Tab');
      await handleYear.press('Tab');
      await page.waitForChanges();

      expect(date.getAttribute('error')).toEqual("month-select");

      const errorSpan = await page.find('va-memorable-date >>> span#error-message');
      expect(errorSpan.textContent).toContain("month-select");
    });

    it('without monthSelect allows for a custom required message', async () => {
      const page = await newE2EPage();
      await page.setContent('<va-memorable-date value="2000-01-01" name="test" label="This is a field" required month-select="false" />');

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

    it('without monthSelect resets error to null when fixed', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<va-memorable-date value="1999-05-03" name="test" required="true" month-select="false" />',
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

    describe('without monthSelect invalid subcomponents', () => {
      it('without monthSelect correctly indicates an invalid year', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" month-select="false" />',
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

      it('without monthSelect correctly indicates an invalid day', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date value="1999-05-03" name="test" required="true" month-select="false" />',
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

      it('without monthSelect passes the invalidDay prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-day month-select="false" />',
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

      it('without monthSelect passes the invalidMonth prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-month month-select="false" />',
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

      it('without monthSelect passes the invalidYear prop correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(
          '<va-memorable-date name="test" invalid-year month-select />',
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

  it('without monthSelect sets a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date label="This is a label" month-select="false" />');

    const label = await page.find('va-memorable-date >>> legend');
    expect(label.innerText).toContain('This is a label');
  });

  it('without monthSelect emits dateBlur event', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-memorable-date value="1999-05-03" name="test" month-select="false" />',
    );

    const handleYear = await page.$('pierce/[name="testYear"]');
    const blurSpy = await page.spyOnEvent('dateBlur');
    // Trigger Blur
    await handleYear.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('without monthSelect formats single digit days and months into 2 digits with a leading 0', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-memorable-date name="test" month-select="false" />');
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

  it('without monthSelect fires an analytics event when enableAnalytics is true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date enable-analytics name="test" label="Example label" month-select="false" />',
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

  it('Applies a unique name attribute for each input', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date name="test" />');

    const yearInput = await page.$('pierce/[name="testYear"]');
    const monthInput = await page.$('pierce/[name="testMonth"]');
    const dayInput = await page.$('pierce/[name="testDay"]');
    expect(yearInput).not.toBeNull();
    expect(monthInput).not.toBeNull();
    expect(dayInput).not.toBeNull();
  });

  it('When the name prop is not set, input name attributes default to input type name', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-memorable-date />');

    const yearInput = await page.$('pierce/[name="Year"]');
    const monthInput = await page.$('pierce/[name="Month"]');
    const dayInput = await page.$('pierce/[name="Day"]');
    expect(yearInput).not.toBeNull();
    expect(monthInput).not.toBeNull();
    expect(dayInput).not.toBeNull();
  });

  it('useFormsPattern displays header for the single field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date use-forms-pattern="single" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    const formHeader = await page.find('va-memorable-date >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern displays header for the multiple field pattern', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date use-forms-pattern="multiple" form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    const formHeader = await page.find('va-memorable-date >>> h1');
    expect(formHeader.innerText).toEqual('This is a form header');
  });

  it('useFormsPattern does not display header if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    const formHeader = await page.find('va-textarea >>> h1');
    expect(formHeader).toBeNull();
  });

  it('useFormsPattern does not display header if "single" or "multiple" is not indicated', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date form-heading-level="1" form-heading="This is a form header" form-description="This is a form description" label="Describe your situation"></va-textarea>',
    );

    await axeCheck(page);
  });

  it('renders custom month error when custom-month-error-message set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date name="test" label="Example label" month-select="false" custom-month-error-message="This is a custom month error message"/>',
    );
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Month
    await handleMonth.press('0');
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

    const errorSpan = await page.find('va-memorable-date >>> span.usa-error-message');
    expect(errorSpan).not.toBeNull();
    expect(errorSpan.innerHTML).toEqual('This is a custom month error message')
  });

  it('renders custom day error when custom-day-error-message set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date name="test" label="Example label" month-select="false" custom-day-error-message="This is a custom day error message"/>',
    );
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Month
    await handleMonth.press('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('0');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();

    const errorSpan = await page.find('va-memorable-date >>> span.usa-error-message');
    expect(errorSpan).not.toBeNull();
    expect(errorSpan.innerHTML).toEqual('This is a custom day error message')
  });

  it('renders custom year error when custom-year-error-message set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-memorable-date name="test" label="Example label" month-select="false" custom-year-error-message="This is a custom year error message"/>',
    );
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Month
    await handleMonth.press('1');
    await handleMonth.press('Tab');
    // Day
    await handleDay.press('1');
    await handleDay.press('Tab');
    // Year
    await handleYear.press('1');
    await handleYear.press('8');
    await handleYear.press('9');
    await handleYear.press('9');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();

    const errorSpan = await page.find('va-memorable-date >>> span.usa-error-message');
    expect(errorSpan).not.toBeNull();
    expect(errorSpan.innerHTML).toEqual('This is a custom year error message')
  });
});
