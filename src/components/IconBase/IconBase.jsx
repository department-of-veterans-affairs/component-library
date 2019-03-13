import PropTypes from 'prop-types';
import React from 'react';

class IconBase extends React.Component {
  render() {
    const { focusable, role, ...svgProps } = this.props;

    return (
      <svg focusable={focusable} role={role} {...svgProps}>
        {this.props.children}
      </svg>
    );
  }
}

IconBase.propTypes = {
  focusable: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

IconBase.defaultProps = {
  focusable: false,
};

export default IconBase;
