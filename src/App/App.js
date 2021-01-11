import React from "react";
import { Router, Route } from "react-router-dom";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { Navbar } from "../Common";
import { history } from "../_helpers";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}
export { App };
