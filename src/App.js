import React, { Component } from "react";
import Menu from "./hoc/Menu/Menu";
import Diary from "./pages/Diary/Diary";
import Auth from "./pages/Auth/Auth";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu />

        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/diary" component={Diary} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
