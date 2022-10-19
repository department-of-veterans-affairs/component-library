import { VaTelephone } from '../va-telephone';

describe('formatPhoneNumber', () => {
  const contact = '8885551234';
  const N11 = '911';
  const extension = 123;
  const vanity = 'ABCD';
  const sms = '123456';
  it('formats a contact number with no extension', () => {
    expect(VaTelephone.formatPhoneNumber(contact, null, null, null)).toBe('888-555-1234');
  });

  it('formats a contact number with extension', () => {
    expect(VaTelephone.formatPhoneNumber(contact, extension, null, null)).toBe(
      '888-555-1234, ext. 123',
    );
  });

  it('formats a 3 digit contact number', () => {
    expect(VaTelephone.formatPhoneNumber(N11, null, null, null)).toBe('911');
  });

  it('does not use extension for 3 digit contact', () => {
    expect(VaTelephone.formatPhoneNumber(N11, extension, null, null)).toBe('911');
  });

  it('does not use international formatting for 3 digit contact', () => {
    expect(VaTelephone.formatPhoneNumber(N11, extension, true, null)).toBe('911');
  });

  it('formats a contact number with vanity prop', () => {
    expect(VaTelephone.formatPhoneNumber(contact, null, null, vanity)).toBe('888-555-ABCD (1234)');
  });

  it('formats a TTY number', () => {
    expect(VaTelephone.formatPhoneNumber(N11, null, null, null, true)).toBe('TTY: 911');
  });

  it('formats an SMS number', () => {
    expect(VaTelephone.formatPhoneNumber(sms, null, null, null, null, true)).toBe('Text: 123456');
  });
});

describe('formatTelLabel', () => {
  const contact = '8885551234';
  const extension = 123;
  const sms = '123456';
  it('formats a phone number into an assistive tech label', () => {
    expect(VaTelephone.formatTelLabel(contact, null, false, false, false)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4',
    );
  });

  it('formats a phone number with extension into an assistive tech label', () => {
    expect(VaTelephone.formatTelLabel(contact, extension, false, false, false)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4. extension. 1 2 3',
    );
  });

  it('formats a TTY phone number', () => {
    expect(VaTelephone.formatTelLabel(contact, null, true, false, false)).toBe(
      'TTY. 8 8 8. 5 5 5. 1 2 3 4',
    );
  });

  it('formats an international phone number', () => {
    expect(VaTelephone.formatTelLabel(contact, null, false, true, false)).toBe(
      '1. 8 8 8. 5 5 5. 1 2 3 4',
    );
  });

  it('formats an SMS phone number', () => {
    expect(VaTelephone.formatTelLabel(sms, null, false, false, true)).toBe(
      'Text. 1 2 3 4 5 6',
    );
  });

});

describe('createHref', () => {
  const contact = '8885551234';
  const n11 = '911';
  const extension = 123;
  const sms = '123456';
  it('creates a tel link for a phone number', () => {
    expect(VaTelephone.createHref(contact, null, false)).toBe('tel:+18885551234');
  });
  it('creates a sms link for an sms number', () => {
    expect(VaTelephone.createHref(sms, null, true)).toBe('sms:+123456');
  });
  it('creates a tel link for a phone number with extension', () => {
    expect(VaTelephone.createHref(contact, extension, false)).toBe(
      'tel:+18885551234,123',
    );
  });
  it('creates a tel link for an N11 number', () => {
    expect(VaTelephone.createHref(n11, null, false)).toBe('tel:911');
  });
});
