import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";
let sessionUser = JSON.parse(localStorage.getItem("user"));

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    const { user, users } = this.props;
    this.state = {
      memberID: sessionUser.AcctID,
    };
  }

  componentDidMount() {
    console.log("this.props: " + this.props);
    this.props.getUsers(this.state.memberID);
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <div>
            <h1>
              歡迎:{users.items.AcctName},您為{users.items.memberlabel}
            </h1>
            <h3>AcctID: {users.items.AcctID}</h3>
          </div>
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

const actionCreators = {
  getUsers: userActions.getMember,
};
const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
