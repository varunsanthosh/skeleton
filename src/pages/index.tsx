import React, { PureComponent, Fragment } from "react";
import { injectAsyncReducers } from "store";
import appReducer from "modules/app";

injectAsyncReducers({
  app: appReducer
});

class InitialPage extends PureComponent<void> {
  render() {
    return <Fragment>Check inital page</Fragment>;
  }
}

export default InitialPage;
