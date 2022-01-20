import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Pagination from './Pagination';
import { axeCheck } from '../../helpers/test-helpers';

const props = {
  onPageSelect: () => {},
};

describe('<Pagination>', () => {
  it('should show all pages if there are fewer pages than the max', () => {
    const tree = shallow(
      <Pagination
        {...props}
        page={1}
        pages={5}
        ariaLabelSuffix="of search results"
      />,
    );
    const links = tree.find('a[aria-label*="of search results"]');
    expect(links).to.have.length(6);
    links.forEach((link, index) => {
      if (index === 5) {
        expect(link.text()).to.equal('Next');
      } else {
        const pageNumber = (index + 1).toString();
        expect(link.text()).to.equal(pageNumber);
      }
    });
    tree.unmount();
  });

  it('should show both "Prev" and "Next" if in a middle page', () => {
    const tree = shallow(<Pagination {...props} page={3} pages={5} />);
    const links = tree.find('a');
    expect(links).to.have.length(7);
    links.forEach((link, index) => {
      if (index === 0) {
        expect(link.text()).to.equal('Prev');
      } else if (index === 6) {
        expect(link.text()).to.equal('Next');
      } else {
        const pageNumber = index.toString();
        expect(link.text()).to.equal(pageNumber);
      }
    });
    tree.unmount();
  });

  it('should show "Prev" but not "Next" if on the last page', () => {
    const tree = shallow(<Pagination {...props} page={5} pages={5} />);
    const links = tree.find('a');
    expect(links).to.have.length(6);
    links.forEach((link, index) => {
      if (index === 0) {
        expect(link.text()).to.equal('Prev');
      } else if (index === 6) {
        expect(link.text()).to.equal('Next');
      } else {
        const pageNumber = index.toString();
        expect(link.text()).to.equal(pageNumber);
      }
    });
    tree.unmount();
  });

  it('should show the correct range of pages if the max is exceeded', () => {
    const tree = shallow(<Pagination {...props} page={5} pages={20} />);
    const links = tree.find('a');
    expect(links).to.have.length(12);
    links.forEach((link, index) => {
      if (index === 0) {
        expect(link.text()).to.equal('Prev');
      } else if (index === 11) {
        expect(link.text()).to.equal('Next');
      } else {
        const pageNumber = (index + 4).toString();
        expect(link.text()).to.equal(pageNumber);
      }
    });
    tree.unmount();
  });

  it('show the last page if enabled and there are more pages than max', () => {
    const tree = shallow(
      <Pagination
        {...props}
        page={3}
        pages={15}
        maxPageListLength={10}
        showLastPage
      />,
    );
    const links = tree.find('a');
    expect(links).to.have.length(12);
    links.forEach((link, index) => {
      if (index === 0) {
        expect(link.text()).to.equal('Prev');
      } else if (index === 9) {
        expect(link.text()).to.equal('...');
      } else if (index === 10) {
        expect(link.text()).to.equal('15');
      } else if (index === 11) {
        expect(link.text()).to.equal('Next');
      } else {
        const pageNumber = (index + 2).toString();
        expect(link.text()).to.equal(pageNumber);
      }
    });
    tree.unmount();
  });

  it('should show a continuous list when within range of the last page', () => {
    const tree = shallow(
      <Pagination
        {...props}
        page={6}
        pages={15}
        maxPageListLength={10}
        showLastPage
      />,
    );
    const links = tree.find('a');
    expect(links).to.have.length(12);
    links.forEach((link, index) => {
      if (index === 0) {
        expect(link.text()).to.equal('Prev');
      } else if (index === 10) {
        expect(link.text()).to.equal('15');
      } else if (index === 11) {
        expect(link.text()).to.equal('Next');
      } else {
        const pageNumber = (index + 5).toString();
        expect(link.text()).to.equal(pageNumber);
      }
    });
    tree.unmount();
  });

  it('should set aria-current to true on the correct link', () => {
    const currentPage = 6;
    const tree = shallow(
      <Pagination
        {...props}
        page={currentPage}
        pages={15}
        maxPageListLength={10}
        showLastPage
      />,
    );
    const links = tree.find('a');
    links.forEach(link => {
      if (link.text() === currentPage.toString()) {
        expect(link.prop('aria-current')).to.equal('true');
      } else if (link.text() === 'Prev' || link.text() === 'Next') {
        expect(link.prop('aria-current')).to.be.undefined;
      } else {
        expect(link.prop('aria-current')).to.be.null;
      }
    });

    tree.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(<Pagination {...props} page={3} pages={5} />));
});
