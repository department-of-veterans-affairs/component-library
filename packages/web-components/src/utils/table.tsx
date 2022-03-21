/** @jsx React.createElement */
// import { h } from '@stencil/core';
import React from 'react';
// import { JSX } from '../components';

/**
 * This is based off of the React `<Table>` implementation where fields
 * was an array of objects w/ `label`, `value`, and a few other properties.
 * For this we only care about `label`.
 */
interface FieldType {
  label: string;
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
          {row.map(cell => (
            <span>{cell}</span>
          ))}
          {/** @ts-ignore */}
        </va-table-row>
      );
    }),
  ];
}
