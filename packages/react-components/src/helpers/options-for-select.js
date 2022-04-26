import i18next from 'i18next';

export const maritalStatuses = [
  'Married',
  'Never Married',
  'Separated',
  'Widowed',
  'Divorced',
];

export const branchesServed = [
  { value: 'air force', label: 'Air Force' },
  { value: 'army', label: 'Army' },
  { value: 'coast guard', label: 'Coast Guard' },
  { value: 'marine corps', label: 'Marine Corps' },
  { value: 'merchant seaman', label: 'Merchant Seaman' },
  { value: 'navy', label: 'Navy' },
  { value: 'noaa', label: 'Noaa' },
  { value: 'usphs', label: 'USPHS' },
  { value: 'f.commonwealth', label: 'Filipino Commonwealth Army' },
  { value: 'f.guerilla', label: 'Filipino Guerilla Forces' },
  { value: 'f.scouts new', label: 'Filipino New Scout' },
  { value: 'f.scouts old', label: 'Filipino Old Scout' },
  { value: 'other', label: 'Other' },
];

export const dischargeTypes = [
  { value: 'honorable', label: 'Honorable' },
  { value: 'general', label: 'General' },
  { value: 'other', label: 'Other Than Honorable' },
  { value: 'bad-conduct', label: 'Bad Conduct' },
  { value: 'dishonorable', label: 'Dishonorable' },
  { value: 'undesirable', label: 'Undesirable' },
];

export const suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV'];

export const genders = [
  { label: 'Female', value: 'F' },
  { label: 'Male', value: 'M' },
];

export const months = [
  { label: i18next.t('january'), value: 1 },
  { label: i18next.t('february'), value: 2 },
  { label: i18next.t('march'), value: 3 },
  { label: i18next.t('april'), value: 4 },
  { label: i18next.t('may'), value: 5 },
  { label: i18next.t('june'), value: 6 },
  { label: i18next.t('july'), value: 7 },
  { label: i18next.t('august'), value: 8 },
  { label: i18next.t('september'), value: 9 },
  { label: i18next.t('october'), value: 10 },
  { label: i18next.t('november'), value: 11 },
  { label: i18next.t('december'), value: 12 },
];

export const twentyNineDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
];
export const thirtyDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
];
export const thirtyOneDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];

export const days = {
  1: thirtyOneDays,
  2: twentyNineDays,
  3: thirtyOneDays,
  4: thirtyDays,
  5: thirtyOneDays,
  6: thirtyDays,
  7: thirtyOneDays,
  8: thirtyOneDays,
  9: thirtyDays,
  10: thirtyOneDays,
  11: thirtyDays,
  12: thirtyOneDays,
};

export const childRelationships = [
  'Daughter',
  'Son',
  'Stepson',
  'Stepdaughter',
];

export const yesNo = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];
