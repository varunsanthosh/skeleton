import {
  Store,
  Reducer,
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "modules";
import {
  ActionWithPayload,
  ActionWithoutPayload,
  ReduxStateType
} from "types/index";

type AsyncReducers<T> = {
  [key: string]: (
    state: ReduxStateType<T>,
    action: ActionWithPayload<any, any> | ActionWithoutPayload<any>
  ) => ReduxStateType<string>;
};

type StoreType = {
  asyncReducers?: AsyncReducers<string>;
} & Store<{}>;

const reducer = combineReducers(rootReducer as any);
const sagaMiddleware = createSagaMiddleware();
let preloadState;

/* eslint-disable global-require */

if (IN_PRODUCTION) {
  preloadState = compose(applyMiddleware(sagaMiddleware));
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const logger = require("redux-logger").default;
  preloadState = composeEnhancers(applyMiddleware(logger, sagaMiddleware));
}

const store: StoreType = createStore(reducer, preloadState);

export default store;
store.asyncReducers = {};

function replaceReducers() {
  const merged = Object.assign({}, rootReducer, store.asyncReducers);
  const combined: Reducer = combineReducers(merged);
  store.replaceReducer(combined);
}

export function injectAsyncReducers(asyncReducers: any) {
  const injectReducers = Object.keys(asyncReducers).reduce((acc, item) => {
    if (store.asyncReducers && store.asyncReducers[item]) {
      delete acc[item];
    }
    return acc;
  }, asyncReducers);

  if (Object.keys(asyncReducers).length === 0) {
    return;
  }
  store.asyncReducers = { ...store.asyncReducers, injectReducers };
  replaceReducers();
}
