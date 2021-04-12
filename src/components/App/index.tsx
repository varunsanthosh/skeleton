import React, { Fragment } from "react";
import { Switch, Route, RouteProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import { routerType, init } from "helpers/redirect";

const RouterInitializer = (props: { history: routerType }): null => {
  init({ router: props.history });

  return null;
};

export const App = (routes: RouteProps[]) => (
  <Fragment>
    <Helmet title="App" meta={[{ charSet: "utf-8" }]} />
    <Route component={RouterInitializer} />
    <Switch>
      {routes.map((r: RouteProps & { component?: any }) => {
        const { path = "" } = r;
        return (
          <Route
            key={path.toString()}
            path={path}
            exact={r.exact}
            render={(p) => <r.component {...p} />}
          />
        );
      })}
    </Switch>
  </Fragment>
);

export default App;
