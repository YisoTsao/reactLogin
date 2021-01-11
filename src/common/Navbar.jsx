import React from "react";

import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handlelogOut = this.handlelogOut.bind(this);
  }

  handlelogOut(e) {
    localStorage.removeItem("user");
    location.href = "/";
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="nav">
        <NavLink exact activeClassName="active" to="/">
          Car plus
        </NavLink>

        {users.items ? (
          <span>
            <a>{users.items.AcctName}</a>
            <a className="logoutText" onClick={this.handlelogOut}>
              登出
            </a>
          </span>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const connectedNavbar = connect(mapState)(Navbar);
export { connectedNavbar as Navbar };
