import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

const Navbar = ({ title, logoutIcon, isauthenticated, setauthenticated  }) => {
  isauthenticated = true;

  const authLinks = (
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <i className={logoutIcon} />
        <Link to="/login" onClick={()=>setauthenticated(false)} >Logout</Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/sign-up">Register</Link>
      </li>
      <li>
        <Link to="/login" params={{setauthenticated:{setauthenticated}}} >Login</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <Link to="/">
      <h1>
          <img src={Logo} alt=""/>
          <ul className="sub-heading">
            <li>
              {title}
            </li>
            <li className="small">
            {"Indian Institute of Technology, (Banaras Hindu University) Varanasi"}
            </li>
          </ul>
      </h1>
      </Link>
      {isauthenticated ? authLinks : guestLinks}
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  logoutIcon: PropTypes.string.isRequired,
  setauthenticated:PropTypes.func.isRequired
};

Navbar.defaultProps = {
  title: "Document Verification Portal",
  logoutIcon: "fa fa-sign-out",
};

export default Navbar;
