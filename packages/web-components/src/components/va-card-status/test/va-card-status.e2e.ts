import { newE2EPage } from '@stencil/core/testing';

describe('<va-card-status />', () => {
  it('renders the header text with the correct header level', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Hello"
        header-level="2"
        link-href="/home"
        link-text="Go Home">
      </va-card-status>
      `);
    await page.waitForChanges();

    const header = await page.find(
      'va-card-status >>> h2.va-card-status__header span.va-card-status_card-title',
    );
    expect(header).not.toBeNull();
    expect(header.textContent).toBe('Hello');
  });

  it('renders the required text when required=true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Label"
        link-href="/home"
        link-text="Go Home"
        required="true">
      </va-card-status>`);
    await page.waitForChanges();

    const required = await page.find('va-card-status >>> .required');
    expect(required).not.toBeNull();
    expect(required.textContent.toLowerCase()).toContain('required');
  });

  it('renders tag status when tagText + tagStatus are provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Test"
        tag-text="Info"
        tag-status="info"
        link-href="/home"
        link-text="Go Home">
      </va-card-status>
    `);
    await page.waitForChanges();

    const tagStatus = await page.find('va-card-status >>> va-tag-status');
    expect(tagStatus).not.toBeNull();
    expect(tagStatus.getAttribute('status')).toBe('info');
  });

  it('does NOT set the error attribute when error is empty', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Title"
        link-href="/home"
        link-text="Go Home">
      </va-card-status>
    `);
    await page.waitForChanges();

    const el = await page.find('va-card-status');
    expect(el.getAttribute('error')).toBe(null);
  });

  it('renders a link when linkHref and linkText are provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Title"
        link-href="/home"
        link-text="Go Home">
      </va-card-status>
    `);
    await page.waitForChanges();

    const vaLink = await page.find('va-card-status >>> va-link-action');
    expect(vaLink).not.toBeNull();
  });

  it('exposes and renders slotted content in the default slot', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Hello"
        link-href="/test"
        link-text="Next">
        <p id="my-content">Inside Body</p>
      </va-card-status>
    `);
    await page.waitForChanges();

    const content = await page.find('va-card-status >>> slot');
    expect(content).not.toBeNull();
  });

  it('announces error with an aria-live region via role="alert"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
      header-text="Title"
      error="Danger!"
      link-href="/test"
      link-text="Next">
      </va-card-status>
    `);
    await page.waitForChanges();

    const alert = await page.find(
      'va-card-status >>> #card-status-error-message[role="alert"]',
    );
    expect(alert).not.toBeNull();

    const message = await page.find(
      'va-card-status >>> #card-status-error-message .usa-error-message',
    );
    expect(message.textContent).toBe('Danger!');
  });

  it('sets aria-describedby on <va-link-action> when errorMessage is present', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status
        header-text="Title"
        error="Missing info"
        link-href="/test"
        link-text="Next">
      </va-card-status>
    `);
    await page.waitForChanges();

    const vaLink = await page.find(
      'va-card-status >>> va-link-action >>> #link-description',
    );
    expect(vaLink.innerText).toBe('Error: Missing info');
  });

  it('does not render the component if required props are not passed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-card-status></va-card-status>
    `);
    await page.waitForChanges();

    const cardStatus = await page.find('va-card-status >>> .va-card-status__wrapper');
    expect(cardStatus).toBeNull();
  });
});
