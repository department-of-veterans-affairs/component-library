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

    const label = await page.find('va-date >>> label');
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
    await page.waitForChanges();

    expect(elementMonth.getAttribute('value')).toBe('7');
    expect(elementDay.getAttribute('value')).toBe('21');
    expect(elementYear.getAttribute('value')).toBe('2022');
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

  it('provides a max and min year to input field', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-date name="test" min-year="2000" max-year="2022" />',
    );

    const inputYear = await page.$('pierce/[name="testYear"]');

    expect(await inputYear.evaluate(node => node.getAttribute('min'))).toBe(
      '2000',
    );
    expect(await inputYear.evaluate(node => node.getAttribute('max'))).toBe(
      '2022',
    );
  });

  it('fires an invalid message if date is invalid and component is required', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-date value="1999-05-03" name="test" required="true" />',
    );
    const date = await page.find('va-date');
    const handleYear = await page.$('pierce/[name="testYear"]');

    // Click three times to select all text in input
    await handleYear.click({ clickCount: 3 });
    await handleYear.press('2');

    await page.waitForChanges();
    expect(date.getAttribute('invalid')).toEqual('Please provide a valid date');

    await handleYear.press('0');
    await handleYear.press('2');
    await handleYear.press('2');

    await page.waitForChanges();
    expect(date.getAttribute('invalid')).toBeNull();
  });
});
