import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const borderClasses =
  'vads-u-border-top--0 vads-u-border-right--0 vads-u-border-left--0 vads-u-font-family--sans vads-u-padding--0 vads-u-padding-y--0p5 medium-screen:vads-u-padding--2';
const rowPaddingClass = 'vads-u-padding-y--2';

function Table(props) {
  const { currentSort, fields, data, ariaLabelledBy } = props;

  return (
    <table aria-labelledby={ariaLabelledBy} className="responsive" role="table">
      <thead>
        <tr role="row">
          {fields.map((field) =>
            field.nonSortable ? (
              <th key={field.value}>{field.label}</th>
            ) : (
              <th
                key={field.value}
                className={borderClasses}
                role="columnheader"
                scope="col"
              >
                <button className="va-button-link vads-u-font-weight--bold vads-u-color--base vads-u-text-decoration--none">
                  {field.label}
                  {currentSort?.value === field.value && (
                    <i
                      className={classNames({
                        fa: true,
                        'fas fa-caret-down': currentSort.order === 'DESC',
                        'fas fa-caret-up': currentSort.order === 'ASC',
                      })}
                    />
                  )}
                </button>
              </th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {data.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${borderClasses} ${rowPaddingClass}`}
            role="row"
          >
            {fields.map((field, index) => (
              <td
                data-index={index}
                className={classNames(borderClasses, {
                  'vads-u-text-align--left': field.alignLeft,
                })}
                data-label={field.label}
                key={`${rowIndex}-${field.label}`}
                role="cell"
              >
                {item[field.value] === null ? '---' : item[field.value]}
              </td>
            ))}
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
   * the `value` is what is used to match data to the correct column.
   */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      nonSortable: PropTypes.boolean,
      alignLeft: PropTypes.boolean,
    }),
  ),
  /**
   * A way to change the sorted order of the data. Currently unused.
   */
  currentSort: PropTypes.shape({
    value: PropTypes.string,
    order: PropTypes.string,
  }),
};
export default Table;
