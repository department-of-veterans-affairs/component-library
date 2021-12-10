import PropTypes from 'prop-types';
import React from 'react';

class IconBase extends React.Component {
  render() {
    const { focusable, role, ariaLabel, ...svgProps } = this.props;

    return ariaLabel ? (
      <svg
        focusable={focusable}
        role={role}
        {...svgProps}
        aria-label={ariaLabel}
      >
        {this.props.children}
      </svg>
    ) : (
      <svg focusable={focusable} role={role} {...svgProps}>
        {this.props.children}
      </svg>
    );
  }
}

IconBase.propTypes = {
  focusable: PropTypes.bool.isRequired,
  role: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

IconBase.defaultProps = {
  focusable: false,
};

export default IconBase;
