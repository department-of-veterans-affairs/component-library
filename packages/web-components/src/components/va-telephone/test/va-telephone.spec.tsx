import { VaTelephone } from '../va-telephone';

describe('formatPhoneNumber', () => {
  const contact = '8885551234';
  const countryCode = '63';
  const intlContact = '(02) 8555 8888';
  const N11 = '911';
  const extension = '123';
  const vanity = 'ABCD';
  it('formats a contact number with no extension', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact,
      }),
    ).toBe('888-555-1234');
  });

  it('formats a contact number with extension', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact,
        extension,
      }),
    ).toBe('888-555-1234, ext. 123');
  });

  it('formats a 3 digit contact number', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact: N11,
      }),
    ).toBe('911');
  });

  it('does not use extension for 3 digit contact', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact: N11,
        extension,
      }),
    ).toBe('911');
  });

  it('does not use international formatting for 3 digit contact', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact: N11,
        extension,
        international: true,
      }),
    ).toBe('911');
  });

  it('formats a contact number with vanity prop', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact,
        vanity,
      }),
    ).toBe('888-555-ABCD (1234)');
  });

  it('formats a TTY number', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact: N11,
        tty: true,
      }),
    ).toBe('TTY: 911');
  });

  it('formats a contact number with a country code', () => {
    expect(
      VaTelephone.formatPhoneNumber({
        contact: intlContact,
        countryCode: '63',
      }),
    ).toBe('+63 (02) 8555 8888');
  });
});

describe('createHref', () => {
  const contact = '8885551234';
  const countryCode = '63';
  const intlContact = '(02) 8555 8888';
  const contactSms = '123456';
  const n11 = '911';
  const extension = '123';

  it('creates a tel link for a phone number', () => {
    expect(
      VaTelephone.createHref({
        contact,
      }),
    ).toBe('tel:+18885551234');
  });

  it('creates a tel link for a phone number with extension', () => {
    expect(
      VaTelephone.createHref({
        contact,
        extension,
      }),
    ).toBe('tel:+18885551234,123');
  });

  it('creates a tel link for a phone number with a country code', () => {
    expect(
      VaTelephone.createHref({
        contact: intlContact,
        countryCode,
      }),
    ).toBe('tel:+630285558888');
  });

  it('creates a tel link for an N11 number', () => {
    expect(
      VaTelephone.createHref({
        contact: n11,
      }),
    ).toBe('tel:911');
  });

  it('creates an sms link for an SMS number', () => {
    expect(
      VaTelephone.createHref({
        contact: contactSms,
        sms: true,
      }),
    ).toBe('sms:123456');
  });
});