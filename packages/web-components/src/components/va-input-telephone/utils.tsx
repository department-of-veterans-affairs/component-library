import { isSupportedCountry, CountryCode } from 'libphonenumber-js/min';

export const DATA_MAP = {
  names: {
    'BQ': 'Bonaire, Sint Eustatius and Saba',
    'MF': 'Saint Martin (French part)',
    'PN': 'Pitcairn',
    'UM': 'United States Minor Outlying Islands'
  },
  countries: {
    'GS': 'FK', //South Georgia and the South Sandwich Islands
    'AQ': 'NF', //Antarctica
    'BV': 'NO', //Bouvet Island
    'TF': 'RE', //French Southern Territories
    'HM': 'NF', //Heard Island and McDonald Islands,
    'UM': 'US', //United States Minor Outlying Islands
    'PN': 'NZ', //Pitcairn Island
  }
}

  // the territories in COUNTRY_MAP don't have their own country calling code
  // and are not supported in the validation library.
  // instead they map to calling codes from other countries
  export function mapCountry(country: CountryCode) {
    if (isSupportedCountry(country)) {
      return country
    }
    if (country in DATA_MAP.countries) {
      return DATA_MAP.countries[country];
    } else {
      console.error(`Not a valid country: ${country}`);
    }
  }
  