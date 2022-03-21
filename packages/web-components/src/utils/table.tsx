/** @jsx React.createElement */
// import { h } from '@stencil/core';
import React from 'react';
// import { JSX } from '../components';
export function generateTableChildren(data: any[], field: Object[]): any[] {
  console.log(field);
  return [
    /** @ts-ignore */
    <va-table-row slot="headers">
      {field.map(col => (
        <span>{col}</span>
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
