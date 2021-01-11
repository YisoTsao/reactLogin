import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  signUp,
  getMember
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        if (user.data.ReturnCode == 0) {
          dispatch(success(user));
          history.push("/");
        } else {
          let errorMsg = user.data.ReturnMessage;
          dispatch(alertActions.error(errorMsg));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function signUp(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.signUp(user).then(
      (user) => {
        // dispatch(success());
        // history.push("/login");
        if (user.data.ReturnCode == 0) {
          dispatch(success(user));
          history.push("/");
        } else {
          let errorMsg = user.data.ReturnMessage;
          dispatch(alertActions.error(errorMsg));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getMember(users) {
  return (dispatch) => {
    dispatch(request(users));
    userService.getMember(users).then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST, users };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
