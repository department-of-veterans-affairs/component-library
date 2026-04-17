import { isSupportedCountry, CountryCode } from 'libphonenumber-js/min';

export const DATA_MAP = {
  // Intl.DisplayNames does not give us the name we want for these countries
  names: {
    'BQ': 'Bonaire, Sint Eustatius and Saba',
    'MF': 'Saint Martin (French part)',
    'PN': 'Pitcairn',
    'UM': 'United States Minor Outlying Islands',
    'FK': 'Falkland Islands (Malvinas)',
    'CG': 'Congo',
    'CD': 'Congo, Democratic Republic of the',
    'MM': 'Myanmar',
    'MD': 'Moldova, Republic of',
    'KP': 'Korea, Democratic People\'s Republic of',
    'SH': 'Saint Helena, Ascension and Tristan da Cunha',
    'RU': 'Russian Federation',
    'VC': 'Saint Vincent and the Grenadines',
    'SX': 'Sint Maarten (Dutch part)',
    'KR': 'Korea, Republic of',
    'SY': 'Syrian Arab Republic',
    'VI': 'Virgin Islands (U.S.)',
    'US': 'United States of America',
    'VA': 'Holy See',
    'VN': 'Viet Nam'
  },
  // these countries (the keys) don't have their own validation but are subsumed into another territory
  countries: {
    'GS': 'FK', //South Georgia and the South Sandwich Islands
    'AQ': 'NF', //Antarctica
    'BV': 'NO', //Bouvet Island
    'TF': 'RE', //French Southern Territories
    'HM': 'AU', //Heard Island and McDonald Islands,
    'UM': 'US', //United States Minor Outlying Islands
    'PN': 'NZ', //Pitcairn Island
  }
}

// get the right country validation
export function mapCountry(country: CountryCode) {
  if (isSupportedCountry(country)) {
    return country
  }
  if (country in DATA_MAP.countries) {
    return DATA_MAP.countries[country];
  } 
  console.error(`Not a valid country: ${country}`);
}
  
 /**
   * Returns the number of numeric characters that occur before an index position in a string taking into account that the string may contain more than numeric characters.
   * For example, in "(234) 5" with index 7, only digits 2, 3, 4, 5 are counted → returns 4.
   */
  export function countDigitsUpTo(value: string, index: number): number {
    return value.slice(0, index).replace(/\D/g, '').length;
  }

  /**
   * Given a digit count, returns the index in `str` where that many digits have been seen.
   * This maps a cursor position from one formatted string to another.
   */
  export function findPositionForDigitCount(str: string, digitCount: number): number {
    for (let i = 0; i < str.length; i++) {
      if (digitCount === countDigitsUpTo(str, i)) return i;
    }
    return str.length;
  }
