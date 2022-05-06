import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from '../../helpers/utilities';
import clsx from 'clsx';
import ExpandingGroup from '../ExpandingGroup/ExpandingGroup';
import dispatchAnalyticsEvent from '../../helpers/analytics';

/**
 * **Note:** This component is deprecated in favor of the `<va-additional-info>` Web Component.
 */
export default class AdditionalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.expandedContentId = uniqueId('tooltip-');
    this.state = { open: false };
  }

  handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  };

  toggle = () => {
    // Conditionally track the event.
    if (!this.props.disableAnalytics) {
      dispatchAnalyticsEvent({
        componentName: 'AdditionalInfo',
        action: !this.state.open ? 'expand' : 'collapse',
        details: {
          triggerText: this.props.triggerText,
        },
      });
    }

    this.setState({ open: !this.state.open });

    return this.props.onClick && this.props.onClick();
  };

  render() {
    const { triggerText, children, tagName: TagName = 'span' } = this.props;

    // Display button as a block element in order to
    // preserve the Safari VoiceOver navigation order
    // when expanding the content.
    const buttonClass = clsx(
      'additional-info-button',
      'va-button-link',
      'vads-u-display--block',
    );

    const iconClass = clsx({
      'fas': true,
      'fa-angle-down': true,
      'open': this.state.open,
    });

    const trigger = (
      <a
        role="button"
        className={buttonClass}
        aria-expanded={this.state.open ? 'true' : 'false'}
        aria-controls={this.expandedContentId}
        onClick={this.toggle}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
      >
        <TagName className="additional-info-title">
          {triggerText}
          <i className={iconClass} />
        </TagName>
      </a>
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
   * Child elements (content)
   */
  children: PropTypes.node,
  /**
   * Analytics tracking function(s) will not be called
   */
  disableAnalytics: PropTypes.bool,
  tagName: PropTypes.string,
};
