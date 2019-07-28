import { Actions, SET_NEW_ROUTE } from "modules/app";

describe("app actions", () => {
  it("should create an action to hide private mode message", () => {
    const expectedAction = { type: SET_NEW_ROUTE, payload: "/test" };
    expect(Actions.setRouterPath("/test")).toEqual(expectedAction);
  });
});
