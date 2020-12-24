import React, { Fragment, useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
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
import ForgotPassword from "./components/auth/ForgotPassword";
import EnterPassword from "./components/auth/EnterPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Alert from "./components/layout/Alert";

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("token"))
  const [admin, setAdmin] = useState(localStorage.getItem("adminState")==="true")
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
        <Navbar isauthenticated={authenticated} setauthenticated={setAuthenticated} isadmin={admin} setadmin={setAdmin} />
        <div className="container">
          <Alert alert={alert} />
            {authenticated && admin ? <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Admin} />
            <Route exact path="/admin/list" component={AdminList} />
            <Route exact path="/admin/eventslist" component={EventsList} />
            <Route exact path="/admin/addinternal" component={AdminAddInternal} showAlert={showAlert}/>
            <Route exact path="/admin/addexternal" component={AdminAddExternal} showAlert={showAlert}/>
            <Route exact path="/resetpassword" component={ResetPassword} showAlert={showAlert}/>
            <Route exact path="/enterpassword" component={EnterPassword} showAlert={showAlert}/>
            <Route path='/' component={Forbidden}/>

            </Switch>
            :(authenticated?
              <Switch>
              <Route exact path="/" component={Student} />
            <Route exact path="/student/list" component={StudentList}/>
            <Route exact path="/student/addinternal" component={StudentAddInternal} showAlert={showAlert}/>
            <Route exact path="/student/addexternal" component={StudentAddExternal} showAlert={showAlert}/>
            <Route exact path="/student/addpor" component={StudentAddPor} showAlert={showAlert}/>
            <Route exact path="/resetpassword" component={ResetPassword} showAlert={showAlert}/>
            <Route exact path="/enterpassword" component={EnterPassword} showAlert={showAlert}/>
            <Route path='/' component={Forbidden}/>
            </Switch>
            :
            <Switch>
            <Route exact path="/" render={(props)=><Login {...props} setauthenticated={setAuthenticated} setAdmin={setAdmin} showAlert={showAlert} />}/> 
            <Route exact path="/about" component={About} />
            <Route exact path="/forgotpassword" component={ForgotPassword} showAlert={showAlert}/>
            <Route exact path="/enterpassword" component={EnterPassword} showAlert={showAlert}/>
            <Route exact path="/sign-up" component={Register} showAlert={showAlert}/>
            <Route path='/' component={Forbidden}/>
            </Switch>
            )
            }
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
