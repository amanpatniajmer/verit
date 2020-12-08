import React from "react";
import PropTypes from "prop-types";

const About = ({ icon }) => {
  return (
    <div className="text-center">
      <h1
        className="text-primary"
        style={{ fontSize: "3rem", textDecoration: "underline" }}
      >
        About
      </h1>
      <p className="lead">
        <i className={icon} />
        Verify your documents for placements and internships.
      </p>
    </div>
  );
};

About.propTypes = {
  icon: PropTypes.string.isRequired,
};

About.defaultProps = {
  icon: "fa fa-check-circle p",
};

export default About;
