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

  it('should sort strings ASC', () => {
    const sortedValues = [
      'the cat jumped over the cow',
      'the cat jumped over the dog',
      'the cat jumped over the zebra',
      'the cow jumped over the car',
      'the cow jumped over the moon',
      'the cow jumped over the plane',
      'the dog jumped over the boat',
      'the moose jumped over the dog',
      'the moose jumped over the truck',
    ];
    const fieldsWithSort = [
      Object.assign(fields[0], { sortable: true }),
      fields[1],
      fields[2],
      fields[3],
    ];
    const currentSort = {
      value: 'string',
      order: 'ASC',
    };
    const wrapper = shallow(
      <Table fields={fieldsWithSort} data={data} currentSort={currentSort} />,
    );
    const bodyRows = wrapper.find('tbody').find('tr');
    let index = 0;

    bodyRows.forEach(row => {
      if (row.childAt(0).type() === 'th') return;

      expect(row.find('td')[0]).to.eql(sortedValues[index]);
      index += 1;
    });
  });

  // it('should sort strings DESC', () => {
  //   const sortedValues = [
  //     'the moose jumped over the truck',
  //     'the moose jumped over the dog',
  //     'the dog jumped over the boat',
  //     'the cow jumped over the plane',
  //     'the cow jumped over the moon',
  //     'the cow jumped over the car',
  //     'the cat jumped over the zebra',
  //     'the cat jumped over the dog',
  //     'the cat jumped over the cow',
  //   ];
  // });

  // it('should sort integers ASC', () => {
  //   const sortedValues = [
  //     '1',
  //     '10',
  //     '101',
  //     '102',
  //     '4',
  //     '5',
  //     '800',
  //     '801',
  //     '802',
  //   ];
  // });

  // it('should sort integers DESC', () => {
  //   const sortedValues = [
  //     '802',
  //     '801',
  //     '800',
  //     '5',
  //     '4',
  //     '102',
  //     '101',
  //     '10',
  //     '1',
  //   ];
  // });

  // it('should sort decimals ASC', () => {
  //   const sortedValues = [
  //     '.0009',
  //     '.0011',
  //     '.011',
  //     '.012',
  //     '.8193',
  //     '.82',
  //     '100.9999',
  //     '101.9812',
  //     '7.897',
  //   ];
  // });

  // it('should sort decimals DESC', () => {
  //   const sortedValues = [
  //     '7.897',
  //     '101.9812',
  //     '100.9999',
  //     '.82',
  //     '.8193',
  //     '.012',
  //     '.011',
  //     '.0011',
  //     '.0009',
  //   ];
  // });

  // it('should sort booleans ASC', () => {
  //   const sortedValues = [
  //     'false',
  //     'false',
  //     'false',
  //     'false',
  //     'true',
  //     'true',
  //     'true',
  //     'true',
  //     'true',
  //   ];
  // });

  // it('should sort booleans DESC', () => {
  //   const sortedValues = [
  //     'true',
  //     'true',
  //     'true',
  //     'true',
  //     'true',
  //     'false',
  //     'false',
  //     'false',
  //     'false',
  //   ];
  // });

  it('should pass a basic aXe check', () =>
    axeCheck(<Table fields={fields} data={data} />));
});
