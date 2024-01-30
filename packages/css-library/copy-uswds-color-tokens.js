const fs = require('fs');

// List of color tokens to "pass through"
const tokensToKeep = {
  'blue': {
    file: 'blue.json',
    colors: [
      'blue-5',
      'blue-10',
      'blue-20',
      'blue-30',
      'blue-40',
      'blue-50',
      'blue-60',
      'blue-70',
      'blue-80',
      'blue-90',
      'blue-vivid-50',
      'blue-vivid-60',
    ],
  },
  'blue-cool': {
    file: 'blue-cool.json',
    colors: [
      'blue-cool-60',
      'blue-cool-vivid-5',
      'blue-cool-vivid-20',
      'blue-cool-vivid-40',
      'blue-cool-vivid-60',
    ],
  },
  'blue-warm': {
    file: 'blue-warm.json',
    colors: [
      'blue-warm-10',
      'blue-warm-30',
      'blue-warm-50',
      'blue-warm-60',
      'blue-warm-vivid-60',
      'blue-warm-vivid-70',
      'blue-warm-vivid-80',
    ],
  },
  'cyan': {
    file: 'cyan.json',
    colors: ['cyan-5', 'cyan-20', 'cyan-vivid-30', 'cyan-vivid-40'],
  },
  'gold': {
    file: 'gold.json',
    colors: [
      'gold-vivid-5',
      'gold-vivid-10',
      'gold-vivid-20',
      'gold-vivid-30',
      'gold-vivid-50',
      'gold-50'
    ],
  },
  'gray': {
    file: 'gray.json',
    colors: [
      'gray-1',
      'gray-2',
      'gray-3',
      'gray-4',
      'gray-5',
      'gray-10',
      'gray-20',
      'gray-30',
      'gray-40',
      'gray-50',
      'gray-60',
      'gray-70',
      'gray-80',
      'gray-90',
      'gray-100',
    ],
  },
  'gray-cool': {
    file: 'gray-cool.json',
    colors: [
      'gray-cool-1',
      'gray-cool-2',
      'gray-cool-3',
      'gray-cool-4',
      'gray-cool-5',
      'gray-cool-10',
      'gray-cool-20',
      'gray-cool-30',
      'gray-cool-40',
      'gray-cool-50',
      'gray-cool-60',
      'gray-cool-70',
      'gray-cool-80',
      'gray-cool-90',
    ],
  },
  'gray-warm': {
    file: 'gray-warm.json',
    colors: ['gray-warm-10', 'gray-warm-70'],
  },
  'green-warm': {
    file: 'green-warm.json',
    colors: ['green-warm-50']
  },
  'green-cool': {
    file: 'green-cool.json',
    colors: [
      'green-cool-5',
      'green-cool-20',
      'green-cool-40',
      'green-cool-50',
      'green-cool-vivid-20',
      'green-cool-vivid-40',
      'green-cool-vivid-50',
      'green-cool-vivid-60',
      'green-cool-vivid-70',
    ],
  },
  'orange': {
    file: 'orange.json',
    colors: ['orange-40'],
  },
  'orange-warm': {
    file: 'orange-warm.json',
    colors: ['orange-warm-50']
  },
  'red': {
    file: 'red.json',
    colors: ['red-30', 'red-50', 'red-60', 'red-70', 'red-vivid-60', 'red-vivid-70'],
  },
  'red-cool': {
    file: 'red-cool.json',
    colors: [
      'red-cool-vivid-10',
      'red-cool-vivid-50',
      'red-cool-vivid-60',
      'red-cool-vivid-70',
    ],
  },
  'red-warm': {
    file: 'red-warm.json',
    colors: [
      'red-warm-10',
      'red-warm-80',
      'red-warm-vivid-30',
      'red-warm-vivid-50',
      'red-warm-vivid-60',
    ],
  },
  'violet': {
    file: 'violet.json',
    colors: ['violet-vivid-70'],
  },
  'yellow': {
    file: 'yellow.json',
    colors: ['yellow-5', 'yellow-vivid-10', 'yellow-vivid-20'],
  },
  'indigo-cool': {
    file: 'indigo-cool.json',
    colors: ['indigo-cool-60']
  },
  'mint-cool': {
    file: 'mint-cool.json',
    colors: ['mint-cool-50']
  }
};
// Desired prefix/namespace for colors
const prefix = 'uswds-system-color';

/**
 * @description Looks to see if the color (colorName) is in the list of tokens we want to keep
 * @param {Array<string>} tokenColorsToKeep
 * @param {string} colorName
 */
function colorsIncludes(tokenColorsToKeep, colorName) {
  // Using findIndex instead of includes so that we can add the prefix
  const matched = tokenColorsToKeep.findIndex(color => {
    return `${prefix}-${color}` === colorName;
  });
  return matched > -1;
}

/**
 * @description Takes a color's name and it's value, checks if value is array or string, iterates over all values until it knows if they're all keepers or not (recursive)
 * @param {string} colorName
 * @param {string | [{name: string; value: string}]} value
 * @param {string[]} tokenColorsToKeep
 */
function iterateValues(colorName, value, tokenColorsToKeep) {
  if (Array.isArray(value)) {
    // value is an array, iterate over the values
    const newPrefix = `${colorName}`;
    return value
      .flatMap(val => {
        return iterateValues(
          `${newPrefix}-${val.name}`,
          val.value,
          tokenColorsToKeep,
        );
      })
      .filter(element => element !== undefined); // Filters out empty entries
  } else {
    // value is a singleton or false, keep if needed
    if (colorsIncludes(tokenColorsToKeep, colorName)) {
      return { name: colorName, value };
    }
  }
}

// Get desired tokens
const uswdsTokens = Object.entries(tokensToKeep)
  .flatMap(([_, tokenProps]) => {
    // Using 'require' allows us to read and parse JSON files in one command
    const tokens = require(`./node_modules/@uswds/uswds/packages/uswds-tokens/colors/${tokenProps.file}`);
    const keptTokens = tokens.props
      // First, find all of the keepers
      .reduce((accumulator, prop) => {
        const retVal = iterateValues(
          `${prefix}-${prop.name}`,
          prop.value,
          tokenProps.colors,
        );
        if (retVal) {
          accumulator.push(retVal);
        }
        return accumulator;
      }, [])
      .flat();
    return keptTokens;
  })
  // Second, convert the array of names and values into Style Dictionary's format
  .reduce((accumulator, prop) => {
    accumulator[prop.name] = { value: prop.value };
    return accumulator;
  }, {});

// Last, need to write out uswdsTokens into a tokens/uswds.json file
let data = JSON.stringify(uswdsTokens, null, 2);
fs.writeFileSync('./tokens/uswds.json', data);

console.log('USWDS Tokens copied successfully.');
