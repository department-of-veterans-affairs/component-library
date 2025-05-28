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
    'HM': 'NF', //Heard Island and McDonald Islands,
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
  