import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-date', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date></va-date>');

    const element = await page.find('va-date');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
      <va-date day="5" label="Test Label" month="3" name="test" year="2000"></va-date>
      `,
    );
    await axeCheck(page);
  });

  it('renders an error message', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date error="This is a mistake" />');

    // Render the error message text
    const error = await page.find('va-date >>> span.error-message');
    expect(error.innerText).toContain('This is a mistake');
  });

  it('renders a required span', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date label="This is a field" required />');

    const requiredSpan = await page.find('va-date >>> span.required');
    expect(requiredSpan).not.toBeNull();
  });

  it('sets a label', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date label="This is a label" />');

    const label = await page.find('va-date >>> legend');
    expect(label.innerText).toContain('This is a label');
  });

  it('sets a default date', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date value="1999-05-03" />');

    const month = await page.find('va-date >>> .select-month');
    const day = await page.find('va-date >>> .select-day');
    const year = await page.find('va-date >>> .input-year');

    expect(month.getAttribute('value')).toBe('5');
    expect(day.getAttribute('value')).toBe('3');
    expect(year.getAttribute('value')).toBe('1999');
  });

  it('updates date based select and input fields', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date value="1999-05-03" name="test" />');

    const date = await page.find('va-date');
    const elementMonth = await page.find('va-date >>> .select-month');
    const elementDay = await page.find('va-date >>> .select-day');
    const elementYear = await page.find('va-date >>> .input-year');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');

    await handleMonth.select('7');
    await handleDay.select('21');
    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();

    expect(elementMonth.getAttribute('value')).toBe('7');
    expect(elementDay.getAttribute('value')).toBe('21');
    expect(elementYear.getAttribute('value')).toBe('2022');
    expect(date.getAttribute('value')).toBe('2022-07-21');
  });

  it('sets the correct amount of days per month', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date name="test" />');

    const elementMonth = await page.find('va-date >>> .select-month');
    const elementDay = await page.find('va-date >>> .select-day');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');

    await handleMonth.select('1');
    await page.waitForChanges();
    await handleDay.select('31');
    await page.waitForChanges();
    expect(elementMonth.getAttribute('value')).toBe('1');
    expect(elementDay.getAttribute('value')).toBe('31');

    await handleMonth.select('2');
    await page.waitForChanges();
    expect(elementMonth.getAttribute('value')).toBe('2');
    expect(elementDay.getAttribute('value')).toBe('');
  });

  it('year input only allows for 4 characters to be used', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-date name="test" />');

    const elementYear = await page.find('va-date >>> .input-year');
    const handleYear = await page.$('pierce/[name="testYear"]');
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    await handleYear.press('3');

    await page.waitForChanges();
    expect(elementYear.getAttribute('value')).toBe('2022');
  });

  it('fires a error message onBlur if date is invalid and component is required', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-date value="1999-05-03" name="test" required="true" />',
    );
    const date = await page.find('va-date');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');

    await page.waitForChanges();
    expect(date.getAttribute('error')).toEqual('Please enter a valid date');

    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('error')).toEqual('');
  });

  it('emits dateBlur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-date value="1999-05-03" name="test" />');

    const handleYear = await page.$('pierce/[name="testYear"]');
    const blurSpy = await page.spyOnEvent('dateBlur');
    // Trigger Blur
    await handleYear.press('Tab');

    expect(blurSpy).toHaveReceivedEvent();
  });

  it('emits dateChange event when select or input value is updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-date value="1999-05-03" name="test" />');

    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    const spy = await page.spyOnEvent('dateChange');

    await handleMonth.select('7');
    await handleDay.select('21');

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

    await page.setContent('<va-date name="test"/>');
    const date = await page.find('va-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.select('3');
    await page.waitForChanges();
    // Day
    await handleDay.select('2');
    await page.waitForChanges();
    // Year
    await handleYear.press('2');
    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('2022-03-02');
  });

  it('only allows specific keys to be used inside input fields', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-date name="test"/>');
    const date = await page.find('va-date');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Year
    await handleYear.press('a');
    await handleYear.press(']');
    await handleYear.press('/');
    await handleYear.press(',');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('value')).toBe('--');
  });

  it('checks for valid year month and day', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-date name="test"/>');
    const date = await page.find('va-date');
    const handleMonth = await page.$('pierce/[name="testMonth"]');
    const handleDay = await page.$('pierce/[name="testDay"]');
    const handleYear = await page.$('pierce/[name="testYear"]');
    // Month
    await handleMonth.select();
    // Day
    await handleDay.select();
    // Year
    await handleYear.press('3');
    await handleYear.press('0');
    await handleYear.press('0');
    await handleYear.press('0');
    // Trigger Blur
    await handleYear.press('Tab');
    await page.waitForChanges();
    expect(date.getAttribute('error')).toEqual('Please enter a valid date');
  });
});
