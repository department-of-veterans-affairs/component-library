import { CountryCode } from 'libphonenumber-js/min';
import { mapCountry } from "../utils";

describe('mapcountry()', () => {
  it('returns the correct country', () => {
    expect(mapCountry('US')).toBe('US');
    expect(mapCountry('PN' as CountryCode)).toBe('NZ');
    expect(mapCountry('FAKE' as CountryCode)).toBe(undefined);
  });
});
