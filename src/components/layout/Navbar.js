import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

const Navbar = ({ title, logoutIcon, isauthenticated, setauthenticated  }) => {
  const toggleNavbar = () => {
    if (document.getElementsByClassName('nav-links')[0] && document.getElementsByClassName('navbar')[0]) {
        document.getElementsByClassName('nav-links')[0].style = "width:250px; visibility:visible; opacity:1"
        /* window.addEventListener('click', listener2) */
    }
}
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
    <ul className="nav-links">
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
    <ul className="nav-links">
      <li>
        <Link to = "/" params = {{ setauthenticated: {setauthenticated} }} >Login</Link>
      </li>
      <li>
        <Link to = "/about">About</Link>
      </li>
    </ul>
  );

  return (
    <nav className = "navbar">
      <Link to = "/">
      <h1>
          <img src = {Logo} alt = "iit-bhu-logo"/>
          <ul className = "sub-heading">
            <li>
              {title}
            </li>
            <li className = "small">{"Indian Institute of Technology, (Banaras Hindu University) Varanasi"}</li>
          </ul>
      </h1>
      
      </Link>
      <i className="fa fa-bars" onClick={toggleNavbar}/>
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
