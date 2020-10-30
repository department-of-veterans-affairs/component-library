import PropTypes from 'prop-types';
import React from 'react';
import Scroll from 'react-scroll';
import _ from 'lodash';

const Element = Scroll.Element;
const scroller = Scroll.scroller;

class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: !!props.startOpen };
    this.toggleChapter = this.toggleChapter.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.id = _.uniqueId();
  }

  scrollToTop() {
    scroller.scrollTo(
      `collapsible-panel-${this.id}-scroll-element`,
      window.VetsGov?.scroll || {
        duration: 500,
        delay: 2,
        smooth: true,
      },
    );
  }

  toggleChapter(e) {
    // USWDS styles make it difficult to add a type=button attribute to the toggle button.
    // Until this changes, we need to ensure that accordions used in forms don't
    // default to submitting a form page when toggled.
    e.preventDefault();
    const isOpening = !this.state.open;
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        if (isOpening) {
          this.scrollToTop();
        }
      },
    );
  }

  render() {
    let pageContent = null;

    if (this.state.open) {
      pageContent = (
        <div className="usa-accordion-content" aria-hidden="false">
          {this.props.children}
        </div>
      );
    }

    return (
      <div
        className={`${
          this.props.borderless ? 'usa-accordion' : 'usa-accordion-bordered'
        } form-review-panel`}
      >
        <Element name={`collapsible-panel-${this.id}-scroll-element`} />
        <div className="accordion-header clearfix">
          <button
            className="usa-accordion-button usa-button-unstyled"
            aria-expanded={this.state.open ? 'true' : 'false'}
            aria-controls={`collapsible-${this.id}`}
            onClick={this.toggleChapter}
          >
            {this.props.panelName}
          </button>
        </div>
        <div id={`collapsible-${this.id}`}>{pageContent}</div>
      </div>
    );
  }
}

CollapsiblePanel.propTypes = {
  /**
   * The title of the collapsible panel.
   */
  panelName: PropTypes.string.isRequired,

  /**
   * If set to true, panel content will be borderless.
   */
  borderless: PropTypes.bool,

  /**
   * If set to true, the panel will default to open.
   */
  startOpen: PropTypes.bool,
};

export default CollapsiblePanel;
