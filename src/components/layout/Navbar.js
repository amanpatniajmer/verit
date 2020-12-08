import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon, logoutIcon }) => {
  let isAuthenticated = true;

  const authLinks = (
    <ul>
      <li>Welcome Fella!</li>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <i className={logoutIcon} />
        <Link to="/login">Logout</Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/sign-up">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-success">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  logoutIcon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Verit",
  icon: "fa fa-check-circle p",
  logoutIcon: "fa fa-sign-out",
};

export default Navbar;
