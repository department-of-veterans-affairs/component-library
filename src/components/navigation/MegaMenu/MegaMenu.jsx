import PropTypes from 'prop-types';
import React from 'react';
import MenuSection from './MenuSection';
import SubMenu from './SubMenu';
import _ from 'lodash';

const mobileMediaQuery = window.matchMedia('(max-width: 767px)');

const defaultSection = (sections) => {
  if (mobileMediaQuery.matches) {
    return '';
  }

  return sections[0].title;
};

export default class MegaMenu extends React.Component {
  componentDidMount() {
    if (mobileMediaQuery.matches) {
      this.props.toggleDisplayHidden(true);
    }

    mobileMediaQuery.addListener(this.resetDefaultState);
    document.body.addEventListener('click', this.handleDocumentClick, false);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    mobileMediaQuery.removeListener(this.resetDefaultState);
    document.body.removeEventListener('click', this.handleDocumentClick, false);
  }

  getSubmenu(item, currentSection) {
    if (mobileMediaQuery.matches) {
      const menuSections = [
        item.menuSections.mainColumn,
        item.menuSections.columnOne,
        item.menuSections.columnTwo,
      ].reduce((acc, column) => {
        acc.push({
          title: column.title,
          links: {
            columnOne: {
              title: '',
              links: column.links,
            },
            columnTwo: {
              title: '',
              links: [],
            }
          }
        });

        return acc;
      }, []);

      return menuSections.map((section, i) => {
        return (
          <MenuSection
            key={`${section}-${i}`}
            title={section.title}
            defaultSection={defaultSection(item.menuSections)}
            currentSection={currentSection}
            updateCurrentSection={() => this.updateCurrentSection(section.title)}
            links={section.links}
            linkClicked={this.props.linkClicked}
            columnThreeLinkClicked={this.props.columnThreeLinkClicked}></MenuSection>
        );
      });
    }

    return (
      <SubMenu
        data={item.menuSections}
        navTitle={item.title}
        handleBackToMenu={() => this.toggleDropDown('')}
        show={this.props.currentDropdown !== ''}
        linkClicked={this.props.linkClicked}
        columnThreeLinkClicked={this.props.columnThreeLinkClicked}></SubMenu>
    );
  }
  handleDocumentClick = (event) => {
    if (this.props.currentDropdown && !this.menuRef.contains(event.target)) {
      this.props.toggleDropDown('');
    }

  }

  resetDefaultState = () => {
    if (mobileMediaQuery.matches) {
      this.props.toggleDisplayHidden(true);
    } else {
      this.props.toggleDisplayHidden(false);
    }
    this.props.updateCurrentSection('');
    this.props.toggleDropDown('');
  }

  toggleDropDown(title) {
    if (this.props.currentDropdown === title) {
      this.props.toggleDropDown('');
    } else {
      this.props.toggleDropDown(title);
    }
  }

  updateCurrentSection(title) {
    let sectionTitle = title;

    if (mobileMediaQuery.matches) {
      sectionTitle = this.props.currentSection === title ? '' : title;
    }

    this.props.updateCurrentSection(sectionTitle);
  }

  render() {
    const {
      currentDropdown,
      currentSection,
      data,
      display,
      linkClicked,
      columnThreeLinkClicked
    } = this.props;

    return (
      <div
        className="login-container"
        {...display}>
        <div className="row va-flex" ref={el => {this.menuRef = el;}}>
          <div id="vetnav" role="navigation">
            <ul id="vetnav-menu" role="menubar">
              <li><a href="/" className="vetnav-level1" role="menuitem">Home</a></li>
              {
                data.map((item, i) => {
                  return (
                    <li
                      key={`${_.kebabCase(item.title)}-${i}`}
                      className={`${item.className || ''} ${item.currentPage ? 'current-page' : ''}`}>
                      {
                        item.menuSections ? <button
                          aria-expanded={currentDropdown === item.title}
                          aria-controls={`vetnav-${_.kebabCase(item.title)}`}
                          aria-haspopup="true"
                          className="vetnav-level1"
                          onClick={() => this.toggleDropDown(item.title)}>{item.title}</button>
                          : <a href={item.href} onClick={linkClicked.bind(null, item)} className="vetnav-level1" target={item.target || null}>{item.title}</a>
                      }
                      <div id={`vetnav-${_.kebabCase(item.title)}`} className="vetnav-panel" role="none" hidden={currentDropdown !== item.title}>
                        {
                          item.title === currentDropdown && item.menuSections && <ul aria-label={item.title}>
                            {
                              item.menuSections.constructor.name === 'Array' ? item.menuSections.map((section, j) => {
                                return (
                                  <MenuSection
                                    key={`${section}-${j}`}
                                    title={section.title}
                                    defaultSection={defaultSection(item.menuSections)}
                                    currentSection={currentSection}
                                    updateCurrentSection={() => this.updateCurrentSection(section.title)}
                                    links={section.links}
                                    linkClicked={linkClicked}
                                    columnThreeLinkClicked={columnThreeLinkClicked}/>
                                );
                              }) : this.getSubmenu(item,  currentSection)
                            }
                          </ul>
                        }
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

MegaMenu.propTypes = {
  /**
   * This is the data that will generate the navigation
   * Data is made up an array of objects
   * Read Notes tab to see the structure of the data prop
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      menuSections: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]),
    }),
  ).isRequired,
  /**
   * Function to update currentSection in state
   */
  updateCurrentSection: PropTypes.func.isRequired,
  /**
   * Function to update currentDropdown in state
   */
  toggleDropDown: PropTypes.func.isRequired,
  /**
   * Function to update if the MegaMenu is displayed or not
   */
  toggleDisplayHidden: PropTypes.func.isRequired,
  /**
    * String value of current dropdown
    */
  currentDropdown: PropTypes.string,
  /**
   * String value of current dropdown section
   */
  currentSection: PropTypes.string,

  /**
   * Optional function to intercept links clicked
   */
  linkClicked: PropTypes.func,

  /**
   * Optional function to intercept links clicked at column three
   */
  columnThreeLinkClicked: PropTypes.func,

  display: PropTypes.shape({
    hidden: PropTypes.boolean
  }),
};

MegaMenu.defaultProps = {
  currentDropdown: '',
  currentSection: '',
  display: {},
  linkClicked() {},
  columnThreeLinkClicked() {}
};
