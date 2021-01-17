import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import rootReducer from "./store/index";
import { mainRoutes } from "./routes";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(
  <Provider store={rootReducer}>
    <Router>
      <Switch>
        <Route
          path="/admin"
          render={(routeProps) => {
            return <App {...routeProps} />;
          }}
        />
        {mainRoutes.map((route) => {
          return <Route key={route.path} {...route} />;
        })}
        <Redirect to="/404" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
