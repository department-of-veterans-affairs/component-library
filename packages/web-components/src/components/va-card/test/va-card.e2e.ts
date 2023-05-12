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
                    <slot></slot>
                </div>
            </mock:shadow-root>
            </va-card>
      `);

        expect(element).not.toHaveClass('show-shadow');
    }); 

    it('renders box shadow', async () => {
        const page = await newE2EPage();
    
        await page.setContent('<va-card show-shadow="true"></va-card>');
        const element = await page.find('va-card >>> div');
    
        expect(element).toHaveClass('show-shadow');

    });

    it('passes an axe check', async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<va-card><h3 slot="headline">Card</h3>Card content</va-card>`,
        );
    
        await axeCheck(page);
      });
})