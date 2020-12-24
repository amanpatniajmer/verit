import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

const Navbar = ({ title, logoutIcon, isauthenticated, setauthenticated  }) => {
  function signOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      setauthenticated(false);
    });
  }

  const authLinks = (
    <ul>
      <li>
        <Link to = "/">Dashboard</Link>
      </li>
      <li>
        {localStorage.getItem('adminState') === "true"? <Link to = "/admin/list?verified=false&unverified=false&session=All&club=Cultural%20Council&internal=false&external=false">List</Link>:
        <Link to = "/student/list?verified=false&unverified=false&session=All&club=Cultural%20Council">List</Link>}
      </li>
      <li>
        <Link to = "/resetpassword">ResetPassword {" "}
        </Link>
      </li>
      <li>
        <Link to="/" onClick={signOut} >Logout {" "}
        <i className={logoutIcon} />
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to = "/sign-up">Register</Link>
      </li>
      <li>
        <Link to = "/" params={{ setauthenticated:{setauthenticated} }} >Login</Link>
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
          <img src = {Logo} alt = ""/>
          <ul className = "sub-heading">
            <li>
              {title}
            </li>
            <li className = "small">
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
