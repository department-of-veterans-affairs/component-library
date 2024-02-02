/**
 * Search through vets-website and content-build for instance of DST components, tally them up, and write the results to separate CSV files, one for each type of component (React, V1, V3)
 */

/**
 * @typedef {{componentName: string, total: number}} componentTotal
 * @typedef {{breakoutType: string, components: componentTotal[]}[]} compData
 */

/** @returns {compData} */
function getComponentCounts() {
  const returnValue = [
    { breakoutType: 'react', components: [] },
    { breakoutType: 'v1', components: [] },
    { breakoutType: 'v3', components: [] },
  ];
  return returnValue;
}

/** @param {compData} data */
function writeCountsToCSVs(data) {
  data.forEach(({ breakoutType, components }) => {
    // write stuff out for each breakoutType
  });
}

if (require.main === module) {
  const data = getComponentCounts();
  writeCountsToCSVs(data);
}
