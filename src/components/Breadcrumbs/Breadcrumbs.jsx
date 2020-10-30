// Node modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uniqueId } from 'lodash';

/**
 * React component to dynamically build breadcrumb links. The Breadcrumbs
 * component accepts an array of HTML A tags, React Router LINK components, or a
 * combination of the two. The component also accepts hard-coded A or LINK
 * elements as props.children.
 *
## Intent

Breadcrumbs are intended to provide users an understanding of where they are
located in a rich information structure. They work well in situations where
users may have clicked several layers deep, and would want to move back toward
the top in linear steps.

## Using the Breadcrumbs Component

The `<Breadrumbs />` component accepts a number of different `children` props
and will render them correctly:

* An array of comma-separated `<a>` tags
* An array of comma-separated `<Link />` components (React router)
* Hard-coded HTML `<a>` tags
* A combination of HTML and React router components

You do not need to wrap your code in `<li>` or `<ul>` elements. The proper
markup is included in the `<Breadcrumbs />` component and will be output when
the `render()` method is executed.

## Mobile Width Adaptation

The breadcrumb component switches to a single previous step link when the screen
is collapsed or zoomed smaller than 481 device pixels or a custom
`props.mobileWidth` declaration. This adaptation is designed to minizime the
breadcrumb's footprint on smaller screens and is beneficial for sites with many
layers.

## Accessibility

The `<Breadcrumbs />` component has been tested for accessibility. It is fully
keyboard accessible, and announces the current page correctly in the following
screen reader combinations:

* MacOS + Safari + VoiceOver
* MacOS + Chrome + VoiceOver
* iOS + Safari + VoiceOver
* Windows 7/10 + Firefox + NVDA
* Windows 10 + Chrome + NVDA
* Windows 7/10 + IE11 + JAWS
* Windows 10 + Chrome + JAWS

### aria-label (ATTRIBUTE)

The `<Breadcrumbs />` component automatically adds an `aria-label="Breadcrumb"`
attribute to the containing `<nav>` element. This will be read out as
"Breadcrumb" to assistive devices like JAWS, NVDA, and VoiceOver. The label can
be changed to fit your needs by passing a custom string to the `ariaLabel` prop.

### aria-current (ATTRIBUTE)

The `<Breadcrumbs />` component automatically adds an `aria-current="page"`
attribute to the last link rendered by the full breadcrumb list. This attribute
triggers an `a[aria-current="page"]` CSS selector, makes the link bold, removes
the underline, and changes it to a black text color. Current [WAI-ARIA authoring
practices](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/breadcrumb/index.html)
recommend this `aria-current="page"` attribute for screen reader context.
 */
class Breadcrumbs extends Component {
  /**
   * Build the breadcrumb links. Convert children to an array,
   * pop and add aria-current to last item, build a set of
   * list items.
   */
  renderBreadcrumbLinks = () => {
    const children = React.Children.toArray(this.props.children);
    children.push(
      React.cloneElement(children.pop(), {
        'aria-current': 'page',
      }),
    );
    return children.map((child, i) => <li key={i}>{child}</li>);
  };

  render() {
    const { ariaLabel, className, id, listId, mobileFirstProp } = this.props;

    // Derive IDs.
    const breadcrumbId = id || uniqueId('va-breadcrumbs-');
    const breadcrumbListId = listId || uniqueId('va-breadcrumbs-list-');

    return (
      <nav
        aria-label={ariaLabel}
        aria-live="polite"
        className={classnames({
          'va-nav-breadcrumbs': true,
          'va-nav-breadcrumbs--mobile': !!mobileFirstProp,
          [className]: !!className,
        })}
        data-mobile-first={mobileFirstProp}
        id={breadcrumbId}
      >
        <ul
          className="row va-nav-breadcrumbs-list columns"
          id={breadcrumbListId}
        >
          {this.renderBreadcrumbLinks()}
        </ul>
      </nav>
    );
  }
}

Breadcrumbs.defaultProps = {
  ariaLabel: 'Breadcrumb',
};

Breadcrumbs.propTypes = {
  /**
   * Adds an aria-label attribute to the <nav /> element.
   * The aria-label will be read out when users navigate the
   * <Breadcrumbs/> component using a screen reader.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * Optionally adds one or more CSS classes to the NAV element
   */
  className: PropTypes.string,
  /**
   * Adds a custom id attribute to the NAV element
   */
  id: PropTypes.string,
  /**
   * Adds a custom id attribute to the UL element
   */
  listId: PropTypes.string,
  /**
   * Adds CSS class `.va-nav-breadcrumbs--mobile` to the
   * NAV element. The mobile breadcrumb will always
   * be displayed while mobileFirstProp is True.
   */
  mobileFirstProp: PropTypes.bool,
};

export default Breadcrumbs;
