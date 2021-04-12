import { createAction, ActionsUnion } from "helpers/redux";

// Types
export const SET_NEW_ROUTE = "[app] set new route";

// Actions
export const Actions = {
  setRouterPath: (route: string) => createAction(SET_NEW_ROUTE, route)
};

// Reducer

export type State = {
  route: string;
};

const initialState = {
  route: "/"
};

export default (
  state: State = initialState,
  action: ActionsUnion<typeof Actions>
) => {
  switch (action.type) {
    case SET_NEW_ROUTE:
      return { ...state, route: action.payload };
    default:
      return state;
  }
};
