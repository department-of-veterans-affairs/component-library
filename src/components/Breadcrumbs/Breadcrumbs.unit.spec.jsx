import React from 'react';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import { expect } from 'chai';

import Breadcrumbs from './Breadcrumbs.jsx';

const crumbs = [
  <a href="/" key="1">
    Link 1
  </a>,
  <a href="/test1" key="2">
    Link 2
  </a>,
  <a href="/test2" key="3">
    Link 3
  </a>
];

const routerCrumbs = [
  <Link to="/" key="1">
    Link 1
  </Link>,
  <Link to="/test1" key="2">
    Link 2
  </Link>,
  <Link to="/test2" key="3">
    Link 3
  </Link>
];

describe('<Breadcrumbs>', () => {
  it('should render', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    expect(tree).to.exist;
  });

  it('should render custom props', () => {
    const tree = shallow(
      <Breadcrumbs
        ariaLabel="Breadcrumb foo"
        customClasses="foo test"
        id="foo"
        listId="foo-list">
        {crumbs}
      </Breadcrumbs>
    );

    const navElem = tree.find('nav');
    const listElem = tree.find('ul');

    expect(navElem.props()['aria-label']).to.equal('Breadcrumb foo');
    expect(navElem.props().className).to.include('va-nav-breadcrumbs');
    expect(navElem.props().className).to.include('foo test');
    expect(navElem.props().id).to.equal('foo');
    expect(listElem.props().id).to.equal('foo-list');
  });

  it('should render exactly one nav', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const navElem = tree.find('nav');

    expect(navElem.length).to.equal(1);
  });

  it('should render correct nav props', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const navElem = tree.find('nav');

    expect(navElem.props().className).to.equal('va-nav-breadcrumbs');
    expect(navElem.props()['aria-label']).to.equal('Breadcrumb');
    expect(navElem.props()['aria-live']).to.equal('polite');
  });

  it('should render exactly one unordered list', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const listElem = tree.find('ul');

    expect(listElem.length).to.equal(1);
  });

  it('should render correct unordered list props', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const listElem = tree.find('ul');

    expect(listElem.props().className).to.equal(
      'row va-nav-breadcrumbs-list columns'
    );
  });

  it('should render exactly three list items', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const listItemElem = tree.find('li');

    expect(listItemElem).to.have.length(3);
  });

  it('should render exactly three link elements', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const linkElem = tree.find('a');

    expect(linkElem).to.have.length(3);
  });

  it('should have the correct text labels', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    tree.find('a').forEach((node, i) => {
      expect(node.text()).to.equal(`Link ${i + 1}`);
    });
  });

  it('should render the correct link props', () => {
    const tree = shallow(<Breadcrumbs>{crumbs}</Breadcrumbs>);

    const linkElem = tree.find('a');

    expect(linkElem.at(0).props()['aria-current']).to.be.undefined;
    expect(linkElem.at(1).props()['aria-current']).to.be.undefined;
    expect(linkElem.at(2).props()['aria-current']).to.equal('page');
  });

  it('should render individual children correctly', () => {
    const tree = shallow(
      <Breadcrumbs>
        <a
          href="/"
          onClick={() => {
            const result = {};
            return result;
          }}
          key="1">
          Link 1
        </a>
        <a href="/test1" key="2">
          Link 2
        </a>
        <a href="/test2" key="3">
          Link 3
        </a>
      </Breadcrumbs>
    );

    const linkElem = tree.find('a');
    const listItemElem = tree.find('li');

    linkElem.forEach((node, i) => {
      expect(node.text()).to.equal(`Link ${i + 1}`);
    });

    expect(listItemElem).to.exist;
    expect(listItemElem).to.have.length(3);

    expect(linkElem).to.exist;
    expect(linkElem.length).to.equal(3);

    expect(linkElem.at(0).props()['aria-current']).to.be.undefined;
    expect(linkElem.at(1).props()['aria-current']).to.be.undefined;
    expect(linkElem.at(2).props()['aria-current']).to.equal('page');
  });

  it('should render React Router 3 Links correctly', () => {
    const tree = mount(<Breadcrumbs>{routerCrumbs}</Breadcrumbs>);

    const linkElem = tree.find('a');

    linkElem.forEach((node, i) => {
      expect(node.text()).to.equal(`Link ${i + 1}`);
    });

    expect(linkElem).to.exist;
    expect(linkElem.length).to.equal(3);
  });

  it('should add mobile-only class when mobileFirstProp is true', () => {
    const tree = shallow(<Breadcrumbs mobileFirstProp>{crumbs}</Breadcrumbs>);

    const navElem = tree.find('nav');

    expect(navElem.props().className).to.equal(
      'va-nav-breadcrumbs va-nav-breadcrumbs--mobile'
    );
  });

  it('should pass aXe check when showing full breadcrumb', () => {
    return axeCheck(<Breadcrumbs>{crumbs}</Breadcrumbs>);
  });

  it('should pass aXe check when showing mobile breadcrumb', () => {
    return axeCheck(<Breadcrumbs mobileFirstProp>{crumbs}</Breadcrumbs>);
  });
});
