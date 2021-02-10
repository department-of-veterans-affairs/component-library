import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import ExpandingGroup from '../ExpandingGroup/ExpandingGroup';

export default class AdditionalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.expandedContentId = _.uniqueId('tooltip-');
    this.state = { open: false };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
    if (this.props.enableAnalytics) {
      this.props.trackEvent && this.props.trackEvent({
        event: !this.state.open ? 'int-additional-info-expand' : 'int-additional-info-collapse',
        'additional-info-triggerText': this.props.triggerText
      });
    }    
    return this.props.onClick && this.props.onClick();
  };

  render() {
    const { triggerText, children } = this.props;

    // Display button as a block element in order to
    // preserve the Safari VoiceOver navigation order
    // when expanding the content.
    const buttonClass = classNames(
      'additional-info-button',
      'va-button-link',
      'vads-u-display--block',
    );

    const iconClass = classNames({
      fas: true,
      'fa-angle-down': true,
      open: this.state.open,
    });

    const { tagName: TagName = 'span' } = this.props;

    const trigger = (
      <button
        type="button"
        className={buttonClass}
        aria-expanded={this.state.open ? 'true' : 'false'}
        aria-controls={this.expandedContentId}
        onClick={this.toggle}
      >
        <TagName className="additional-info-title">
          {triggerText}
          <i className={iconClass} />
        </TagName>
      </button>
    );

    return (
      <ExpandingGroup
        open={this.state.open}
        expandedContentId={this.expandedContentId}
      >
        {trigger}
        <div className="additional-info-content">{children}</div>
      </ExpandingGroup>
    );
  }
}

AdditionalInfo.propTypes = {
  /**
   * this is the text displayed for AdditionalInfo link or button
   */
  triggerText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  /**
   * Function to pass in events and parameters to the dataLayer
   * and (eventually) into Google Analytics
   */
  trackEvent: PropTypes.func,  
  /**
   * Analytics tracking function(s) will be called
   */
  enableAnalytics: PropTypes.bool,  
};

AdditionalInfo.defaultProps = { 
  enableAnalytics: true,
  trackEvent: (args) => {
    recordEvent(args);
  },
};
