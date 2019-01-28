import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./state/reducers";

import createSagaMiddleware from "redux-saga";
import Sagas from "./state/sagas";

import registerServiceWorker from "./registerServiceWorker";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(Sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
