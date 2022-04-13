import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const element = await page.find('va-search');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await axeCheck(page);
  });

  it('passes an axe check with suggestions visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-search></va-search>`);

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for spouses',
        'benefits for assisted living',
        'benefits for family',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    await axeCheck(page);
  });

  it('fires input blur event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const blurSpy = await page.spyOnEvent('inputBlurEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    const component = await page.find('va-search');
    await component.press('Tab');

    expect(blurSpy).toHaveReceivedEventTimes(1);
  });

  it('fires input change event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const changeSpy = await page.spyOnEvent('inputChangeEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('F');
    await input.press('o');
    await input.press('r');
    await input.press('m');
    await input.press('s');

    const component = await page.find('va-search');
    await component.press('Tab');

    expect(changeSpy).toHaveReceivedEventTimes(1);
  });

  it('fires input focus event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const focusSpy = await page.spyOnEvent('inputFocusEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    expect(focusSpy).toHaveReceivedEventTimes(1);
  });

  it('fires input keydown event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const keyDownSpy = await page.spyOnEvent('inputKeyDownEvent');
    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('F');
    await input.press('o');
    await input.press('r');
    await input.press('m');
    await input.press('s');

    expect(keyDownSpy).toHaveReceivedEventTimes(5);
  });

  it('fires button click event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const clickSpy = await page.spyOnEvent('buttonClickEvent');
    const button = await page.find('va-search >>> button');
    await button.click();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  it('fires button focus event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const focusSpy = await page.spyOnEvent('buttonFocusEvent');
    const button = await page.find('va-search >>> button');
    await button.focus();

    expect(focusSpy).toHaveReceivedEventTimes(1);
  });

  it('fires button keydown event', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    const keyDownSpy = await page.spyOnEvent('buttonKeyDownEvent');
    const button = await page.find('va-search >>> button');
    await button.focus();

    await button.press('Tab');

    expect(keyDownSpy).toHaveReceivedEventTimes(1);
  });

  it('renders with button with text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search button-text="Search VA.gov"></va-search>',
    );

    const element = await page.find('va-search');
    expect(element).toEqualHtml(`
      <va-search button-text="Search VA.gov" class="hydrated">
        <mock:shadow-root>
          <input aria-autocomplete="none" aria-label="Search" autocomplete="off" id="va-search-input" type="text">
          <button aria-label="Search" id="va-search-button" type="submit">
            <i aria-hidden="true" class="fa fa-search"></i>
            <span id="va-search-button-text">
              Search VA.gov
            </span>
          </button>
        </mock:shadow-root>
      </va-search>
    `);
  });

  it('focuses first suggestion when pressing ArrowDown inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.textContent).toContain(
      'benefits for assisted living',
    );
  });

  it('focuses last suggestion when pressing ArrowUp inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('ArrowUp');

    const selectedSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.textContent).toContain('benefits for spouses');
  });

  it('clears input value when pressing Escape key inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();

    await input.press('Escape');

    const inputValue = await input.getProperty('value');

    expect(inputValue).toContain('');
  });

  it('focuses next suggestion when pressing ArrowDown when suggestions are visible', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const currentSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );
    await currentSuggestion.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.textContent).toContain('benefits for family');
  });

  it('focuses last suggestion when pressing ArrowUp with first suggestion selected', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const currentSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );
    await currentSuggestion.press('ArrowUp');

    const selectedSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.textContent).toContain('benefits for spouses');
  });

  it('sets input value to suggestion when pressing Enter key with suggestion focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );
    await selectedSuggestion.press('Enter');

    const inputValue = await input.getProperty('value');

    expect(inputValue).toContain('benefits for assisted living');
  });

  it('clears input value when pressing Escape key with a suggestion focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search></va-search>');

    await page.$eval('va-search', (elm: any) => {
      elm.inputValue = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
      elm.showSuggestions = true;
    });

    await page.waitForChanges();

    const input = await page.find('va-search >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search >>> [aria-selected="true"]',
    );
    await selectedSuggestion.press('Escape');

    const inputValue = await input.getProperty('value');

    expect(inputValue).toContain('');
  });
});
