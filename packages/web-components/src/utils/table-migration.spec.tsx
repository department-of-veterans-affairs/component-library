/** @jsx React.createElement */
import React from 'react';
import { generateTableChildren } from './table-migration';

describe('generateTableChildren', () => {
  const fields = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Role', value: 'role' },
  ];
  const data = [
    { id: 1, name: 'Michael', role: 'Management' },
    { id: 10, name: 'Toby', role: 'HR' },
    { id: 25, name: 'Jim', role: 'Sales' },
  ];

  it('generates <va-table-row> React children>', () => {
    const children = generateTableChildren(data, fields);

    expect(children[0]).toEqual(
      // @ts-ignore
      <va-table-row slot="headers">
        <span>ID</span>
        <span>Name</span>
        <span>Role</span>
        {/* @ts-ignore */}
      </va-table-row>,
    );

    expect(children[1]).toMatchSnapshot();
    expect(children[2]).toMatchSnapshot();
    expect(children[3]).toMatchSnapshot();
  });
});
