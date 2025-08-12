import { VaTelephoneInput } from '../va-telephone-input';

describe('VaTelephoneInput', () => {
  let instance: VaTelephoneInput;
  beforeEach(() => {
    instance = new VaTelephoneInput();
    instance.error = '';
    instance.country = 'US';
    instance.contact = '';
    instance.touched = false;
    instance.showInternalErrors = true;
  });

  it('resetErrors resets error states', () => {
    instance.countryError = 'err';
    instance.contactError = 'err';
    instance.visibleError = 'err';
    instance.error = 'main';
    instance.resetErrors();
    expect(instance.countryError).toBe('');
    expect(instance.contactError).toBe('');
    expect(instance.visibleError).toBe('main');
  });

  it('setValidityState sets isValid and formattedContact', () => {
    instance.country = 'US';
    instance.contact = '2025550123';
    instance.setValidityState();
    expect(typeof instance.isValid).toBe('boolean');
    expect(typeof instance.formattedContact).toBe('string');
  });

  it('getPhoneNumberLengthString returns correct formats', () => {
    expect(instance.getPhoneNumberLengthString([])).toBe('');
    expect(instance.getPhoneNumberLengthString([7])).toBe('7');
    expect(instance.getPhoneNumberLengthString([7,8,9,10])).toBe('7 to 10');
    expect(instance.getPhoneNumberLengthString([7,9,10])).toBe('7, 9 or 10');
    expect(instance.getPhoneNumberLengthString([7,8])).toBe('7 to 8');
    expect(instance.getPhoneNumberLengthString([7,10])).toBe('7 or 10');
  });

  it('getValidPhoneNumberLengths returns a string', () => {
    expect(typeof instance.getValidPhoneNumberLengths()).toBe('string');
  });

  it('getErrorMessageForCountry returns a string', () => {
    expect(typeof instance.getErrorMessageForCountry()).toBe('string');
  });

  it('validateCountry sets error if no country', () => {
    instance.country = null;
    instance.touched = false;
    instance.showInternalErrors = true;
    instance.validateCountry();
    expect(instance.isValid).toBe(false);
    expect(instance.visibleError).toBe(instance.COUNTRY_ERROR);
    expect(instance.countryError).toBe(instance.COUNTRY_ERROR);
    expect(instance.touched).toBe(true);
  });

  it('countryChange updates country and triggers validation', () => {
    const spy = jest.spyOn(instance, 'validateContact');
    instance.countryChange({ detail: { value: 'CA' } } as any);
    expect(instance.country).toBe('CA');
    expect(spy).toHaveBeenCalled();
  });

  it('formatContact returns formatted or original value', () => {
    expect(instance.formatContact('2025550123')).not.toBe('2025550123');
    expect(instance.formatContact('abc')).toBe('abc');
  });

  it('buildCountryList returns array with US first', () => {
    const list = instance.buildCountryList();
    expect(Array.isArray(list)).toBe(true);
    expect(list[0]).toBe('US');
  });

  it('getCountryName returns a string', () => {
    expect(typeof instance.getCountryName('US')).toBe('string');
  });

  it('validateContact sets errors for invalid contact', () => {
    instance.country = 'US';
    instance.contact = 'abc';
    instance.touched = true;
    instance.showInternalErrors = true;
    instance.validateContact();
    expect(instance.visibleError).toContain('Enter a valid');
    expect(instance.contactError).toContain('Enter a valid');
  });

  it('handleEmit emits vaContact event', () => {
    const spy = jest.spyOn(instance.vaContact, 'emit');
    instance.country = 'US';
    instance.contact = '2025550123';
    instance.isValid = true;
    instance.touched = true;
    instance.handleEmit();
    expect(spy).toHaveBeenCalled();
  });
});