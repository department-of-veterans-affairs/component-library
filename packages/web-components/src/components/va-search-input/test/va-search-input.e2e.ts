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

  it('renders with button with text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input button-text="Search VA.gov"></va-search-input>',
    );

    const element = await page.find('va-search-input');
    expect(element).toEqualHtml(`
      <va-search-input button-text="Search VA.gov" class="hydrated" value="">
        <mock:shadow-root>
          <input aria-autocomplete="none" aria-label="Search" autocomplete="off" id="va-search-input" type="text">
          <button aria-label="Search" id="va-search-button" type="submit">
            <i aria-hidden="true" class="fa fa-search"></i>
            <span id="va-search-button-text">
              Search VA.gov
            </span>
          </button>
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
    const button = await page.find('va-search-input >>> button');
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

  it('fires an analytics event when button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-search-input >>> button');
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
    await component.press('Tab'); // on the button
    await component.press('Tab'); // off the component

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-search-input',
      details: {
        value: 'benefits',
      },
    });
  });

  // Begin USWDS tests

  it('uswds renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

    const element = await page.find('va-search-input');
    expect(element).toHaveClass('hydrated');
  });

  it('uswds passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

    await axeCheck(page);
  });

  it('uswds passes an axe check with suggestions visible', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-search-input uswds></va-search-input>`);

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

  it('uswds renders with button with text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input uswds button-text="Search VA.gov"></va-search-input>',
    );

    const element = await page.find('va-search-input');
    expect(element).toEqualHtml(`
      <va-search-input button-text="Search VA.gov" class="hydrated" value="" uswds="">
        <mock:shadow-root>
        <form class="usa-search" role="search">
          <label class="usa-sr-only" for="search-field">Search</label>
          <input class="usa-input" id="search-field" name="search" type="search" aria-autocomplete="none" aria-label="Search" autocomplete="off">
          <button class="usa-button" type="submit">
          <span class="usa-search__submit-text">Search</span>
          <va-icon class="hydrated"></va-icon>
          </button>
        </form>
        </mock:shadow-root>
      </va-search-input>
    `);
  });

  it('uswds fires input event on key press', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds fires submit event on search button click when input has a value', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

    await page.$eval('va-search-input', (elm: any) => {
      elm.value = 'benefits';
    });

    const submitSpy = await page.spyOnEvent('submit');
    const button = await page.find('va-search-input >>> button');
    await button.click();

    expect(submitSpy).toHaveReceivedEventTimes(1);
  });

  it('uswds focuses first suggestion when pressing ArrowDown inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds focuses last suggestion when pressing ArrowUp inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds clears input value when pressing Escape key inside input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds focuses next suggestion when pressing ArrowDown when suggestions are visible', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds focuses last suggestion when pressing ArrowUp with first suggestion selected', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds sets input value to suggestion when pressing Enter key with suggestion focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds clears input value when pressing Escape key with a suggestion focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds fires submit event when enter key is pressed', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds fires submit event when a suggestion is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds displays up to 5 suggestions but not more', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds></va-search-input>');

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

  it('uswds fires an analytics event when button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input uswds label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const button = await page.find('va-search-input >>> button');
    await button.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'click',
      componentName: 'va-search-input',
      details: {
        value: 'benefits',
      },
    });
  });

  it('uswds fires an analytics event on blur', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-search-input uswds label="Search" value="benefits""></va-search-input>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const component = await page.find('va-search-input');
    await component.press('Tab'); // on the input
    await component.press('Tab'); // on the button
    await component.press('Tab'); // off the component

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'blur',
      componentName: 'va-search-input',
      details: {
        value: 'benefits',
      },
    });
  });

  it('uswds displays as the small variation', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds small></va-search-input>');

    const form = await page.find('va-search-input >>> form');
    expect(form).toHaveClass('usa-search--small');
  });

  it('uswds displays as the big variation', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-input uswds big></va-search-input>');

    const form = await page.find('va-search-input >>> form');
    expect(form).toHaveClass('usa-search--big');
  });
});
