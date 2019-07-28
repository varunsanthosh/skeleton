import React from "react";
import ReactDOM from "react-dom";
import Routes from "routes";
import { Provider } from "react-redux";
import store from "store";

require("url-polyfill");
require("object.values").shim();

const target = document.getElementById("root");

if (target) {
  ReactDOM.render(
    <Provider store={store as any}>
      <Routes />
    </Provider>,
    target
  );
}
