import React from "react";
import { render } from "react-dom";
import { App } from "./App";
// import { createStore } from 'redux'
import { Provider } from "react-redux";
import rootReducer from "./_reducers";
import { store } from './_helpers';

// const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
