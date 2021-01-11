const axios = require("axios");

export const userService = {
  login,
  signUp,
  getMember,
  logout
};

function login(username, password) {
  let data = JSON.stringify({
    Data: { Account: username, Password: password },
    source_id: 4,
  });

  let config = {
    method: "post",
    url: "http://localhost:8080/carplus/member/Login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then((response) => {
      if (response.data.ReturnCode == 0) {
        console.log(response);
        let userJson = response.data.ReturnData;
        localStorage.setItem("user", JSON.stringify(userJson));
        location.href = '/';
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function signUp(params) {
  let dataObj = {};
  dataObj["Data"] = params;
  dataObj["source_id"] = 4;

  let config = {
    method: "post",
    url: "http://localhost:8080/carplus/member/registration",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(dataObj),
  };

  console.log("signUp data: " + dataObj);
  return axios(config)
    .then((response) => {
      console.log("ReturnCode: " + response.data.ReturnCode);
      if (response.data.ReturnCode == 0) {
        let userJson = response.data.ReturnData;
        localStorage.setItem("user", JSON.stringify(userJson));
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    });
}

function getMember(id) {
  var data = JSON.stringify({
    AcctId: id,
  });

  var config = {
    method: "post",
    url: "http://localhost:8080/carplus/member/getMember",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      console.log(response.data.Data);
      // localStorage.setItem("userInfo", response.data.Data.AcctName);
      return response.data.Data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}