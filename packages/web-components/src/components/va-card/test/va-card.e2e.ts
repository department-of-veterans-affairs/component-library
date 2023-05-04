import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-card', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<va-card></va-card>');
        const element = await page.find('va-card');
    
        expect(element).toEqualHtml(`
            <va-card class="hydrated">
            <mock:shadow-root>
                <div class="va-card">
                    <slot name="headline"></slot>
                    <slot name="content"></slot>
                </div>
            </mock:shadow-root>
            </va-card>
      `);
    }); 

    it('renders an empty div with a "polite" aria-live tag when not visible', async () => {
        const page = await newE2EPage();
    
        await page.setContent('<va-card visible="false"></va-card>');
        const element = await page.find('va-card');
    
        expect(element).toEqualHtml(`
          <va-card class="hydrated" visible="false">
            <mock:shadow-root>
              <div aria-live="polite"></div>
            </mock:shadow-root>
          </va-card>
        `);
    });

    it('passes an axe check', async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<va-card><h3 slot="headline">Card</h3>Card content</va-card>`,
        );
    
        await axeCheck(page);
      });
})