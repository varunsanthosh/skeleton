import React, { ComponentType } from "react";
import { Maybe } from "types";

type State = {
  Component: Maybe<ComponentType<any>>;
};

function asyncComponent(getComponent: () => Promise<any>) {
  return class AsyncComponent extends React.Component<any, State> {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component }: any = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

const IntialPage = asyncComponent(
  (): Promise<any> =>
    import("pages" /* webpackChunkName: "initial" */).then(
      module => module.default
    )
);

export default {
  IntialPage
};
