/** @jsx React.createElement */
import React from 'react';

/**
 * This is based off of the React `<Table>` implementation where fields
 * was an array of objects w/ `label`, `value`, and a few other properties.
 * `label` is used for display, and value is used to match object properties
 * for each row.
 */
interface FieldType {
  label: string;
  value: string;
}

/**
 * Useful for generating child content for a `<va-table>`
 *
 * @param {array} data - An array of arrays, where the inner arrays represent row data
 * @param {array} fields - The field/column names
 */
export function generateTableChildren(data: any[], fields: FieldType[]): any[] {
  return [
    /** @ts-ignore */
    <va-table-row slot="headers">
      {fields.map(col => (
        <span>{col.label}</span>
      ))}
      {/** @ts-ignore */}
    </va-table-row>,

    ...data.map(row => {
      return (
        /** @ts-ignore */
        <va-table-row>
          {fields.map(field => (
            <span>{row[field.value]}</span>
          ))}
          {/** @ts-ignore */}
        </va-table-row>
      );
    }),
  ];
}
