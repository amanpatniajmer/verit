import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import logo2 from '../img/logo.png';

const Navbar = ({ active, isauthenticated, setauthenticated }) => {

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
            <Link to = "/" name="Dashboard">Dashboard</Link>
          </li>
          <li>
            {localStorage.getItem('adminState') === "true"? <Link to = "/admin/list" name="List">List</Link>:
            <Link to = "/student/list" name="List">List</Link>}
          </li>
          <li>
            <Link to = "/about" name="About">About</Link>
          </li>
          <li>
            <Link to="/" name="Logout" onClick = {signOut} style={{display:"flex", alignItems:"center"}}>Logout {"  "}
            <i className = "fa fa-sign-out" />
            </Link>
          </li>
        </ul>
      );
    
      const guestLinks = (
        <ul>
          <li>
            <Link to = "/" name="Login" params = {{ setauthenticated: {setauthenticated} }} >Login</Link>
          </li>
          <li>
            <Link to = "/about" name="About">About</Link>
          </li>
        </ul>
      );
  useEffect(() => {
    document.querySelectorAll(".navbar ul li a").forEach((item) => {
      if (active === item.getAttribute('name')) {
        item.className = "active"
      }
      else item.className = ""
    });
    document.querySelectorAll(".navbar ul li .dropdown .options a").forEach((item) => {
      if (active === item.getAttribute('name')) {
        item.className = "active"
      }
      else item.className = ""
    });
    //eslint-disable-next-line
  }, [, isauthenticated, active])
  const listener1=(e)=>{
    if (document.getElementById('mainNavbar') && e.target !== document.getElementById('mainNavbar').getElementsByTagName('i')[0]) {
      document.getElementById('mainNavbar').getElementsByTagName('ul')[0].className = "";
      window.removeEventListener('click',listener1)
    }
  }
  const toggleNavbar = () => {
    if (document.getElementById('mainNavbar')) {
      document.getElementById('mainNavbar').getElementsByTagName('ul')[0].className = "fade"
      window.addEventListener('click', listener1)
    }
    /* display:flex!important; flex-direction:column; align-items:flex-start; justify-content:flex-start; width:auto; background-color:black; position:fixed; top:0; padding-top:10%; height:100vh; padding-left:10px; right:0 */
  }
  return (
    <nav className="navbar" id="mainNavbar">
      <Link to="/" className="title">
        <img className="logo round-img glow" src={logo2} alt="logo" />
        <div className="sub-heading" style={{ paddingLeft: "15px" }}>
          <span className="medium">
            <b>DOCUMENT VERIFICATION PORTAL</b>
          </span>
          <span className="small">
           Indian Institute of Technology, (Banaras Hindu University) Varanasi
            </span>
        </div>
      </Link>
      <i className="fa fa-bars btn" onClick={toggleNavbar} />
      {isauthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
