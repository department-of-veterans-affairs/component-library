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

  // Render the error message text
  const requiredSpan = await page.find('va-date >>> span.required');
  expect(requiredSpan).not.toBeNull();
});
