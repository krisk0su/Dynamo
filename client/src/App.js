import React from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Header, List } from "semantic-ui-react";
import { Create } from "./components/Create.jsx";
import { Index } from "./components/Index.jsx";
import { inject, observer } from "mobx-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

export const App = observer(() => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Index />}></Route>
        <Route path="/create" exact render={() => <Create />}></Route>
      </Switch>
    </Router>
  );
});
