/**
 * Map of patterns to descriptions. This is only intended for documentation
 * purposes. Use PATTERN.<key> to get the actual phone number.
 */
import React from 'react';

export const patternsMap = Object.freeze({
  threeDigit: {
    pattern: '3_DIGIT',
    description:
      'Used for 3-digit numbers (e.g. 711 & 911); automatically set for 3-digit numbers',
  },
  standard: {
    pattern: 'DEFAULT',
    description: (
      <>
        Standard telephone format. See the{' '}
        <a href="https://design.va.gov/content-style-guide/dates-and-numbers#phone-numbers">
          phone number design specification
        </a>
        .
      </>
    ),
  },
  nonUS: {
    pattern: 'OUTSIDE_US',
    description:
      'Pattern used for numbers where the Veteran is located outside the United States',
  },
});
