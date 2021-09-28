import PropTypes from 'prop-types';
import React from 'react';
import DropDownPanel from '../DropDownPanel/DropDownPanel';
import IconHelp from '../IconHelp/IconHelp';
import Telephone, { CONTACTS, PATTERNS } from '../Telephone/Telephone';

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
            <Telephone contact={CONTACTS.HELP_DESK} />
          </p>
          <p>
            TTY:{' '}
            <Telephone contact={CONTACTS['711']} pattern={PATTERNS['911']} />
          </p>
          <p>
            We’re here <abbr title="24 hours a day, 7 days a week">24/7</abbr>
          </p>
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
