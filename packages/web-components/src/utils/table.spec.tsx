/** @jsx React.createElement */
import React from 'react';
import { generateTableChildren } from './table';

describe('generateTableChildren', () => {
  const fields = [{ label: 'ID' }, { label: 'Name' }, { label: 'Role' }];
  const data = [
    [1, 'Michael', 'Management'],
    [10, 'Toby', 'HR'],
    [25, 'Jim', 'Sales'],
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
