import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import _ from 'lodash';
import { ArrowRightBlueSVG }  from './arrow-right-blue';

const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
const smallDesktopMediaQuery = window.matchMedia('(min-width: 768px and max-width: 1007px)');

const getColumns = (columns) => {
  if (mobileMediaQuery.matches) {
    return {
      columnOne: {
        title: columns.columnOne.title,
        links: [
          ...columns.columnOne.links,
          ...columns.columnTwo.links,
        ],
      }
    };
  }

  return columns;
};

const SubMenu = ({ data, show, navTitle, handleBackToMenu, linkClicked, columnThreeLinkClicked }) => {
  const { seeAllLink, ...columns } = data;

  if (show) {
    const filteredColumns = getColumns(columns);

    return (
      <div className={mobileMediaQuery.matches ? 'mm-link-container-small' : ''}>
        <div>
          <button
            className="back-button"
            aria-controls={`vetnav-${_.kebabCase(navTitle)}`}
            onClick={() => handleBackToMenu()}>
            Back to Menu
          </button>
        </div>

        {
          seeAllLink && <div className="panel-bottom-link">
            <a href={seeAllLink.href} onClick={linkClicked.bind(null, seeAllLink)}>
              View All in {seeAllLink.text}
              <ArrowRightBlueSVG/>
            </a>
          </div>
        }

        {Object.keys(filteredColumns).map((keyName) => {
          return (
            <Column
              key={keyName}
              data={filteredColumns[keyName]}
              keyName={keyName}
              navTitle={navTitle}
              panelWhite={Object.prototype.hasOwnProperty.call(filteredColumns, 'mainColumn')}
              linkClicked={linkClicked}
              hidden={keyName === 'columnThree' && smallDesktopMediaQuery.matches}
              columnThreeLinkClicked={columnThreeLinkClicked}>
            </Column>
          );
        })}
      </div>
    );
  }

  return (
    <div></div>
  );
};

SubMenu.propTypes = {
  data: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  navTitle: PropTypes.string.isRequired,
  linkClicked: PropTypes.func.isRequired,
  columnThreeLinkClicked: PropTypes.func.isRequired
};

export default SubMenu;
