import React from "react";
import { connect } from "react-redux";
import { userActions, alertActions } from "../_actions";
import { history } from "../_helpers";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
    // reset login status
    this.props.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
      signUpSubmitted: false,
      loading: false,
      loginStatus: false,
      loginErrorMsg: "",
      signUpErrorMsg: "",
      signUpStatus: false,
      optionForm: "1",
      signUpUser: {
        AcctName: "",
        LoginID: "",
        Birth: "",
        Email: "",
        MainCell: "",
        Psw: "",
        EpaperSts: "Y",
        SMSSts: "Y",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange_s = this.handleChange_s.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit_s = this.handleSubmit_s.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.epaperRadioChange = this.epaperRadioChange.bind(this);
    this.smsRadioChange = this.smsRadioChange.bind(this);
  }

  epaperRadioChange(e) {
    const { signUpUser } = this.state;
    this.setState({
      signUpUser: {
        ...signUpUser,
        EpaperSts: e.currentTarget.value,
      },
    });
  }

  smsRadioChange(e) {
    const { signUpUser } = this.state;
    this.setState({
      signUpUser: {
        ...signUpUser,
        SMSSts: e.currentTarget.value,
      },
    });
  }

  handleForm(e) {
    let number = e.target.getAttribute("data-form");
    console.log(number);
    this.setState({
      optionForm: number,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleChange_s(e) {
    const { name, value } = e.target;
    const { signUpUser } = this.state;
    this.setState({
      signUpUser: {
        ...signUpUser,
        [name]: value,
      },
    });
  }

  handleSubmit_s(e) {
    e.preventDefault();

    this.setState({
      signUpSubmitted: true,
    });
    const { signUpUser } = this.state;
    if (
      !(
        signUpUser.AcctName &&
        signUpUser.LoginID &&
        signUpUser.Birth &&
        signUpUser.Email &&
        signUpUser.MainCell &&
        signUpUser.Psw
      )
    ) {
      return;
    }
    this.setState({
      loading: true,
    });
    this.props.signUp(signUpUser);

    // userService
    //   .signUp(
    //     signUpUser.name,
    //     signUpUser.LoginID,
    //     signUpUser.Birth,
    //     signUpUser.Email,
    //     signUpUser.MainCell,
    //     signUpUser.Psw,
    //     signUpUser.epaper,
    //     signUpUser.sms
    //   )
    //   .then(
    //     (user) => {
    //       console.log("signUp: " + user);
    //       const { from } = this.props.location.state || {
    //         from: {
    //           pathname: "/",
    //         },
    //       };
    //       if (user.data.ReturnCode == 0) {
    //         this.props.history.push(from);
    //       } else {
    //         this.setState({
    //           loading: false,
    //         });
    //         this.setState({
    //           signUpStatus: true,
    //         });
    //         this.setState({
    //           signUpErrorMsg: user.data.ReturnMessage,
    //         });
    //       }
    //     },
    //     (error) =>
    //       this.setState({
    //         error,
    //         loading: false,
    //       })
    //   );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: true,
    });
    const { username, password } = this.state;

    if (!(username && password)) {
      return;
    }

    this.setState({
      loading: true,
    });
    this.props.login(username, password);

    //   .then(
    //     (user) => {
    //       console.log(user);
    //       const { from } = this.props.location.state || {
    //         from: {
    //           pathname: "/",
    //         },
    //       };
    //       if (user.data.ReturnCode == 0) {
    //         this.props.history.push(from);
    //       } else {
    //         this.setState({
    //           loading: false,
    //         });
    //         this.setState({
    //           loginStatus: true,
    //         });
    //         this.setState({
    //           loginErrorMsg: user.data.ReturnMessage,
    //         });
    //       }
    //     },
    //     (error) =>
    //       this.setState({
    //         error,
    //         loading: false,
    //       })
    //   );
  }

  render() {
    const { alert } = this.props;
    const { loggingIn, registering } = this.props;
    const { signUpUser } = this.state;
    const {
      username,
      password,
      submitted,
      signUpSubmitted,
      loading,
      error,
      loginStatus,
      loginErrorMsg,
      signUpStatus,
      signUpErrorMsg,
      optionForm,
      EpaperSts,
      SMSSts,
    } = this.state;
    return (
      <div className="loginform">
        <div className="flex flexsb">
          <h1 id="signInBtn" data-form="1" onClick={this.handleForm}>
            登入
          </h1>
          <div className="middleLine"></div>
          <h1 id="signUpBtn" data-form="2" onClick={this.handleForm}>
            註冊
          </h1>
        </div>
        {optionForm == "1" ? (
          <form id="signInForm" name="form1" onSubmit={this.handleSubmit}>
            <div
              className={
                "form-group" + (submitted && !username ? " has-error" : "")
              }
            >
              <label htmlFor="username"> 帳號 </label>
              <input
                type="text"
                className="loginInput user"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              {submitted && !username && (
                <div className="error"> 請輸入帳號 </div>
              )}
            </div>
            <div
              className={
                "form-group" + (submitted && !password ? " has-error" : "")
              }
            >
              <label htmlFor="password"> 密碼 </label>
              <input
                type="password"
                className="loginInput pass"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className="error"> 請輸入密碼 </div>
              )}
            </div>
            <div className="form-group">
              <button className="loginBtn">送出</button>
              {/* {loggingIn && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )} */}
            </div>
            {loginStatus && <div className="error"> {loginErrorMsg} </div>}
            {alert.message && <div className={`error authMsg`}>{alert.message}</div>}
          </form>
        ) : (
          <form id="signUpForm" name="form2" onSubmit={this.handleSubmit_s}>
            <div
              className={
                "form-group" +
                (signUpSubmitted && !signUpUser.AcctName ? " has-error" : "")
              }
            >
              <label htmlFor="AcctName"> 姓名 </label>
              <input
                type="text"
                className="loginInput user"
                name="AcctName"
                value={signUpUser.AcctName}
                onChange={this.handleChange_s}
              />
              {signUpSubmitted && !signUpUser.AcctName && (
                <div className="error"> 請輸入帳號 </div>
              )}
            </div>
            <div className="flex flexsb">
              <div
                className={
                  "form-group w48" +
                  (signUpSubmitted && !signUpUser.LoginID ? " has-error" : "")
                }
              >
                <label htmlFor="LoginID"> 身分證字號 </label>
                <input
                  type="text"
                  className="loginInput pass"
                  name="LoginID"
                  value={signUpUser.LoginID}
                  onChange={this.handleChange_s}
                />
                {signUpSubmitted && !signUpUser.LoginID && (
                  <div className="error"> 請輸入密碼身分證字號 </div>
                )}
              </div>
              <div
                className={
                  "form-group w48" +
                  (signUpSubmitted && !signUpUser.Psw ? " has-error" : "")
                }
              >
                <label htmlFor="Psw"> 密碼 </label>
                <input
                  type="password"
                  className="loginInput pass"
                  name="Psw"
                  value={signUpUser.Psw}
                  onChange={this.handleChange_s}
                />
                {signUpSubmitted && !signUpUser.Psw && (
                  <div className="error"> 請輸入密碼 </div>
                )}
              </div>
            </div>

            {/* 2 */}
            <div className="flex flexsb">
              <div
                className={
                  "form-group w48" +
                  (signUpSubmitted && !signUpUser.Birth ? " has-error" : "")
                }
              >
                <label htmlFor="Birth"> 生日 </label>
                <input
                  type="text"
                  className="loginInput user"
                  name="Birth"
                  value={signUpUser.Birth}
                  onChange={this.handleChange_s}
                />
                {signUpSubmitted && !signUpUser.Birth && (
                  <div className="error"> 請輸入生日 </div>
                )}
              </div>

              <div
                className={
                  "form-group w48" +
                  (signUpSubmitted && !signUpUser.MainCell ? " has-error" : "")
                }
              >
                <label htmlFor="MainCell"> 電話 </label>
                <input
                  type="text"
                  className="loginInput user"
                  name="MainCell"
                  value={signUpUser.MainCell}
                  onChange={this.handleChange_s}
                />
                {signUpSubmitted && !signUpUser.MainCell && (
                  <div className="error"> 請輸入電話 </div>
                )}
              </div>
            </div>

            {/* 3 */}
            <div
              className={
                "form-group" +
                (signUpSubmitted && !signUpUser.Email ? " has-error" : "")
              }
            >
              <label htmlFor="Email"> Email </label>
              <input
                type="text"
                className="loginInput pass"
                name="Email"
                value={signUpUser.Email}
                onChange={this.handleChange_s}
              />
              {signUpSubmitted && !signUpUser.Email && (
                <div className="error"> 請輸入Email </div>
              )}
            </div>

            {/* 4 */}
            {/* <div className="flex flexsb">
                
              </div> */}

            <div
              className={
                "form-group" +
                (signUpSubmitted && !EpaperSts ? " has-error" : "")
              }
            >
              <label className="mr8" htmlFor="EpaperSts">
                {" "}
                訂閱電子報{" "}
              </label>
              <input
                type="radio"
                value="Y"
                checked={signUpUser.EpaperSts === "Y"}
                onChange={this.epaperRadioChange}
              />
              是
              <input
                type="radio"
                value="N"
                checked={signUpUser.EpaperSts === "N"}
                onChange={this.epaperRadioChange}
              />
              否
            </div>
            <div
              className={
                "form-group" + (signUpSubmitted && !SMSSts ? " has-error" : "")
              }
            >
              <label className="mr8" htmlFor="SMSSts">
                {" "}
                接收優惠情報{" "}
              </label>
              <input
                type="radio"
                value="Y"
                checked={signUpUser.SMSSts === "Y"}
                onChange={this.smsRadioChange}
              />
              是
              <input
                type="radio"
                value="N"
                checked={signUpUser.SMSSts === "N"}
                onChange={this.smsRadioChange}
              />
              否
            </div>

            <div className="form-group">
              <button className="loginBtn">送出</button>
              {/* {registering && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )} */}
            </div>
            {alert.message && <div className={`error authMsg`}>{alert.message}</div>}
            {signUpStatus && <div className="error"> {signUpErrorMsg} </div>}
          </form>
        )}
      </div>
    );
  }
}

function mapState(state) {
  const { loggingIn, registering } = state.authentication;
  const { alert } = state;
  return { loggingIn, registering, alert };
}

const actionCreators = {
  login: userActions.login,
  signUp: userActions.signUp,
  logout: userActions.logout,
  clearAlerts: alertActions.clear,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
