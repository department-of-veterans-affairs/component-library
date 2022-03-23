import { VaTelephone } from '../va-telephone';

describe('formatPhoneNumber', () => {
  const contact = '8885551234';
  const N11 = '911';
  const extension = 123;
  const vanity = 'ABCD';
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
});

describe('formatTelLabel', () => {
  const contact = '8885551234';
  const extension = 123;
  const vanity = 'ABCD';
  const formattedNumber = VaTelephone.formatPhoneNumber(contact, null, null, null);
  const formattedNumberWithExt = VaTelephone.formatPhoneNumber(
    contact,
    extension,
    null,
    null
  );
  const formattedNumberWithVanity = VaTelephone.formatPhoneNumber(contact, null, null, vanity);
  it('formats a phone number into an assistive tech label', () => {
    expect(VaTelephone.formatTelLabel(formattedNumber, null)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4',
    );
  });

  it('formats a phone number with extension into an assistive tech label', () => {
    expect(VaTelephone.formatTelLabel(formattedNumberWithExt, null)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4. extension. 1 2 3',
    );
  });

  it('formats a phone number into an assistive tech label with vanity', () => {
    expect(VaTelephone.formatTelLabel(formattedNumberWithVanity, vanity)).toBe(
      '8 8 8. 5 5 5. 1 2 3 4',
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
