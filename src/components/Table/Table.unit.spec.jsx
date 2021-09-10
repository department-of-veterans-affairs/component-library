import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Table from './Table.jsx';
import { axeCheck } from '../../helpers/test-helpers';
import { data, fields } from './test-data';

describe('<Table />', () => {
  it('Should Render', () => {
    const wrapper = shallow(<Table fields={fields} data={data} />);
    expect(wrapper.exists('.responsive')).to.equal(true);

    wrapper.unmount();
  });

  it('should render the table header', () => {
    const wrapper = shallow(<Table fields={fields} data={data} />);
    expect(wrapper.find('thead')).to.have.lengthOf(1);
    expect(wrapper.find('th')).to.have.lengthOf(13);

    wrapper.unmount();
  });

  it('should render all of the rows with headers', () => {
    const wrapper = shallow(<Table fields={fields} data={data} />);
    expect(wrapper.find('tr')).to.have.lengthOf(10); // includes header row

    const bodyRows = wrapper.find('tbody').find('tr');
    expect(bodyRows).to.have.lengthOf(9);
    bodyRows.forEach(row => expect(row.childAt(0).type()).to.equal('th'));
    bodyRows.forEach(row =>
      expect(row.childAt(0).props()['scope']).to.eql('row'),
    );

    wrapper.unmount();
  });

  it('should pass a basic aXe check', () =>
    axeCheck(<Table fields={fields} data={data} />));
});
