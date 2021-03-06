// @flow
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "components/App";
import registerServiceWorker from "./registerServiceWorker";
import { hierarchyApp } from "./state";

import { fetchHierarchySaga } from "state/ducks/fetchHierarchy";
import { LOAD_STARTED } from "./state/ducks/fetchHierarchy/types";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  hierarchyApp,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(fetchHierarchySaga);

store.dispatch({
  type: LOAD_STARTED,
  url: store.getState().loadStatus.dataOrigin,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
