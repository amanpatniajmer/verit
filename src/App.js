import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Forbidden from "./components/pages/Forbidden";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/pages/About";
import Footer from "./components/layout/Footer";
import Admin from "./components/pages/admin/Admin";

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  return (
    <Fragment>
      <Router>
        <Navbar isauthenticated={authenticated} setauthenticated={setAuthenticated}/>
        <div className="container">
          
            {authenticated ?<Switch>
            <Route exact path="/" component={Admin} /> 
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
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
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
