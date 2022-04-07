function normalizeNames(data, componentName) {
  return Object.keys(data[componentName]).reduce(
    // currentName will be both the application names and `date`, `total`, and `component_name`
    (carry, currentName) => ({
      [currentName
        // To absorb subtle name changes over time, standardize on lowercase
        // and _ for non-alphanumeric characters
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        // Prefix non-alphabetic headings with _ because that's what the
        // table in BigQuery will need to be
        .replace(/^([^a-z])/, '_$1')]: data[componentName][currentName],
      ...carry,
    }),
    {}
  );
}

/**
 * Takes an object keyed by component name and returns an array containing all
 * the data for each component.
 */
function flattenData(data, date) {
  const flattened = Object.keys(data).map(componentName => {
    return {
      date: date,
      component_name: componentName,
      ...normalizeNames(data, componentName),
    };
  });

  return flattened;
}

module.exports = flattenData;
