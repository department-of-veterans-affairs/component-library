import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const filterOptions = JSON.stringify([
  {
    id: 1,
    label: "Benefits",
    category: [
      { label: "Health Care", id: 2, active: true },
      { label: "Education", id: 3 },
      { label: "Housing", id: 4, active: true }
    ]
  },
  {
    label:"Service Status",
    id: 5,
    category: [
      { label: "Veteran", id: 6 },
      { label: "Active Duty", id: 7, active: true },
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

  it('displays the total active filter count in the header when the component initially loads - desktop', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Verify that the active filter count is displayed in the header
    const header = await page.find('va-search-filter >>> #header');
    const text = await header.getProperty('textContent');
    expect(text).toContain('3');
  });

  it('displays the total active filter count in the header when the component initially loads - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Verify that the va-accordion-item header prop contains the active filter count
    const accordionItem = await page.find('va-search-filter >>> va-accordion-item');
    const header = await accordionItem?.getProperty('header');
    expect(header).toContain('3');
  });

  it ('displays the total active categories for each facet - desktop', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Get the accordion items which display the active filter counts in their headers
    const accordionItems = await page.findAll('va-search-filter >>> va-accordion-item');

    // Check that the first accordion item header contains the active filter count (2)
    const firstAccordionItem = accordionItems[0];
    const firstHeader = await firstAccordionItem.getProperty('header');
    expect(firstHeader).toContain('2');

    // Check that the second accordion item header contains the active filter count (1)
    const secondAccordionItem = accordionItems[1];
    const secondHeader = await secondAccordionItem.getProperty('header');
    expect(secondHeader).toContain('1');
  })

  it ('displays the total active categories for each facet - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filter"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Get all checkbox groups
    const checkboxGroups = await page.findAll('va-search-filter >>> va-checkbox-group');

    // Check that we have at least one checkbox group
    expect(checkboxGroups.length).toBeGreaterThan(0);

    // Check the first checkbox group label
    if (checkboxGroups.length > 0) {
      const firstCheckboxGroup = checkboxGroups[0];
      const firstLabel = await firstCheckboxGroup.getProperty('label');
      expect(firstLabel).toContain('2');
    }

    // Check the second checkbox group label if it exists
    if (checkboxGroups.length > 1) {
      const secondCheckboxGroup = checkboxGroups[1];
      const secondLabel = await secondCheckboxGroup.getProperty('label');
      expect(secondLabel).toContain('1');
    }
  });

  it('adds the "applied" descriptor to the h2 text for screenreaders - desktop', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filters"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Get the h2 element
    const h2 = await page.find('va-search-filter >>> h2');
    const text = await h2.getProperty('textContent');
    expect(text).toBe('Filters (3) applied');
  });

  it('adds the correct headerSrOnly text to the va-accordion-item prop - desktop', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filters" headerSrOnly="with sr-only text"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Get the va-accordion-item element
    const accordionItem = await page.find('va-search-filter >>> va-accordion-item');
    const header = await accordionItem.getProperty('header');
    expect(header).toBe('Benefits (2)');

    const headerSrOnly = await accordionItem.getProperty('headerSrOnly');
    expect(headerSrOnly).toBe('filters applied');
  });

  it('adds the correct headerSrOnly text to the va-accordion-item prop - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filters"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Get the va-accordion-item element
    const accordionItem = await page.find('va-search-filter >>> va-accordion-item');
    const header = await accordionItem.getProperty('header');
    expect(header).toBe('Filters (3)');

    const headerSrOnly = await accordionItem.getProperty('headerSrOnly');
    expect(headerSrOnly).toBe('applied');
  })

  it('adds the correct headersSrOnly text to the va-checkbox-group prop - mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    // Create the component
    await page.setContent('<va-search-filter header="Filters"></va-search-filter>');
    const element = await page.find('va-search-filter');

    // Set the filter options
    const options = JSON.parse(filterOptions);
    element.setProperty('filterOptions', options);
    await page.waitForChanges();

    // Get the va-checkbox-group element
    const checkboxGroup = await page.find('va-search-filter >>> va-checkbox-group');
    const label = await checkboxGroup.getProperty('label');
    expect(label).toBe('Benefits (2)');
    const labelSrOnly = await checkboxGroup.getProperty('labelSrOnly');
    expect(labelSrOnly).toBe('filters applied');
  })
});
