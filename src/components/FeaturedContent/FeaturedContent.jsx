import React from 'react';
import PropTypes from 'prop-types';

function FeaturedContent(props) {
  const { headingLevel, headingText } = props;
  const CustomHeading = `h${headingLevel}`;

  return (
    <div className="feature">
      <CustomHeading>{headingText}</CustomHeading>
      {props.children}
    </div>
  );
}

FeaturedContent.propTypes = {
  /**
   * Sets the level for the HTML section heading elements.
   * Valid values: 3, 4
   */
  headingLevel: PropTypes.integer,
  /**
   * Sets the text for the section heading.
   */
  headingText: PropTypes.string,
  /**
   * Child elements (content)
   */
  children: PropTypes.node,
};

export default FeaturedContent;
