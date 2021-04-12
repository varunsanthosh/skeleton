import { State as appType } from "modules/app";

export type ReduxState = {
  app: appType;
};

export type Maybe<T> = T | null | undefined;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
export type ReduxStateType<T> = { [T in keyof ReduxState]: ReduxState[T] };

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type ActionWithoutPayload<T> = {
  type: T;
};
