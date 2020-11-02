import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Table from './Table.jsx';
import { axeCheck } from '../../helpers/test-helpers';
import { payments, fields } from './test-data';

describe('<Table />', () => {
  it('Should Render', () => {
    const wrapper = shallow(
      <Table
        fields={fields}
        data={payments.payments}
        currentSort={{
          value: 'Date',
          order: 'ASC',
        }}
      />,
    );

    expect(wrapper.exists('.responsive')).to.equal(true);
    wrapper.unmount();
  });

  it('should render the table header', () => {
    const wrapper = shallow(
      <Table
        fields={fields}
        data={payments.payments}
        currentSort={{
          value: 'Date',
          order: 'ASC',
        }}
      />,
    );

    expect(wrapper.find('thead')).to.have.lengthOf(1);
    expect(wrapper.find('th')).to.have.lengthOf(6); // Once for each field
    wrapper.unmount();
  });

  it('should render all of the rows', () => {
    const wrapper = shallow(
      <Table
        fields={fields}
        data={payments.payments}
        currentSort={{
          value: 'Date',
          order: 'ASC',
        }}
      />,
    );

    expect(wrapper.find('tr')).to.have.lengthOf(10); // includes header row
    wrapper.unmount();
  });

  it('should pass a basic aXe check', () =>
    axeCheck(
      <Table
        fields={fields}
        data={payments.payments}
        currentSort={{
          value: 'Date',
          order: 'ASC',
        }}
      />,
    ));
});
