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
      VaTelephone.formatPhoneNumber(contact, null, null, null, null, null),
    ).toBe('888-555-1234');
  });

  it('formats a contact number with extension', () => {
    expect(
      VaTelephone.formatPhoneNumber(contact, extension, null, null, null, null),
    ).toBe('888-555-1234, ext. 123');
  });

  it('formats a 3 digit contact number', () => {
    expect(
      VaTelephone.formatPhoneNumber(N11, null, null, null, null, null),
    ).toBe('911');
  });

  it('does not use extension for 3 digit contact', () => {
    expect(
      VaTelephone.formatPhoneNumber(N11, extension, null, null, null),
    ).toBe('911');
  });

  it('does not use international formatting for 3 digit contact', () => {
    expect(
      VaTelephone.formatPhoneNumber(N11, extension, true, null, null, null),
    ).toBe('911');
  });

  it('formats a contact number with vanity prop', () => {
    expect(
      VaTelephone.formatPhoneNumber(contact, null, null, null, vanity),
    ).toBe('888-555-ABCD (1234)');
  });

  it('formats a TTY number', () => {
    expect(
      VaTelephone.formatPhoneNumber(N11, null, null, null, null, true),
    ).toBe('TTY: 911');
  });

  it('formats a contact number with a country code', () => {
    expect(
      VaTelephone.formatPhoneNumber(
        intlContact,
        null,
        null,
        countryCode,
        null,
        null,
      ),
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
    expect(VaTelephone.createHref(contact, null, null, null)).toBe(
      'tel:+18885551234',
    );
  });

  it('creates a tel link for a phone number with extension', () => {
    expect(VaTelephone.createHref(contact, extension, null, null)).toBe(
      'tel:+18885551234,123',
    );
  });

  it('creates a tel link for a phone number with a country code', () => {
    expect(VaTelephone.createHref(intlContact, null, null, countryCode)).toBe(
      'tel:+630285558888',
    );
  });

  it('creates a tel link for an N11 number', () => {
    expect(VaTelephone.createHref(n11, null, null, null)).toBe('tel:911');
  });

  it('creates an sms link for an SMS number', () => {
    expect(VaTelephone.createHref(contactSms, null, true, null)).toBe(
      'sms:123456',
    );
  });
});