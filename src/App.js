import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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

function App() {
  const [authenticated, setAuthenticated] = useState(true)
  return (
    <Fragment>
      <Router>
        <Navbar isauthenticated={authenticated} setauthenticated={setAuthenticated}/>
        <div className="container">
          
            {authenticated ?<Switch>
            <Route exact path="/"> <Redirect to = '/admin'/></Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/student" component={Student} />
            <Route exact path="/student/list" component={StudentList} />
            <Route exact path="/student/addinternal" component={StudentAddInternal} />
            <Route exact path="/student/addexternal" component={StudentAddExternal} />
            <Route exact path="/student/addpor" component={StudentAddPor} />
            <Route exact path="/admin/list" component={AdminList} />
            <Route exact path="/admin/addinternal" component={AdminAddInternal} />
            <Route exact path="/admin/addexternal" component={AdminAddExternal} />
            <Route path='/' component={Forbidden}/>
            </Switch>
            :
            <Switch>
            <Route exact path="/" render={(props)=><Login {...props} setauthenticated={setAuthenticated}/>}/> 
            <Route exact path="/about" component={About} />
            <Route exact path="/login" render={(props)=><Login {...props} setauthenticated={setAuthenticated}/>}/> 
            <Route exact path="/sign-up" component={Register} />
            <Route path='/' component={Forbidden}/>
            </Switch>
            }
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
