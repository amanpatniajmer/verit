import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/pages/About";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up" component={Register} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
