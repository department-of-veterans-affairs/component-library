import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-search-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    const element = await page.find('va-search-input');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await axeCheck(page);
  });

  it('passes an axe check with suggestions visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-search-input></va-search-input>`);

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for spouses',
        'benefits for assisted living',
        'benefits for family',
      ];
    });

    await page.waitForChanges();

    await axeCheck(page);
  });

  it('renders with search button with text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input button-text="Search VA.gov"></va-search-input>',
    );

    const element = await page.find('va-search-input');
    expect(element).toEqualHtml(`
      <va-search-input button-text="Search VA.gov" class="hydrated" value="">
        <mock:shadow-root>
        <form class="usa-search" role="search">
          <label class="usa-sr-only" for="search-field">Search</label>
          <input class="usa-input" id="search-field" name="search" type="search" aria-autocomplete="none" aria-label="Search" autocomplete="off">
          <button aria-label="Clear the search contents" class="usa-search__clear-input" type="button">
            <va-icon class="hydrated usa-search__clear-icon"></va-icon>
          </button>
          <button class="usa-button" type="submit">
          <span class="usa-search__submit-text">Search VA.gov</span>
          <va-icon class="hydrated usa-search__submit-icon"></va-icon>
          </button>
        </form>
        </mock:shadow-root>
      </va-search-input>
    `);
  });

  it('fires input event on key press', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    const inputSpy = await page.spyOnEvent('input');
    const input = await page.find('va-search-input >>> input');
    await input.focus();

    await input.press('F');
    await input.press('o');
    await input.press('r');
    await input.press('m');
    await input.press('s');

    expect(inputSpy).toHaveReceivedEventTimes(5);
  });

  it('fires submit event on search button click when input has a value', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
    });

    const submitSpy = await page.spyOnEvent('submit');
    const button = await page.find('va-search-input >>> button[type="submit"]');
    await button.click();

    expect(submitSpy).toHaveReceivedEventTimes(1);
  });

  it('focuses first suggestion when pressing ArrowDown inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();

    await input.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.innerText).toContain(
      'benefits for assisted living',
    );
  });

  it('focuses last suggestion when pressing ArrowUp inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();

    await input.press('ArrowUp');

    const selectedSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.innerText).toContain('benefits for spouses');
  });

  it('clears input value when pressing Escape key inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();

    await input.press('Escape');

    const inputValue = await input.getProperty('value');

    expect(inputValue).toContain('');
  });

  it('focuses next suggestion when pressing ArrowDown when suggestions are visible', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const currentSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );
    await currentSuggestion.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.innerText).toContain('benefits for family');
  });

  it('focuses last suggestion when pressing ArrowUp with first suggestion selected', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const currentSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );
    await currentSuggestion.press('ArrowUp');

    const selectedSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );

    expect(selectedSuggestion.innerText).toContain('benefits for spouses');
  });

  it('sets input value to suggestion when pressing Enter key with suggestion focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );
    await selectedSuggestion.press('Enter');

    const inputValue = await input.getProperty('value');

    expect(inputValue).toContain('benefits for assisted living');
  });

  it('clears input value when pressing Escape key with a suggestion focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const input = await page.find('va-search-input >>> input');
    await input.focus();
    await input.press('ArrowDown');

    const selectedSuggestion = await page.find(
      'va-search-input >>> [aria-selected="true"]',
    );
    await selectedSuggestion.press('Escape');

    const inputValue = await input.getProperty('value');

    expect(inputValue).toContain('');
  });

  it('fires submit event when enter key is pressed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');

    const submitSpy = await page.spyOnEvent('submit');
    const input = await page.find('va-search-input >>> input');
    await input.focus();

    await input.press('F');
    await input.press('o');
    await input.press('r');
    await input.press('m');
    await input.press('s');
    await input.press('Enter');

    expect(submitSpy).toHaveReceivedEvent();
  });

  it('fires submit event when a suggestion is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');
    const inputEl = await page.find('va-search-input >>> input');
    await inputEl.click(); // Focus on the element

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits for assisted living',
        'benefits for family',
        'benefits for spouses',
      ];
    });

    await page.waitForChanges();

    const submitSpy = await page.spyOnEvent('submit');

    const firstSuggestion = await page.find(
      'va-search-input >>> [role="option"]',
    );

    await firstSuggestion.click();

    expect(submitSpy).toHaveReceivedEvent();
  });

  it('displays up to 5 suggestions but not more', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input></va-search-input>');
    const inputEl = await page.find('va-search-input >>> input');
    await inputEl.click(); // Focus on the element

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
      elm.suggestions = [
        'benefits delivery at discharge',
        'benefits for surviving spouse',
        'benefits for spouses',
        'benefits for assisted living',
        'benefits for family',
        'x',
        'y',
        'z',
      ];
    });

    await page.waitForChanges();

    const suggestions = await page.findAll(
      'va-search-input >>> [role="option"]',
    );

    expect(suggestions.length).toEqual(5);
  });

  it('fires an analytics event when search button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-search-input >>> button[type="submit"]');
    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-search-input',
      details: {
        value: 'benefits',
      },
    });
  });

  it('fires an analytics event on blur', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const component = await page.find('va-search-input');
    await component.press('Tab'); // on the input
    await component.press('Tab'); // on the clear button
    await component.press('Tab'); // on the search button
    await component.press('Tab'); // off the component

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-search-input',
      details: {
        value: 'benefits',
      },
    });
  });

  it('does not fire an analytics event when search button is clicked if analytics are disabled with only the prop name', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input disable-analytics label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-search-input >>> button[type="submit"]');
    await button.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('does not fire an analytics event when search button is clicked if analytics are disabled with the explicit "true" value', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input disable-analytics="true" label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-search-input >>> button[type="submit"]');
    await button.click();

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('does not fire an analytics event on blur if analytics are disabled with only the prop name', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input disable-analytics label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const component = await page.find('va-search-input');
    await component.press('Tab'); // on the input
    await component.press('Tab'); // on the clear button
    await component.press('Tab'); // on the search button
    await component.press('Tab'); // off the component

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('does not fire an analytics event on blur if analytics are disabled with the explicit "true" value', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input disable-analytics="true" label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const component = await page.find('va-search-input');
    await component.press('Tab'); // on the input
    await component.press('Tab'); // on the clear button
    await component.press('Tab'); // on the search button
    await component.press('Tab'); // off the component

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });

  it('displays as the small variation', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input small></va-search-input>');

    const form = await page.find('va-search-input >>> form');
    expect(form).toHaveClass('usa-search--small');
  });

  it('displays as the big variation', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input big></va-search-input>');

    const form = await page.find('va-search-input >>> form');
    expect(form).toHaveClass('usa-search--big');
  });
});
