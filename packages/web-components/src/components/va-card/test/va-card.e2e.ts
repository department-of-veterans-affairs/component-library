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
                    <slot></slot>
                </mock:shadow-root>
            </va-card>
      `);

        expect(element).not.toHaveClass('show-shadow');
    }); 

    it('displays a box shadow when show-shadow prop is set', async () => {
        const page = await newE2EPage();
    
        await page.setContent('<va-card show-shadow></va-card>');
        const element = await page.find('va-card')

        expect((await element.getComputedStyle()).boxShadow).toEqual(
            'rgba(0, 0, 0, 0.32) 1px 1px 5px 1px',
          );
    });

    it('displays a gray background when background prop is set', async () => {
        const page = await newE2EPage();
    
        await page.setContent('<va-card background></va-card>');
        const element = await page.find('va-card')

        // --color-gray-lightest which is #f0f0f0 and also rgb(240, 240, 240)
        expect((await element.getComputedStyle()).backgroundColor).toEqual(
            'rgb(240, 240, 240)',
          );
    });

    it('displays a white background when show-shadow and background is set', async () => {
        const page = await newE2EPage();
    
        await page.setContent('<va-card show-shadow background></va-card>');
        const element = await page.find('va-card')

        expect((await element.getComputedStyle()).backgroundColor).toEqual(
            'rgb(255, 255, 255)',
          );
    });

    it('passes an axe check', async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<va-card><h3>Card</h3><p>Card content</p></va-card>`,
        );
    
        await axeCheck(page);
      });
      
    it('renders an icon in a blue circle when icon-name is set', async () => {
        const page = await newE2EPage();
        await page.setContent('<va-card icon-name="check"></va-card>');
        const iconWrapper = await page.find('va-card >>> .va-card__icon-wrapper');
        const iconCircle = await page.find('va-card >>> .va-card__icon-circle');
        const vaIcon = await page.find('va-card >>> va-icon');
        expect(iconWrapper).not.toBeNull();
        expect(iconCircle).not.toBeNull();
        expect(vaIcon).not.toBeNull();
        expect(vaIcon).toHaveClass('hydrated');
    });
})