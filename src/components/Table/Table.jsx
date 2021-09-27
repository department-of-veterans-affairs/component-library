import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const borderClasses =
  'vads-u-border-top--0 vads-u-border-right--0 vads-u-border-left--0 vads-u-font-family--sans vads-u-padding--0 vads-u-padding-y--0p5 medium-screen:vads-u-padding--2';
const rowPaddingClass = 'vads-u-padding-y--2';

const cellProps = (
  { alignLeft, alignRight, label },
  index,
  rowIndex,
  scope = null,
) => {
  return {
    'data-index': index,
    className: classNames(borderClasses, {
      'vads-u-text-align--left': alignLeft,
      'medium-screen:vads-u-text-align--right': alignRight,
    }),
    'data-label': label,
    key: `${rowIndex}-${label}`,
    role: 'cell',
    scope: scope,
  };
};

function Table(props) {
  const { currentSort, fields, data, ariaLabelledBy } = props;
  const [sortDirection, setSortDirection] = useState(currentSort?.order);
  let rowData;

  useEffect(() => {
    rowData = sortData();
  });

  const sortData = () => {
    if (sortDirection === 'ASC') {
      return data.sort((a, b) => {
        return a[currentSort.value] > b[currentSort.value] ? 1 : -1;
      });
    } else if (sortDirection === 'DESC') {
      return data.sort((a, b) => {
        return a[currentSort.value] < b[currentSort.value] ? 1 : -1;
      });
    }
  };

  rowData = sortDirection ? sortData() : data;

  return (
    <table aria-labelledby={ariaLabelledBy} className="responsive" role="table">
      <thead>
        <tr role="row">
          {fields.map(field =>
            field.sortable && field.value == currentSort?.value ? (
              <th key={field.value} role="columnheader" scope="col">
                <button
                  className="va-button-link vads-u-font-weight--bold vads-u-color--base vads-u-text-decoration--none sort"
                  onClick={() =>
                    setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC')
                  }
                  aria-label={`sort data by ${
                    sortDirection === 'ASC' ? 'descending' : 'ascending'
                  }`}
                >
                  {field.label}
                  {currentSort?.value === field.value && (
                    <svg
                      className="usa-icon sort"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {sortDirection === 'ASC' ? (
                        <g className="ascending" aria-label="ascending">
                          <path
                            transform="rotate(180, 12, 12)"
                            d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"
                          ></path>
                        </g>
                      ) : (
                        <g className="descending" aria-label="descending">
                          <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
                        </g>
                      )}
                    </svg>
                  )}
                </button>
              </th>
            ) : (
              <th key={field.value}>{field.label}</th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {rowData.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${borderClasses} ${rowPaddingClass}`}
            role="row"
          >
            {fields.map((field, index) =>
              index === 0 ? (
                <th {...cellProps(field, index, rowIndex, 'row')}>
                  {item[field.value] === null ? '---' : item[field.value]}
                </th>
              ) : (
                <td {...cellProps(field, index, rowIndex)}>
                  {item[field.value] === null ? '---' : item[field.value]}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  /**
   * Sets the `aria-labelledby` attribute on the `<table>` element
   */
  ariaLabelledBy: PropTypes.string,
  /**
   * The data for the table, where each item in the array represents a row, and
   * the property names in each object correspond to the columns
   */
  data: PropTypes.arrayOf(PropTypes.object),
  /**
   * An array of objects representing columns. The `label` is what is displayed, and
   * the `value` is what is used to match data to the correct column. The type is
   * the data type for the column. Available types are -
   * - String
   * - Number
   * Optional: If the field is sortable, set `sortable` to `true`.
   */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      sortable: PropTypes.boolean,
      alignLeft: PropTypes.boolean,
      alignRight: PropTypes.boolean,
    }),
  ),
  /**
   * Optional. A way to change the sorted order of data in a specified column.
   * 'order' should be set to ASC for ascending or DESC for descending.
   */
  currentSort: PropTypes.shape({
    value: PropTypes.string,
    order: PropTypes.string,
  }),
};
export default Table;
