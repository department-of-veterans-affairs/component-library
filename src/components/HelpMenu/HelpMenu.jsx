import PropTypes from 'prop-types';
import React from 'react';
import DropDownPanel from '../DropDownPanel/DropDownPanel';
import IconHelp from '../IconHelp/IconHelp';

class HelpMenu extends React.Component {
  render() {
    const icon = <IconHelp color="#fff" role="presentation" />;

    return (
      <DropDownPanel
        buttonText="Help"
        clickHandler={this.props.clickHandler}
        cssClass={this.props.cssClass}
        id="helpmenu"
        icon={icon}
        isOpen={this.props.isOpen}
      >
        <div>
          <p>
            <b>Call the VA.gov Help Desk</b>
          </p>
          <p>
            <a href="tel:18555747286">1-855-574-7286</a>
          </p>
          <p>
            TTY: <a href="tel:+18008778339">1-800-877-8339</a>
          </p>
          <p>Monday &ndash; Friday, 8:00 a.m. &ndash; 8:00 p.m. (ET)</p>
        </div>
      </DropDownPanel>
    );
  }
}

HelpMenu.propTypes = {
  /**
   * CSS class to apply to the dropdown panel
   */
  cssClass: PropTypes.string,

  /**
   * Function to execute on click. Should toggle the `isOpen` prop by changing state
   */
  clickHandler: PropTypes.func.isRequired,

  /**
   * The open state of the menu
   */
  isOpen: PropTypes.bool.isRequired,
};

export default HelpMenu;
