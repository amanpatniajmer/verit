import React, { Fragment, useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ContextProvider } from './context/Context';

/* import Navbar from "./components/layout/Navbar"; */
import Navbar from "./components/Navbar"
import Forbidden from "./components/pages/Forbidden";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/pages/About";
import Admin from "./components/pages/admin/Admin";
import AdminAddInternal from "./components/pages/admin/AddInternal";
import AdminAddExternal from "./components/pages/admin/AddExternal";
import AdminList from "./components/pages/admin/List";
import Student from "./components/pages/student/Student";
import StudentAddInternal from "./components/pages/student/AddInternal";
import StudentAddExternal from "./components/pages/student/AddExternal";
import StudentAddPor from "./components/pages/student/AddPor";
import StudentList from "./components/pages/student/List";
import EventsList from "./components/pages/admin/EventsList";
import Alert from "./components/layout/Alert";

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("token"))
  const [admin, setAdmin] = useState(localStorage.getItem("adminState") === "true")
  const [active,setActive]=useState(authenticated ? "Dashboard":"Login");
  const [alert, setAlert] = useState(null)

  const showAlert = (msg, type) => {
      setAlert({ msg, type });
      setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Fragment>
      <Router>
        <ContextProvider>
        <Navbar isauthenticated = {authenticated} setauthenticated = {setAuthenticated} isadmin = {admin} setadmin = {setAdmin} active={active}/>
        <div className = "main-window">
          <Alert alert = {alert} />
            {authenticated && admin ? <Switch>
            <Route exact path = "/about" render = {(props)=> <About setActive={setActive}/>} />
            <Route exact path = "/" render = {(props) => <Admin {...props} setActive={setActive} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/> 
            <Route exact path = "/admin/list" render = {(props) => <AdminList {...props} setActive={setActive} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/> 
            <Route exact path = "/admin/eventslist" render = {(props) => <EventsList {...props} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/> 
            <Route exact path = "/admin/addinternal" render = {(props) => <AdminAddInternal {...props} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/> 
            <Route exact path = "/admin/addexternal" render = {(props) => <AdminAddExternal {...props} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/> 
            <Route path = '/' component = {Forbidden}/>

            </Switch>
            :(authenticated ? 
              <Switch>
              <Route exact path = "/" render = {(props) => <Student {...props} setActive={setActive} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/>
            <Route exact path = "/student/list" render = {(props) => <StudentList {...props} setActive={setActive} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/>
            <Route exact path = "/student/addinternal" render = {(props) => <StudentAddInternal {...props} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/>
            <Route exact path = "/student/addexternal" render = {(props) => <StudentAddExternal {...props} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/>
            <Route exact path = "/student/addpor" render = {(props) => <StudentAddPor {...props} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/>
            <Route path = '/' component = {Forbidden}/>
            </Switch>
            :
            <Switch>
            <Route exact path = "/" render = {(props) => <Login {...props} setActive={setActive} setauthenticated = {setAuthenticated} setAdmin = {setAdmin} showalert = {showAlert} />}/> 
            <Route exact path = "/about" render = {(props)=> <About setActive={setActive}/>} />
            <Route exact path = "/sign-up" render = {(props) => <Register {...props} showalert = {showAlert} setauthenticated = {setAuthenticated} setAdmin = {setAdmin}/>}/>
            <Route path = '/' component = {Forbidden}/>
            </Switch>
            )
            }
        </div>
        </ContextProvider>
      </Router>
    </Fragment>
  );
}

export default App;
