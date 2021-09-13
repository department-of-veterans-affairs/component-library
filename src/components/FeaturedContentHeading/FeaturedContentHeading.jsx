import React from 'react';
import PropTypes from 'prop-types';

function FeaturedContentHeading(props) {
  const { level, text } = props;
  const CustomHeading = `h${level}`;

  return <CustomHeading>{text}</CustomHeading>;
}

FeaturedContentHeading.propTypes = {
  /**
   * Sets the level for the HTML section heading elements.
   * Valid values: 3, 4
   */
  level: PropTypes.integer,
  /**
   * Sets the text for the section heading.
   */
  text: PropTypes.string,
};

export default FeaturedContentHeading;
