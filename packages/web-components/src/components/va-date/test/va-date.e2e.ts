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
        <va-date day="5" label="Test Label" month="3" name="test" year="2000">
            Header text slot
        </va-date>
    `,
    );

    await axeCheck(page);
  });
});
