import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const filterOptions = JSON.stringify([ 
  { 
    id: 1,
    label: "Benefits",
    category: [
      { label: "Health Care", id: 2 },
      { label: "Education", id: 3 },
      { label: "Housing", id: 4 }
    ]
  },
  { 
    label:"Service Status",
    id: 5,
    category: [
      { label: "Veteran", id: 6 },
      { label: "Active Duty", id: 7 },
      { label: "Reservist", id: 8 },
      { label: "National Guard", id: 9 },
      { label: "Retired", id: 10 },
      { label: "Disabled", id: 11 },
      { label: "Other", id: 12 }
    ]
  }
]);

describe('va-search-filter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-filter></va-search-filter>');

    const element = await page.find('va-search-filter');
    expect(element).toHaveClass('hydrated');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the property directly
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    await axeCheck(page);
  });

  it('displays header text when header prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');

    const header = await page.find('va-search-filter >>> #header');
    const text = await header?.getProperty('textContent');
    expect(text).toBe('Filter');
  });

  // create a test that checks that the options are displayed
  it('displays filter accordion when filterOptions prop is set - desktop', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the property directly
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    const accordion = await page.find('va-search-filter >>> va-accordion');
    expect(accordion).not.toBeNull();
  });

  it('displays filter accordion when filterOptions prop is set - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the property directly
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // expect a va-accordion to be rendered with the class
    const accordion = await page.find('va-search-filter >>> va-accordion');
    expect(accordion).not.toBeNull();
  });

  it('displays the correct number of filter facets - desktop', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options property directly
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // expect the same number of accordion items as filter options
    const accordionItems = await page.findAll('va-search-filter >>> va-accordion-item');
    expect(accordionItems.length).toBe(options.length);
  });

  it('displays the correct number of filter facets - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the property directly
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // get count of va-checkbox-group
    const checkboxGroups = await page.findAll('va-search-filter >>> va-checkbox-group');
    expect(checkboxGroups.length).toBe(options.length);
  });

  it('displays only one va-accordion-item - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the property directly
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // expect only one va-accordion-item to be rendered for mobile web
    const accordionItems = await page.findAll('va-search-filter >>> va-accordion-item');
    expect(accordionItems.length).toBe(1);
  });
});
