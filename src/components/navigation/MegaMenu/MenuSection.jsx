import React from 'react';
import PropTypes from 'prop-types';
import SubMenu from './SubMenu';
import _ from 'lodash';

const mobileMediaQuery = window.matchMedia('(max-width: 767px)');

class MenuSection extends React.Component {
  constructor() {
    super();

    this.state = {
      title: {},
    };
  }

  getCurrentSection() {
    return this.props.currentSection ? this.props.currentSection : this.props.defaultSection;
  }

  getId(title) {
    return `vetnav-${_.kebabCase(title)}-ms`;
  }

  updateCurrentSection() {
    if (mobileMediaQuery.matches) {
      this.setState({
        title: {
          hidden: true,
        },
      });
    }

    this.props.updateCurrentSection();
  }

  handleBackToMenu() {
    this.updateCurrentSection('');

    if (mobileMediaQuery.matches) {
      this.setState({
        title: {},
      });
    }
  }

  render() {
    const show = this.getCurrentSection(this.props) === this.props.title;

    return (
      <li className={`mm-link-container${this.state.title.hidden ? '-small' : ''}`} role="menuitem">
        <button
          {...this.state.title}
          id={this.getId(this.props.title)}
          className="vetnav-level2"
          aria-haspopup="true"
          aria-controls={show ? this.getId(this.props.title) : null}
          aria-expanded={show}
          onClick={() => this.updateCurrentSection()}>{this.props.title}</button>
        <SubMenu
          id={this.getId(this.props.title)}
          data={this.props.links}
          navTitle={this.props.title}
          show={show}
          handleBackToMenu={() => this.handleBackToMenu()}
          linkClicked={this.props.linkClicked}
          columnThreeLinkClicked={this.props.columnThreeLinkClicked}>
        </SubMenu>
      </li>
    );
  }
}

MenuSection.propTypes = {
  title: PropTypes.string.isRequired,
  updateCurrentSection: PropTypes.func.isRequired,
  links: PropTypes.shape({
    columnOne: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ),
    }),
    columnTwo: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ),
    }),
    columnThree: PropTypes.shape({
      img: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }),
      link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }),
      description: PropTypes.string.isRequired,
    }),
    seeAllLink: PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  }).isRequired,
  defaultSection: PropTypes.string.isRequired,
  linkClicked: PropTypes.func.isRequired,
  columnThreeLinkClicked: PropTypes.func.isRequired
};

export default MenuSection;
