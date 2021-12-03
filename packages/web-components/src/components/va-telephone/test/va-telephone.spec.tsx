import { VaTelephone } from '../va-telephone';

describe('formatPhoneNumber', () => {
  const contact = '8885551234';
  const N11 = '911';
  const extension = 123;
  it('formats a contact number with no extension', () => {
    expect(VaTelephone.formatPhoneNumber(contact, null)).toBe('888-555-1234');
  });

  it('formats a contact number with extension', () => {
    expect(VaTelephone.formatPhoneNumber(contact, extension)).toBe(
      '888-555-1234, ext. 123',
    );
  });

  it('formats a 3 digit contact number', () => {
    expect(VaTelephone.formatPhoneNumber(N11, null)).toBe('911');
  });

  it('does not use extension for 3 digit contact', () => {
    expect(VaTelephone.formatPhoneNumber(N11, extension)).toBe('911');
  });

  it('does not use international formatting for 3 digit contact', () => {
    expect(VaTelephone.formatPhoneNumber(N11, extension, true)).toBe('911');
  });
});

describe('formatTelLabel', () => {
  const contact = '8885551234';
  const extension = 123;
  const formattedNumber = VaTelephone.formatPhoneNumber(contact, null);
  const formattedNumberWithExt = VaTelephone.formatPhoneNumber(
    contact,
    extension,
  );
  it('formats a phone number into an assistive tech label', () => {
    expect(VaTelephone.formatTelLabel(formattedNumber)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4',
    );
  });

  it('formats a phone number with extension into an assistive tech label', () => {
    expect(VaTelephone.formatTelLabel(formattedNumberWithExt)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4. extension. 1 2 3',
    );
  });
});

describe('createHref', () => {
  const contact = '8885551234';
  const n11 = '911';
  const extension = 123;
  it('creates a tel link for a phone number', () => {
    expect(VaTelephone.createHref(contact, null)).toBe('tel:+18885551234');
  });
  it('creates a tel link for a phone number with extension', () => {
    expect(VaTelephone.createHref(contact, extension)).toBe(
      'tel:+18885551234,123',
    );
  });
  it('creates a tel link for an N11 number', () => {
    expect(VaTelephone.createHref(n11, null)).toBe('tel:911');
  });
});
