const TABLE_NAME =
  '`vsp-analytics-and-insights.platform_design_system.component-usage-count`';

function getHeaders(data) {
  const headers = new Set();
  data.forEach(usageData =>
    // Technically appName also includes date, component_name, and total, but :shrug:
    Object.keys(usageData).forEach(appName => headers.add(appName))
  );
  return Array.from(headers);
}

/**
 * Return a list of values for the `rowData` suitable for the SQL INSERT INTO
 * statement.
 *
 * NOTE: This is for a single row. Map over all the rows in the data set to
 * insert multiple rows in a single query.
 */
function sqlValue(rowData, headers) {
  const valueList = headers.map(h =>
    rowData[h] ? JSON.stringify(rowData[h]) : 0
  );
  return `(${valueList.join(', ')})`;
}

/**
 * Return an array of key/value pairs with an = between them.
 * Will wrap values in quotes where appropriate.
 *
 * @param {Object} data - An object with keys as column names
 **/
function columnValuePairs(data) {
  return Object.entries(data).map(([col, value]) =>
    `${col} = ${JSON.stringify(value)}`
  )
}

/**
 * Return a SQL UPDATE query for each component in the data.
 * This is meant to be used for updating existing data with
 * correct usage counts
 *
 * @param {Object[]} data - An array of items containing the flattened usage data
 **/
function update(data) {
  return data.map(cmpData => {
    const { date, component_name, ...uses } = cmpData
    const values = columnValuePairs(uses).join(', ')
    const conditions = columnValuePairs({ component_name, date }).join(' AND ')
    return `UPDATE ${TABLE_NAME} SET ${values} WHERE ${conditions};`
  }).join('\n\n')
}

/**
 * Return a SQL INSERT INTO query for adding the latest component usage data
 * into the component-usage-count table.
 *
 * @param {Object[]} data - An array of items containing the usage data
 * @return {String} - The SQL query to insert the data into the table
 */
function insert(data) {
  const headers = getHeaders(data);
  const values = data.map(usageData => sqlValue(usageData, headers)).join(', ');
  return `INSERT INTO ${TABLE_NAME} (${headers.join(', ')}) VALUES ${values}`;
}

module.exports = {
  insert,
  update
};
