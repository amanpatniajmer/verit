import React from "react";
import PropTypes from "prop-types";

const Footer = ({ title, icon }) => {
  return (
    <footer className="footer bg-danger">
      <h4>
        <i className={icon} /> {title} &copy; 2020
      </h4>
      <p> IIT (BHU), Varanasi | Document Verification </p>
    </footer>
  );
};

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  title: "Verit Technologies Private Limited",
  icon: "fa fa-check-circle p",
};

export default Footer;
