import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import components from "routes/components";
import { App } from "components/App";

const GetRoutes = [
  { path: "/", component: components.IntialPage, exact: true }
];

const history = createBrowserHistory({
  basename: "/"
});

const Routes = () => <Router history={history}>{App(GetRoutes)}</Router>;

export default Routes;
