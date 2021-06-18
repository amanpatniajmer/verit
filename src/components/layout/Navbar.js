import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

const Navbar = ({ title, logoutIcon, isauthenticated, setauthenticated  }) => {
  useEffect(() => {
    window.gapi.load('auth2', function() {
      window.gapi.auth2.init();
    });
  }, [])

  function signOut() {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        setauthenticated(false);
      });
  }

  const authLinks = (
    <ul>
      <li>
        <Link to = "/">Dashboard</Link>
      </li>
      <li>
        {localStorage.getItem('adminState') === "true"? <Link to = "/admin/list">List</Link>:
        <Link to = "/student/list">List</Link>}
      </li>
      <li>
        <Link to="/" onClick = {signOut} >Logout {" "}
        <i className = {logoutIcon} />
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <Link to = "/" params = {{ setauthenticated: {setauthenticated} }} >Login</Link>
      </li> */}
      <li>
        <Link to = "/about">About</Link>
      </li>
    </ul>
  );

  return (
    <nav className = "navbar">
      <Link to = "/">
      <h1>
          <img className = "logo" src = {Logo} alt = ""/>
          <ul className = "sub-heading">
            <li>
              {title}
            </li>
            <li className = "small">{"Indian Institute of Technology, (Banaras Hindu University) Varanasi"}</li>
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
  setauthenticated: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  title: "Document Verification Portal",
  logoutIcon: "fa fa-sign-out",
};

export default Navbar;
